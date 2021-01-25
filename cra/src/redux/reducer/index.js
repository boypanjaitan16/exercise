import {combineReducers} from 'redux'
import session from './session'
import error from './error'

export default combineReducers({
    session,
    error
})