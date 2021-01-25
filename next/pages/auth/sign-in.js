import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {message} from 'antd'
import Loader from '../../components/Loader'
import {UserOutlined} from '@ant-design/icons'
import {ArrowBack} from '@material-ui/icons'
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios'

export default function SignIn(){
    const {register, errors, handleSubmit}  = useForm()
    const [isLoading, setLoading]           = useState(false)

    const submit = (params) => {
        setLoading(true)
        
        axios.post('/auth/login', params)
            .then(res => {
                const {data}    = res.data

                setLoading(false)
                message.success(`Hello ${data.user?.name}`)
            })
            .catch(err => {
                setLoading(false)
                message.error(err.response.data.message)
            })
    }

    return (
        <>
        <Head>
            <title>Sign-in to {process.env.NEXT_PUBLIC_APP_NAME}</title>
        </Head>
        <div className='flex w-screen h-screen place-items-center items-center flex-col'>
            <form onSubmit={handleSubmit(submit)} className='md:border-2 relative md:border-gray-300 mx-6 my-auto md:m-auto w-full md:w-5/12 lg:w-4/12 rounded-lg p-8 h-auto'>
                <Loader loading={isLoading}/>
                    
                <Link href='/'>
                    <a className='w-auto items-center rounded-full px-3 py-2 bg-gray-200'>
                        <ArrowBack className='mr-1'/> Back to home
                    </a>
                </Link>

                <h4 className='mt-5 text-2xl mb-8 flex items-center'>
                    <UserOutlined className='mr-3'/> Sign-in to {process.env.NEXT_PUBLIC_APP_NAME}
                </h4>
                <div className='mb-4'>
                    <label htmlFor='username' className='text-sm'>Username</label>
                    <input 
                        id='username'
                        type='text'
                        name='username'
                        ref={
                            register({
                                required    : 'Username cannot be empty'
                            })
                        }
                        className='w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring focus:ring-blue-600'/>
                    {errors.username && (<small className='text-red-500'>{errors.username.message}</small>)}
                </div>
                <div className='mb-10'>
                    <label htmlFor='password' className='text-sm'>Password</label>
                    <input 
                        id='password'
                        name='password'
                        type='password'
                        ref={
                            register({
                                required: 'Password cannot be empty'
                            })
                        } 
                        className='w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring focus:ring-blue-600'/>
                    {errors.password && (<small className='text-red-500'>{errors.password.message}</small>)}
                </div>
                <button className='w-full focus:outline-none hover:bg-blue-500 text-xl text-white text-center font-semibold bg-blue-600 py-3 px-4 rounded-lg'>Sign In</button>
            </form>
        </div>
        </>
    )
}