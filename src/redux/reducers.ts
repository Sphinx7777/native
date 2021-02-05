import { fromJS, List, Map } from 'immutable';
import { combineReducers, AnyAction } from 'redux';

export interface AppState {
    entities: any;
    requestResult: any;
    form: any;
    message: any;
    pagination: any;    
    flagger: any;
    identity: any;
    ssrData: any;
}

//export const initialState : AppState = { app: 'init', page: 'init', entities: {}} as AppState;


import {
    IMethod,
    SET_FLAGGER,
    PAGE_SET_FILTER,
    MODEL_CLEAR,
    TOAST_MESSAGE,
    RESET_MESSAGE,
    RESET_ALL_MESSAGE,
    PAGE_FETCHING,
    CLEAR_REQUEST_RESULT,
    PAGE_SELECT_ITEM,
    GET_IDENTITY,
    SET_SSR_DATA,
    CLEAR_SSR_DATA,
    PAGE_CLEAR
} from './actions';


const initialEntities = fromJS({

});

// Updates an entity cache in response to any action with response.entities.
function entities(state = initialEntities, action: any) {

    if ('glob' in action) {
        const { glob: { crud, entity } } = action;
        switch (crud) {
        case IMethod.DELETE:
            {
                let list = state.get(entity.entityName);
                if (list) {
                    list = list.remove(action.data.id);
                    state = state.set(entity.entityName, list);
                }
            }
            break;
        case IMethod.CLEAR:
            if (entity && state.has(entity.entityName)) {
                state = state.set(entity.entityName, fromJS({}));
            }
            break;
        default:
        case IMethod.UPDATE:
            if (action.response && action.response.entities) {
                const { response: { entities } } = action;
                if (entities) {
                    Object.keys(entities).map((entityName) => {
                        let list = state.get(entityName);
                        if (list && list.size > 0) {
                            Object.keys(entities[entityName]).map((id) => list = list.remove(id));
                        }
                        state = state.set(entityName, list);
                    });
                    state = state.mergeDeep(fromJS(entities));
                }
            }
            break;
        }
    }
    return state;
}

const initialRequestResult = fromJS({
});

function requestResult(state = initialRequestResult, action: any) {
    if ('glob' in action) {
        const { glob: { method, crud, entity } } = action;
        if (action.response && action.response.result) {
            const { response: { result } } = action;
            state = state.setIn([entity.entityName, crud], fromJS(result));
        }
    }
    const { type, entity } = action;
    if (type === CLEAR_REQUEST_RESULT) {
        if (state.has(entity)) {
            state = state.set(entity, fromJS({}));
        }
    }
    return state;
}

const initialFlagger = {
};

function flagger(state = initialFlagger, action: any) {
    const { type } = action;
    if (type === SET_FLAGGER) {
        return {
            ...state,
            [action.key]: action.value,
        };
    }
    return state;
}

export type StateIdentity = {
    user: any;
    roles: any;
    rules: any;
    menu: any;
    companyInfo: any;
};

const initialIdentity: StateIdentity = {
    user: null,
    roles: null,
    rules: null,
    menu: null,
    companyInfo: null,
};

function identity(state: StateIdentity = initialIdentity, action: any) {
    switch (action.type) {

    case GET_IDENTITY:
        if (action.user && action.roles && action.rules) {
            return {
                ...state,
                user: { ...action.user },
                roles: { ...action.roles },
                rules: { ...action.rules },
                menu: action.menu,
                companyInfo: action.companyInfo,
            };
        }
        break;
    }
    return state;
}
//suspended
const queryInitialState: any = null;
const ssrData = (state = queryInitialState, action: any) => {
    switch (action.type) {
    case SET_SSR_DATA:
        return { ...action.data };
    case CLEAR_SSR_DATA:
        if (state && (action.name in state)) {
            state[action.name] = undefined;
            state['pager'] = undefined;
            return { ...state };
        }
        break;
    default:
        return state;
    }
    return state;
};

const appReducer = combineReducers({
    entities,
    requestResult,
    flagger,
    identity,
    ssrData,
});

function rootReducer(state: any, action: any) {
    const intermediateState = appReducer(state, action);
    return intermediateState
}

export default rootReducer;

















// export default next;