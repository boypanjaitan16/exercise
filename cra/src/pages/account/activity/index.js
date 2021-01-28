import {Switch, Route} from 'react-router-dom'
import Activities from './Activities'
import Add from './Add'

export default function ActivityRouter({match}){
    return (
        <Switch>
            <Route path={`${match.url}/add`} component={Add}/>
            <Route path={`${match.url}`} component={Activities}/>
        </Switch>
    )
}