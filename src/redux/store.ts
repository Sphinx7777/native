import { all } from 'redux-saga/effects';
import {createStore, applyMiddleware, compose, Store} from 'redux';
import createSagaMiddleware, {Task} from 'redux-saga';
import rootReducer from './reducers';
import Entity from '../../src/models/entity';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
export interface SagaStore extends Store {
    sagaTask?: Task;
    runSaga: () => void;
}

const rootSaga = function* root() {
    yield all( Entity.saga );
};

export const makeStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : 
        compose;

    const enhancer = composeEnhancers(
        applyMiddleware(sagaMiddleware)
    );

    const store = createStore(rootReducer, enhancer) as SagaStore;
    store.sagaTask = sagaMiddleware.run(rootSaga);
    Entity.store = store;
    store.runSaga = () => sagaMiddleware.run(rootSaga);
    

    return store;
};

export default makeStore;