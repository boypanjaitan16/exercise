import {Switch, Route} from 'react-router-dom'

import Create from './Create'
import Edit from './Edit'
import List from './List'
import Detail from './Detail'

export default function CategoryRoutes({match}){
    return (
        <Switch>
            <Route path={`${match.url}/create`} component={Create}/>
            <Route path={`${match.url}/:id/edit`} component={Edit}/>
            <Route path={`${match.url}/:id`} component={Detail}/>
            <Route path={`${match.url}`} component={List}/>
        </Switch>
    )
}