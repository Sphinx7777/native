import { camelizeKeys } from 'humps';
import { Store, AnyAction } from 'redux';
import { fromJS, Map, List } from 'immutable';
import fetch from 'cross-fetch';
import { normalize, Schema, schema } from 'normalizr';
import { select, put, call, fork } from 'redux-saga/effects';

import { action , pageFetching, sendMessage, entityRequest, IMethod, MODEL_CLEAR, clearSSRData, IActionRequest, pageSetFilter } from '../../src/redux/actions';
import { MessageType, HTTP_METHOD, IPagerParams, ResCode, IMessageBlock } from '../../src/constants';
import { isEmpty } from '../../src/utils';


export enum CRUD {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    READ = 'READ'
}

export interface IFetchOptions {
    method: string;
    cashed?: boolean;
    crud?: CRUD;
}
export interface ISagaItem {
    [entity: string]: {
        [action: string]: {
            actionFunc: (data: any) => any;
            watcher: string;
            isAdded: boolean;
        },
    };
}

export interface IModelAction {
    [key: string]: (data?: any) => AnyAction;
}

export interface EntityMap<T> extends Map<string, any> {
    get<K extends keyof T>(name: K): T[K];
}
export interface EntityList<T> extends List<any> {
    get<K extends keyof T>(name: K): T[K];
}

export default class Entity {
    protected mEntityName: string;
    protected mSchema: Schema;

    private static mStore: Store;
    public static mSagas: any[] = [];
    // @ts-ignore
    private static mUser: IIdentity = null;
    // @ts-ignore
    private static mGuard: Guard = null;
    private static mContext: any;
    public static mActions: ISagaItem = {};
    /**
     * addSaga
     */
    public static addSaga(...args: any[]) {
        // log('addSaga()', args);
        args.forEach((item) => {
            if (item instanceof Function) {
                Entity.mSagas.push(fork(item));
            }
        });
    }
    // @ts-ignore
    public get schema() {
        return this.mSchema ? this.mSchema : null;
    }

    public static get saga() { return Entity.mSagas; }
    public get entityName() {return this.mEntityName; }
    public static get store() { return Entity.mStore; }
    public static set store(store: Store) { Entity.mStore = store; }
    public static get user() { return Entity.mUser; }
    public static get context() { return Entity.mContext; }
    public static set context(value: any) { Entity.mContext = value; }

    constructor(name = 'entity', definitions: any = {}, options: any = {}) {
        this.mEntityName = name;
        // @ts-ignore
        this.mSchema = name !== 'entity' ? [ new schema.Entity(name, definitions, options) ] : null;
        this.getAction = this.getAction.bind(this);
        this.xFetch = this.xFetch.bind(this);
        this.clear =  this.clear.bind(this);
    }
// @ts-ignore
    public get actions(): IModelAction {
        const result: IModelAction = {};
        const entityName = this.constructor.name;
        if (entityName in Entity.mActions) {
            const actions = Object.keys(Entity.mActions[entityName]);
            actions.forEach((item) => {
                // const func =
                //     'const func = (type, payload = {}) => ({type, ...payload}); ' +
                //     'return func("' + item + '", data); ';
                // result[item] = new Function('data', func);
                result[item] = Entity.mActions[entityName][item].actionFunc;
            });
        }
        return result;
    }

    protected xFetch(endpoint: string,  method: HTTP_METHOD, data = {}, token?: string) {
        let fullUrl = 'http://neologic.golden-team.org/' + '/api' + endpoint;

        const params: any = {
            method,
            credentials: 'include',
            headers: {
                Authorization: 'bearer ' + token, // get token from cookies
            },
        };

        if (method !== 'GET') {
            params['headers']['content-type'] = 'application/json';
            params['body'] = JSON.stringify(data);
        } else {
            const opts = Object.entries(data).map(([key, val]) => key + '=' + val).join('&');
            fullUrl += (opts.length > 0?'?' + opts:'');
        }

        return fetch(fullUrl, params).then((response) => {
            return response.json().then((json) => ({ json, response }));
        },
        ).then(({ json, response }) =>
            Promise.resolve({
                success: response.ok ? true : false,
                response: json
            })
        );
    }

    public static fetch(uri: string, data?: any, method?: HTTP_METHOD) {
        return new Entity().fetch(uri, data, method);
    }

    public async fetch(uri: string, data?: any, method: HTTP_METHOD = HTTP_METHOD.POST) {
        const dispatch = Entity && Entity.store && Entity.store.dispatch;

        const action = this.getAction(CRUD.READ);
        dispatch(action.request(data));

        const identity = Entity.store.getState().identity;
        const token = identity && identity.user && identity.user.token;
        const query = await this.xFetch(uri, method, data, token);
        const success =  query.success;
        let message = {} as IMessageBlock;
        if (query.response.message && !isEmpty(query.response.message)) {
            const msgType =  success ? MessageType.INFO : MessageType.ERROR;
            message = { text: query.response.message, code: query.response.code, msgType };
            dispatch(sendMessage(message));
        }

        let response = {} as any;
        if (success && this.mSchema) {
            const queryResponse = query.response;
            response = normalize(camelizeKeys(JSON.parse(JSON.stringify(queryResponse.data))), this.mSchema);
            response['pager'] = ('pager' in queryResponse) ? queryResponse.pager : null;
        } else {
            response = query.response.data;
        }
        if (success) {
            dispatch(action.success(data, response));
        } else {
            dispatch(action.failure(data, response));
        }

        return { response, message };
    }

    protected * actionRequest(uri: string, crud: CRUD, method: HTTP_METHOD, data?: any) {
        console.log('Action Request', method, uri, data);
        const action = this.getAction(crud);
        yield put(action.request(data));
        let success = true;
        let message = {} as IMessageBlock;
        let pager = null;
        const token = yield select((state: any) => state.identity && state.identity.user && state.identity.user.token || null);
        // get data from SSR container
        let query = yield select((state: any) => state.ssrData && state.ssrData[this.entityName]);
        if (query && query.items) {
            pager = {
                page: query.page,
                count: query.count
            };
            query = query.items;
        }
        yield put(clearSSRData(this.entityName));

        // ignoring fetch request on the server (SSR mode)
        const isServer = typeof window === 'undefined';
        if (!isServer) {
            const result = yield call(this.xFetch, uri, method, data, token);
            success = result.success;
            if (result.response.message && !isEmpty(result.response.message)) {
                const msgType =  success ? MessageType.INFO : MessageType.ERROR;
                message = { text: result.response.message, code: result.response.code, msgType };
                yield put(sendMessage(message));
            }
            if (result.response.pager) {
                pager = result.response.pager;
            }
            query = result.response.data;
        }

        let response = {} as any;
        if (success && this.mSchema && query) {
            response = normalize(camelizeKeys(JSON.parse(JSON.stringify(query))), this.mSchema);
            response['pager'] = pager ? pager : null;
        } else if (query ) {
            response = query.data;
        }
        if (success) {
            yield put(action.success(data, response));
        } else {
            yield put(action.failure(data, response));
        }

        return { response, message };
    }

    public clear() {
        const glob = { entity: this,  crud: IMethod.CLEAR };
        return action(MODEL_CLEAR, { glob });
    }

    public static clear() {
        return action(MODEL_CLEAR, {});
    }

    private getAction(crud: any = null): IActionRequest {
        let action: IActionRequest = entityRequest(this)[CRUD.READ];
        switch (crud) {
        case CRUD.CREATE:
            action = entityRequest(this)[CRUD.CREATE];
            break;
        case CRUD.UPDATE:
            action = entityRequest(this)[CRUD.UPDATE];
            break;
        case CRUD.DELETE:
            action = entityRequest(this)[CRUD.DELETE];
            break;
        default:
        case CRUD.READ:
            break;
        }
        return action;
    }


    public xSave = (uri: string, data: any = {}) => {
        return this.actionRequest(uri, CRUD.UPDATE, HTTP_METHOD.POST, data);
    }

    public xRead = (uri: string, data: any = {}, method: HTTP_METHOD = HTTP_METHOD.GET) => {
        return this.actionRequest(uri, CRUD.READ, method, data);
    }

    public xDelete = (uri: string, data: any = {}) => {
        return this.actionRequest(uri, CRUD.DELETE, HTTP_METHOD.DELETE, data);
    }

    /**
     * Override this method in case you need to have custom margin of entity with Redux store
     *
     * @param state state of redux before reducing
     * @param entities entities from the server
     */
    public merge(state: Map<string, any>, entities: any): Map<string, any> {
        return state.mergeDeep(entities);
    }
}

export const watchers = Entity.saga;
