import {Switch, Route} from 'react-router-dom'
import Profile from './Profile'
import Edit from './Edit'

export default function ProfileRoutes({match}){
    return (
        <Switch>
            <Route path={`${match.url}/edit`} component={Edit}/>
            <Route path={`${match.url}`} component={Profile}/>
        </Switch>
    )
}