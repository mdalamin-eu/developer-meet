import {combineReducers} from 'redux'
import submitReducer from './authReducer'
import alert from "./alert"
import profileReducer from './profileReducer'
export default combineReducers({
    auth:submitReducer,
    alert,
    profileData: profileReducer
});