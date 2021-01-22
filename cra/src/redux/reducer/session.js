import {SET_SESSION, CLEAR_SESSION} from '../types'
import Cookies from 'js-cookie'
import axios from 'axios'

export default function sessionReducer(state = null, action){
    const {type, session}    = action

    if(type === SET_SESSION){
        axios.defaults.headers.common['Authorization']  = `Bearer ${session.token}`
        Cookies.set(`${process.env.REACT_APP_APP_NAME}_session`, session, {expires: 7})
        return session
    }

    if(type === CLEAR_SESSION){
        delete axios.defaults.headers.common["Authorization"];
        Cookies.remove(`${process.env.REACT_APP_APP_NAME}_session`)
        return false
    }

    return state
}