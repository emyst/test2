import * as types from '../actions/authActions';

export const initState = {
    user: {},
    users: {},
    userIsInvited: false,
    currentCanvasKey: null,
};

export function authReducer (state = initState, action) {
    switch(action.type) {
        case types.CHECK_AUTH:
            console.log('action.payload', action.payload);
            return{
                ...state,
                user: action.payload,
            };

        case types.ON_SUBSCRIBE_CURRENT_USERS:

            return{
                ...state,
                currentCanvasKey: action.payload.currentCanvas && action.payload.currentCanvas.currentCanvasKey?action.payload.currentCanvas.currentCanvasKey:null
            };

        case types.ON_SUBSCRIBE_USERS:
            return{
                ...state,
                users: action.payload
            };

        case types.USER_INVITED:
            return{
                ...state,
                userIsInvited: action.payload
            };

        case types.USER_NOT_INVITED:
            return{
                ...state,
                userIsInvited: action.payload
            };

        default:
            return state;
    }
};