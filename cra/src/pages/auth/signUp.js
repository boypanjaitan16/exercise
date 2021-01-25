import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {ArrowBack} from '@material-ui/icons'
import {UserOutlined} from '@ant-design/icons'
import Loader from '../../components/Loader'
import {setSession} from '../../redux/action'

export default function SignUp(){
    const history   = useHistory()
    const dispatch  = useDispatch()
    const {register, errors, handleSubmit}  = useForm()
    const [isLoading, setLoading]           = useState(false)

    const submit = (params) => {
        setLoading(true)
        
        window.axios.post('/auth/register', params)
            .then(res => {
                const {data}    = res.data

                setLoading(false)
                dispatch(setSession(data))
                history.push('/account')
                // message.success(`Welcome to ${process.env.REACT_APP_APP_NAME} ${data.user?.name}`)
            })
            .catch(err => {
                setLoading(false)
            })
    }

    return (
        <div className='flex w-full h-screen place-items-center items-center flex-col'>
        
            <div className='relative mx-6 my-auto md:m-auto w-full md:w-5/12 lg:w-5/12 rounded-lg p-8 h-auto'>
                <form onSubmit={handleSubmit(submit)}>
                    <Loader loading={isLoading}/>
                    
                    <a href='#/auth/sign-in' className='w-auto items-center rounded-full px-3 py-2 bg-gray-200'>
                        <ArrowBack className='mr-1'/> Back to Sign-in
                    </a>
                

                    <h4 className='text-2xl mb-8 mt-5 flex items-center'>
                        <UserOutlined className='mr-3'/> Sign-up for {process.env.REACT_APP_APP_NAME} account
                    </h4>
                    <div className='mb-2'>
                        <label htmlFor='name' className='text-sm'>Name</label>
                        <input 
                            id='name'
                            type='text'
                            name='name'
                            ref={
                                register({
                                    required    : 'Name cannot be empty'
                                })
                            }
                            className={`a-input-text ${errors.name && 'border-red-500'}`}/>
                        {errors.name && (<small className='text-red-500'>{errors.name.message}</small>)}
                    </div>

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
                    
                    <div className='mb-2'>
                        <label htmlFor='password' className='text-sm'>Password</label>
                        <input 
                            id='password'
                            name='password'
                            type='password'
                            ref={
                                register({
                                    required: 'Password cannot be empty',
                                    minLength: {
                                        value   : 6,
                                        message: 'Password need to be more than six chars'
                                    }
                                })
                            } 
                            className={`a-input-text ${errors.password && 'border-red-500'}`}/>
                        {errors.password && (<small className='text-red-500'>{errors.password.message}</small>)}
                    </div>

                    <div>
                        <label htmlFor='password_confirmation' className='text-sm'>Confirm Password</label>
                        <input 
                            id='password_confirmation'
                            name='password_confirmation'
                            type='password'
                            ref={
                                register({
                                    required: 'Password Confirmation cannot be empty',
                                    minLength: {
                                        value   : 6,
                                        message: 'Password need to be more than six chars'
                                    }
                                })
                            } 
                            className={`a-input-text ${errors.password_confirmation && 'border-red-500'}`}/>
                        {errors.password_confirmation && (<small className='text-red-500'>{errors.password_confirmation.message}</small>)}
                    </div>

                    <p className='mt-10'>
                        <button className='w-full focus:outline-none hover:bg-blue-400 text-xl text-white text-center font-semibold bg-blue-600 py-3 px-4 rounded-lg'>Sign Up</button>
                    </p>
                </form>              
            </div>
        </div>
    )
}