import { combineReducers } from 'redux';

enum IReducerTypes {
    SET_DATA = 'SET_DATA',
    SET_USER = 'SET_USER'
} 


const initialState = {
    dataItems: []
};


const dataSignal = (state = initialState, action: any) => {
    switch (action.type) {
        case IReducerTypes.SET_DATA:
            return {
                ...state,
                dataItems: action.payload.dataItems
            };
        default:
            return state;
    }
}
const identityInitialState = {
    user: null
};
const identity = (state = identityInitialState, action: any) => {
    switch (action.type) {
        case IReducerTypes.SET_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    dataSignal,
    identity
});
export default rootReducer;