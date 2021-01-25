export default function errorReducer(state = null, action){
    const {type, message, severity}    = action

    if(type === 'SET_ERROR'){
        return {
            message,
            severity
        }
    }

    if(type === 'CLEAR_ERROR'){
        return null
    }

    return state
}