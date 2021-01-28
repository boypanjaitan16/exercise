import {connect} from 'react-redux'
import {Button, message} from 'antd'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {FormGroup, TextField} from '@material-ui/core'
import ChildWrapper from '../../../components/ChildWrapper'

function Profile({user}){
    const [loading, setLoading] = useState(false)
    const [show, toogleModal]   = useState(false)
    const {register, errors, handleSubmit}    = useForm()

    const imgUrl = () => {
        if(user.avatar){
            return user.avatar;
        }
        return `${process.env.PUBLIC_URL}/logo512.png`
    }

    const updatePassword = (params) => {
        setLoading(true)
        window.axios.post('/profile/update/password', params)
            .then(() => {
                setLoading(false)
                toogleModal(false)
                message.success('Password is updated')
            })
            .catch(() => setLoading(false))
    }

    return (
        <ChildWrapper>
            {show && (
                <div className='fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center'>
                    <div className='bg-white mx-5 md:mx-0 w-full md:w-5/12 lg:w-4/12 relative rounded-lg border-2 border-gray-700 px-5 py-10 md:p-10'>
                        <button onClick={() => toogleModal(false)}
                            style={{ top: -10, right: -10}}
                            className='absolute focus:outline-none bg-gray-700 w-8 h-8 rounded-full overflow-hidden'>
                            <svg className='h-8 w-8 text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        <form onSubmit={handleSubmit(updatePassword)}>

                            <FormGroup className='mb-5'>
                                <TextField
                                    fullWidth
                                    inputRef={register({
                                        required : 'Current password is required',
                                    })}
                                    error={!!errors.password_current}
                                    helperText={errors.password_current?.message}
                                    name={'password_current'}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    size={'small'}
                                    type="password"
                                    label="Current Password"
                                    variant="outlined" />
                            </FormGroup>

                            <FormGroup className='mb-5'>
                                <TextField
                                    fullWidth
                                    inputRef={register({
                                        required : 'New password is required',
                                    })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    name={'password'}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    size={'small'}
                                    type="password"
                                    label="New Password"
                                    variant="outlined" />
                            </FormGroup>

                            <FormGroup className='mb-5'>
                                <TextField
                                    fullWidth
                                    inputRef={register({
                                        required : 'Confirmation password is required',
                                    })}
                                    error={!!errors.password_confirmation}
                                    helperText={errors.password_confirmation?.message}
                                    name={'password_confirmation'}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    size={'small'}
                                    type="password"
                                    label="Confirm Password"
                                    variant="outlined" />
                            </FormGroup>

                            <div className='text-right mt-5'>
                                <Button loading={loading} shape='round' htmlType='submit' type="primary">
                                    Save Changes
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
            
            <div className='h-full text-center'>
                <div className='w-full'>
                    <img className='m-auto w-6/12 rounded-full md:w-3/12 lg:w-2/12' src={imgUrl()} alt={user.name}/>
                </div>
                
                <h3 className='font-semibold text-2xl mb-0 mt-10'>{user.name}</h3>
                <p className='text-gray-500 mb-3'>{user.email}</p>
                <div className='flex items-center justify-center space-x-2'>
                    <Button href='#/account/profile/edit' type='default' shape='round'>Edit Profile</Button>
                    <Button onClick={() => toogleModal(true)} type='dashed' shape='round'>
                        Change Password
                    </Button>
                </div>
            </div>
        </ChildWrapper>
    )
}

const mapStateToProps = (state, props) => {
    return {
        user        : state.session.user,
    }
}

export default connect(mapStateToProps)(Profile)