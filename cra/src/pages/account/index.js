import {Switch, Route} from 'react-router-dom'
import PageWrapper from '../../components/PageWrapper'

import Dashboard from './Dashboard'
import Activities from './Activities'
import Profile from './Profile'
import EditProfile from './EditProfile'
import AddRecord from './AddRecord'

export default function AccountRouters({match}){
    return (
        <PageWrapper>
            <Switch>
                <Route exact path={`${match.url}`} component={Dashboard}/>
                <Route path={`${match.url}/activities`} component={Activities}/>
                <Route path={`${match.url}/profile/edit`} component={EditProfile}/>
                <Route path={`${match.url}/profile`} component={Profile}/>
                <Route path={`${match.url}/add-record`} component={AddRecord}/>
            </Switch>
        </PageWrapper>
    )
}