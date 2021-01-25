import React from 'react'
import {Switch, Route} from 'react-router-dom'
import signIn from './signIn'
import signUp from './signUp'
import forgotPass from './forgotPass'

export default function AuthRouters({match}){
    return (
        <Switch>
            <Route exact path={`${match.url}/`} component={signIn}/>
            <Route path={`${match.url}/sign-in`} component={signIn}/>
            <Route path={`${match.url}/sign-up`} component={signUp}/>
            <Route path={`${match.url}/forgot-password`} component={forgotPass}/>
        </Switch>
    )
}