import { Button, message } from 'antd'
import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import ChildWrapper from '../../../components/ChildWrapper'

export default function CreateCategory(){
    const history   = useHistory()
    const {handleSubmit, errors, register} = useForm()
    const [loading, setLoading] = useState(false)

    const submitForm = (params) => {
        setLoading(true)

        window.axios.post('/categories/create', params)
            .then(res => {
                setLoading(false)
                message.success(`Category "${params.name}" is created`)
                history.push('/account/category')
            })
            .catch(() => setLoading(false))
    } 

    return (
        <ChildWrapper>
            <form onSubmit={handleSubmit(submitForm)} className='flex flex-col space-y-3'>
                <div>
                    <label>Category Name</label>
                    <input
                        type='text'
                        name='name'
                        ref={
                            register({
                                required    : 'Category name is required'
                            })
                        }
                        className={`a-input-text ${errors.name && 'border-red-500'}`}/>
                        {errors.name && (<small className='text-red-500'>{errors.name.message}</small>)}
                </div>
                <div>
                    <label>Description (optional)</label>
                    <textarea
                        name={'description'}
                        className='a-input-text'
                        ref={
                            register({
                                required: false
                            })
                        }></textarea>
                </div>
                <div>
                    <Button 
                        loading={loading} 
                        type='primary' 
                        htmlType='submit' 
                        shape='round' 
                        size='large'>
                        Save Category
                    </Button>
                </div>
            </form>
        </ChildWrapper>
    )
}