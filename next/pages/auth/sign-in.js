import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {message} from 'antd'
import Loader from '../../components/Loader'

export default function SignIn(){
    const {register, errors, handleSubmit}  = useForm()
    const [isLoading, setLoading]           = useState(false)

    const submit = (params) => {
        setLoading(true)
        
        window.axios.post('/auth/login', params)
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
        <div className='flex w-screen h-screen place-items-center items-center flex-col'>
        
            <form onSubmit={handleSubmit(submit)} className='border-2 relative border-gray-500 mx-6 my-auto md:m-auto w-full md:w-5/12 lg:w-4/12 rounded-lg p-8 h-auto'>
                <Loader loading={isLoading}/>
                <h4 className='text-2xl mb-8 mt-0'>Sign-in to {process.env.APP_NAME}</h4>
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
    )
}