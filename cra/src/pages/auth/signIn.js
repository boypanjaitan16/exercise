import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
// import {message} from 'antd'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {ArrowBack, ArrowForward} from '@material-ui/icons'
import {UserOutlined} from '@ant-design/icons'
import Loader from '../../components/Loader'
import {setSession} from '../../redux/action'

export default function SignIn(){
    const dispatch  = useDispatch()
    const history   = useHistory()
    const {register, errors, handleSubmit}  = useForm()
    const [isLoading, setLoading]           = useState(false)

    const submit = (params) => {
        setLoading(true)
        
        window.axios.post('http://127.0.0.1:8008/api/auth/login', params)
            .then(res => {
                const {data}    = res.data

                setLoading(false)
                dispatch(setSession(data))
                history.push('/account')
            })
            .catch(err => {
                setLoading(false)
            })
    }

    return (
        <div className='flex w-full h-screen place-items-center items-center flex-col'>
        
            <form onSubmit={handleSubmit(submit)} className='md:border-2 relative md:border-gray-300 mx-6 my-auto md:m-auto w-full md:w-5/12 lg:w-4/12 rounded-lg p-8 h-auto'>
                <Loader loading={isLoading}/>
                
                <a href='#/' className='w-auto items-center rounded-full px-3 py-2 bg-gray-200'>
                    <ArrowBack className='mr-1'/> Back to home
                </a>
            

                <h4 className='text-2xl mb-8 mt-5 flex items-center'>
                    <UserOutlined className='mr-3'/> Sign-in to {process.env.REACT_APP_APP_NAME}
                </h4>
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
                
                <div>
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
                        className={`a-input-text ${errors.password && 'border-red-500'}`}/>
                    {errors.password && (<small className='text-red-500'>{errors.password.message}</small>)}
                </div>
                <p className='text-right mb-10 mt-1 text-sm'>
                    <a href='#/auth/forgot-password'>Forgot Password</a>
                </p>

                <p>
                    <button className='w-full focus:outline-none hover:bg-blue-400 text-xl text-white text-center font-semibold bg-blue-600 py-3 px-4 rounded-lg'>Sign In</button>
                </p>
                
                <p className='text-right mt-5'>
                    <a href='#/auth/sign-up' className='w-auto items-center rounded-full px-3 py-2 bg-gray-200'>
                        Create an account <ArrowForward className='ml-3'/>
                    </a>
                </p>
            </form>
        </div>
    )
}