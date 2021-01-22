import {CLEAR_SESSION, SET_SESSION} from '../types'

const setSession = (session) => {
    return {
        type    : SET_SESSION,
        session
    }
}

const clearSession = () => {
    return {
        type    : CLEAR_SESSION
    }
}

export {
    setSession,
    clearSession
}