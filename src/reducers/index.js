import { combineReducers } from 'redux';
import { canvasReducer } from './canvasReducer';
import { authReducer } from './authReducer';
//import { teamReducer } from "./team_reducer";

const rootReducer = combineReducers({
    canvas: canvasReducer,
    auth: authReducer
});

export default rootReducer;