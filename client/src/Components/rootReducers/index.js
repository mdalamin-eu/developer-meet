import {combineReducers} from 'redux'
import submitReducer from './submitReducer'
export default combineReducers({
    appState:submitReducer
})