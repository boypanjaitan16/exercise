import { Button, message } from 'antd'
import React, {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {useHistory, useParams} from 'react-router-dom'
import ChildWrapper from '../../../components/ChildWrapper'

export default function EditCategory(){
    const {id}    = useParams()
    const history   = useHistory()
    const {handleSubmit, errors, register} = useForm()
    const [loading, setLoading] = useState(false)
    const [initial, setInitial] = useState(null)

    const submitForm = (params) => {
        setLoading(true)

        window.axios.patch(`/categories/${id}`, params)
            .then(res => {
                setLoading(false)
                message.success(`Category "${params.name}" is updated`)
                history.goBack()
            })
            .catch(() => setLoading(false))
    } 

    useEffect(() => {
        setLoading(true)
        window.axios.get(`/categories/${id}`)
            .then(res => {
                const {data}    = res.data

                setLoading(false)
                setInitial(data)
            })
            .catch(() => setLoading(false))
    }, [])

    return (
        <ChildWrapper path='/category/edit'>
            <form onSubmit={handleSubmit(submitForm)} className='flex flex-col space-y-3'>
                <div>
                    <label>Category Name</label>
                    <input
                        type='text'
                        defaultValue={initial?.name}
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
                        defaultValue={initial?.description}
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
                        Save Changes
                    </Button>
                </div>
            </form>      
        </ChildWrapper>
    )
}