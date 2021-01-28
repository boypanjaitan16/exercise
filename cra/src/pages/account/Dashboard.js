import {connect} from 'react-redux'
import ChildWrapper from '../../components/ChildWrapper'

function Dashboard({user}){
    return (
        <ChildWrapper>
            <div className='flex justify-center items-center h-full'>
                <h5 className='text-2xl flex items-center'><span>Hello</span> {user.avatar ? (<img alt={user.name} className='rounded-full w-10 mx-2' src={user.avatar}/>) : (<>&nbsp;</>)} <b>{user.name}</b></h5>
            </div>
        </ChildWrapper>
        
    )
}

const mapStateToProps = (state, props) => {
    return {
        user     : state.session.user
    }
}

export default connect(mapStateToProps)(Dashboard)