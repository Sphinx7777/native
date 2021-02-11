
import action from '../../src/decoradors/action';
import Entity from './entity';
import { take, put, call, cancelled } from 'redux-saga/effects';
import { getIdentity, SEND_MESSAGE, toastMessage, resetMessage } from '../../src/redux/actions';
import { HTTP_METHOD, ResCode, MessageType, TOAST_TIME } from '../../src/constants';

export interface ILoginData {
    userEmail: string,
    password: string;
    remember?: boolean;
}

class Identity extends Entity {

    constructor() {
        super();
        Entity.addSaga(
            this.showMessage.bind(this),
        );
    }

    @action()
    public * loginUser(data: ILoginData) {  
        console.log('loginUser', data)
            // const { response } = yield call(Entity.fetch, '/auth/login', data, HTTP_METHOD.POST);
            // if (response && response.user
            //     && response.user.userId
            //     && response.user.token && response.user.token.length > 0) {
            //     yield put(getIdentity(response));
            // }
    }

    @action()
    public * registerUser(data: any) {
        yield call(Entity.fetch, '/auth/register', data, HTTP_METHOD.POST);
    }

    @action()
    public * onForgotClick(data: any) {
        yield call(Entity.fetch, '/auth/forgot', data, HTTP_METHOD.POST);
    }

    @action()
    public * resetPassword(data: any) {
        yield call(Entity.fetch, '/auth/reset-user-pass', data, HTTP_METHOD.POST);
    }

    @action()
    public * changePassword(data: any) {
        yield call(Entity.fetch, '/auth/change-user-pass', data, HTTP_METHOD.POST);
    }

    @action()
    public * verifyAccount(data: any) {
        yield call(Entity.fetch, '/auth/verify', data, HTTP_METHOD.POST);
    }

    @action()
    public * logoutUser(data: any) {
        console.log('logoutUser', data)
            // const { response } = yield call(Entity.fetch, '/auth/logout', data, HTTP_METHOD.POST);
            // if (response && response.user && !response.user.userId) {
            //     yield put(getIdentity(response));
            //     yield put(Entity.clear());
            // }
    }

    public * showMessage() {
        while (true) {
            const { text, code, msgType } = yield take(SEND_MESSAGE);
            switch (code) {
            case ResCode.DEBUG:
                switch (msgType) {
                case MessageType.ERROR:
                    // tslint:disable-next-line: no-console
                    console.error(text);
                    break;
                default:
                case MessageType.INFO:
                    break;
                }
                break;
            case ResCode.TOAST:
                const response = yield put(toastMessage(text, msgType));
                response && setTimeout(() => Entity.store.dispatch(resetMessage()), TOAST_TIME);
                break;
            default:
                break;
            }
        }
    }
}

export default new Identity();
