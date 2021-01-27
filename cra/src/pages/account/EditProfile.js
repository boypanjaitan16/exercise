import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {connect, useDispatch} from 'react-redux'
import ImageCropper from 'antd-img-crop'
import {useHistory} from 'react-router-dom'
import { Upload, message, Button, Tooltip } from 'antd';
import {setSession} from '../../redux/action'
import {IconButton} from '@material-ui/core'
import { PictureOutlined, DeleteOutlined } from '@ant-design/icons';


function EditProfile({session}){

    const dispatch  = useDispatch()
    const history   = useHistory()
    const [loading, setLoading]     = useState(false)
    const [imageUrl, setImageUrl]   = useState(session.user.avatar)
    const [fileList, setFileList]   = useState([])
    const {register, handleSubmit, errors} = useForm()

    const submitForm = (params) => {
        setLoading(true)
        const formData = new FormData();

        if(fileList.length > 0){
            formData.append("avatar", fileList[0])
        }

        Object.keys(params).map(item => {
            formData.append(item, params[item])
        })

        window.axios.post('/profile/update', formData, {
            headers : {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(res => {
                setLoading(false)
                const {data}    = res.data

                dispatch(setSession({...session, user: data}))
                history.push('/account/profile')
            })
            .catch(() => setLoading(false))
    }

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    
    const beforeUpload = (file) => {
        
        const isJpgOrPng    = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
            return;
        }

        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
            return;
        }

        setFileList([file])
        getBase64(file, (url) => {
            setImageUrl(url);
        })

        return false;
    }

    const removeAvatar = () => {
        window.axios.delete('/profile/remove-avatar')
            .then((res) => {
                const {data}    = res.data
                message.success('Avatar picture is deleted')
                setImageUrl(null)
                dispatch(setSession({...session, user: data}))
            })
    }

    return (
        <div className='w-full'>
            <form onSubmit={handleSubmit(submitForm)} className='flex flex-col space-y-4'>
                <div>
                    <label>Avatar</label>
                    <div className='flex items-center space-x-3'>
                        <div style={{ width: 105}}>
                            <ImageCropper
                                rotate
                                grid>
                                <Upload
                                    name="avatar"
                                    fileList={fileList}
                                    listType="picture-card"
                                    className="avatar-uploader mt-1"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                >
                                    {imageUrl ? (
                                        <div className='w-full relative'>
                                            <img src={imageUrl} alt="avatar" className='w-full'/>
                                            <div className='absolute inset-0 bg-black bg-opacity-40 text-white flex items-center justify-center flex-col'>
                                                <PictureOutlined/>
                                                <small className='mt-2'>Change</small>
                                            </div>
                                        </div>
                                    ): (
                                        <div className='flex flex-col items-center justify-center'>
                                            <PictureOutlined/>
                                            <small className='mt-2'>Choose</small>
                                        </div>
                                    )}
                                </Upload>
                            </ImageCropper>
                        </div>
                        {session.user.avatar && (
                            <Tooltip placement='right' title='Remove avatar picture'>
                                <IconButton onClick={removeAvatar} type='button' className='focus:outline-none'>
                                    <DeleteOutlined/>
                                </IconButton>
                            </Tooltip>
                        )}
                        
                    </div>
                </div>
                <div>
                    <label htmlFor='name' className='text-sm'>Name</label>
                    <input 
                        id='name'
                        type='text'
                        name='name'
                        defaultValue={session.user.name}
                        ref={
                            register({
                                required    : 'Name cannot be empty'
                            })
                        }
                        className={`a-input-text ${errors.name && 'border-red-500'}`}/>
                    {errors.name && (<small className='text-red-500'>{errors.name.message}</small>)}
                </div>

                <div>
                    <label htmlFor='email' className='text-sm'>Email</label>
                    <input 
                        id='email'
                        type='text'
                        defaultValue={session.user.email}
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
                    <Button loading={loading} htmlType='submit' type='primary' size='large' shape='round'>
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        session    : state.session
    }
}

export default connect(mapStateToProps)(EditProfile)