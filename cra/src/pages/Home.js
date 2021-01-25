import React from 'react'
import {connect} from 'react-redux'
import {UserOutlined, GoogleOutlined} from '@ant-design/icons'

function Home({session}){
    return (
        <>
        <div className='grid grid-cols-1 md:grid-cols-12 mx-5 md:mx-16 lg:mx-32 h-screen items-center'>
            <div className='md:col-span-8'>
                <h2 className='text-3xl font-semibold'>Welcome to {process.env.REACT_APP_APP_NAME}</h2>
                <img src='/images/home.png' alt='Home banner' className='max-w-sm'/>
            </div>
            <div className='md:col-span-4 flex space-y-3 flex-col'>
                <p className='text-gray-500'>You can start tracking your activities easily from now for the future you</p>
                
                <a href={session ? '#/account' : '#/auth/sign-in'} className='w-full flex items-center py-2 px-3 rounded-md border-2 border-indigo-500 hover:text-black hover:border-indigo-600 bg-white'>
                    <span className='text-sm flex-grow'>{session ? `Go to your account ${session.user.name}` : 'Sign-in with email'}</span>
                    <UserOutlined/>
                </a>
                <a href='#/' className='w-full flex items-center py-2 px-3 rounded-md bg-indigo-500 hover:bg-indigo-600 hover:text-white text-white'>
                    <span className='text-sm flex-grow'>Sign-in with Google</span>
                    <GoogleOutlined/>
                </a>
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