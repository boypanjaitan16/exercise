import {Switch, Route} from 'react-router-dom'
import PageWrapper from '../../components/PageWrapper'

import Dashboard from './Dashboard'
import Activity from './activity'
import Profile from './profile'
import Category from './category'

export default function AccountRouters({match}){
    return (
        <PageWrapper>
            <Switch>
                <Route exact path={`${match.url}`} component={Dashboard}/>
                <Route path={`${match.url}/activity`} component={Activity}/>
                <Route path={`${match.url}/profile`} component={Profile}/>
                <Route path={`${match.url}/category`} component={Category}/>
            </Switch>
        </PageWrapper>
    )
}