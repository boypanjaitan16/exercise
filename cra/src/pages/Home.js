import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {connect, useDispatch} from 'react-redux'
import {UserOutlined, GoogleOutlined, LoadingOutlined} from '@ant-design/icons'
import {signInWithGoogle} from '../services/firebase'
import {setSession} from '../redux/action'


function Home({session}){

    const dispatch  = useDispatch()
    const history   = useHistory()
    const [loading, setLoading] = useState(false)

    const authGoogle = () => {
        setLoading(true)
        signInWithGoogle()
            .then(res => {
                console.log(res.additionalUserInfo.profile)

                const {name, email, picture}    = res.additionalUserInfo.profile

                window.axios.post('/auth/login/provider', {
                    name, email, picture
                })
                    .then(res => {
                        const {data}    = res.data

                        setLoading(false)
                        dispatch(setSession(data))
                        history.push('/account')
                    })
                    .catch(() => setLoading(false))
            })
            .catch(err => {
                setLoading(false)
                dispatch({
                    type    : 'SET_ERROR',
                    message : err.message
                })
            })
    }

    return (
        <>
        <div className='grid grid-cols-1 md:grid-cols-12 mx-5 md:mx-16 lg:mx-32 h-screen items-center'>
            <div className='md:col-span-8'>
                <h2 className='text-3xl font-semibold'>Welcome to {process.env.REACT_APP_APP_NAME}</h2>
                <img src='/images/home.png' alt='Home banner' className='max-w-full sm:w-10/12 md:w-5/12'/>
            </div>
            <div className='md:col-span-4 flex space-y-3 flex-col'>
                <p className='text-gray-500'>You can start tracking your activities easily from now for the future you</p>
                
                <a href={session ? '#/account' : '#/auth/sign-in'} className='w-full flex items-center py-2 px-3 rounded-md hover:text-black bg-gray-300'>
                    <span className='text-sm flex-grow'>{session ? `Go to your account ${session.user.name}` : 'Sign-in with email'}</span>
                    <UserOutlined/>
                </a>
                {!session && (
                    <button disabled={loading} onClick={authGoogle} href='#/' className='w-full text-left flex items-center py-2 px-3 rounded-md bg-indigo-500 hover:bg-indigo-600 hover:text-white text-white'>
                        <span className='text-sm flex-grow'>Sign-in with Google</span>
                        {loading ? <LoadingOutlined/> : <GoogleOutlined/>}
                    </button>
                )}
                
            </div>
        </div>
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        session : state.session
    }
}

export default connect(mapStateToProps)(Home)