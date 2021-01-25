import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {message} from 'antd'
import {ArrowBack} from '@material-ui/icons'
import Loader from '../../components/Loader'

export default function ForgotPassword(){
    const {register, errors, handleSubmit}  = useForm()
    const [isLoading, setLoading]           = useState(false)

    const submit = (params) => {
        setLoading(true)
        
        window.axios.post('/auth/forgot-password', params)
            .then(res => {
                const {data}    = res.data

                setLoading(false)
                message.success(`Hello ${data.user?.name}`)
            })
            .catch(err => {
                setLoading(false)
                
            })
    }

    return (
        <div className='flex w-full h-screen place-items-center items-center flex-col'>
        
            <form onSubmit={handleSubmit(submit)} className='md:border-2 relative md:border-gray-300 mx-6 my-auto md:m-auto w-full md:w-5/12 lg:w-4/12 rounded-lg p-8 h-auto'>
                <Loader loading={isLoading}/>
                
                <a href='#/auth/sign-in' className='w-auto items-center rounded-full px-3 py-2 bg-gray-200'>
                    <ArrowBack className='mr-1'/> Back to Sign-in
                </a>
            

                <h4 className='text-2xl mb-8 mt-5 flex items-center'>
                    Forgot Password?
                </h4>
                <p className='text-gray-400'>
                    Enter the email address you used when you joined and we’ll send you instructions to reset your password.
                </p>
                <div className='mb-2'>
                    <label htmlFor='email' className='text-sm'>Email</label>
                    <input 
                        id='email'
                        type='text'
                        name='email'
                        ref={
                            register({
                                required    : 'Email cannot be empty',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })
                        }
                        className={`a-input-text ${errors.email && 'border-red-500'}`}/>
                    {errors.email && (<small className='text-red-500'>{errors.email.message}</small>)}
                </div>

                <p className='mt-10'>
                    <button className='w-full focus:outline-none hover:bg-blue-400 text-xl text-white text-center font-semibold bg-blue-600 py-3 px-4 rounded-lg'>Reset Password</button>
                </p>
            </form>
        </div>
    )
}