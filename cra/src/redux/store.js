import {createStore} from 'redux'
import reducer from './reducer'
import middleware from './middleware'

export default function configureStore(initialState){
    return createStore(reducer, initialState, middleware)
}