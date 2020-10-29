import {combineReducers} from 'redux'
import submitReducer from './submitReducer'
import alert from "./alert"
export default combineReducers({
    auth:submitReducer,
    alert
})