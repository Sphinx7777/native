
import action from '../../src/decoradors/action';
import Entity from './entity';
import { put, call, cancelled } from 'redux-saga/effects';
import { getIdentity } from '../../src/redux/actions';
import { HTTP_METHOD } from '../../src/constants';

export interface ILoginData {
    userEmail: string,
    password: string;
    remember?: boolean;
}

class Identity extends Entity {

    constructor() {
        super();
        Entity.addSaga(

        );
    }

    @action()
    public * loginUser(data: ILoginData) {
        try {
            const { response } = yield call(Entity.fetch, '/auth/login', data, HTTP_METHOD.POST);
            if (response && response.user
                && response.user.userId
                && response.user.token && response.user.token.length > 0) {
                yield put(getIdentity(response));
            }
        } finally {
            if (yield cancelled()) {
                ('authorize yield cancelled');
            }
        }
    }

    @action()
    public * registerUser(data: any) {
        try {
            const { response } = yield call(Entity.fetch, '/auth/register', data);
        } finally {
            if (yield cancelled()) {
                ('authorize yield cancelled');
            }
        }
    }

    @action()
    public * onForgotClick(data: any) {
        const { response } = yield call(Entity.fetch, '/auth/forgot', data, HTTP_METHOD.POST);
    }

    @action()
    public * resetPassword(data: any) {
        const { response } = yield call(Entity.fetch, '/auth/reset-user-pass', data, HTTP_METHOD.POST);
    }

    @action()
    public * changePassword(data: any) {
        try {

            yield call(Entity.fetch,'/auth/change-user-pass', data);
        } finally {
            if (yield cancelled()) {
                ('changePassword cancelled');
            }
        }
    }

    @action()
    public * verifyAccount(data: any) {
        yield call(Entity.fetch, '/auth/verify', data, HTTP_METHOD.POST);
    }

    @action()
    public * logoutUser(data: any) {
     
            const { response } = yield call(Entity.fetch, '/auth/logout', data, HTTP_METHOD.POST);

    }
}

export default new Identity();
