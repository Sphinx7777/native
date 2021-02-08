import { combineReducers } from 'redux';

enum IReducerTypes {
    SET_DATA = 'SET_DATA',
    SET_USER = 'SET_USER',
    CHANGE_DATA = 'CHANGE_DATA'
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
            case IReducerTypes.CHANGE_DATA:
                return {
                    ...state,
                    dataItems: state.dataItems.map((d: any) => {
                        if (d.id === action.payload.id) {
                            return action.payload
                        }
                        return d
                    })
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