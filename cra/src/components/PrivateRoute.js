import {Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux'

function PrivateRoute({session, path, component}){
    if(session){
        return (<Route path={path} component={component}/>)
    }

    return (<Redirect to={'/auth/sign-in'}/>)
}

const mapStateToProps = (state, props) => {
    return {
        session : state.session
    }
}

export default connect(mapStateToProps)(PrivateRoute)