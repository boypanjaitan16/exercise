import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import {format} from 'date-fns'
import {Empty, Button} from 'antd'
import {CircularProgress} from '@material-ui/core'
import {
    Button as MUIButton,
    Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,
} from '@material-ui/core'
import ActivityItem from '../../../components/ActivityItem'
import ChildWrapper from '../../../components/ChildWrapper'

function DetailCategory({user}){
    const {id}    = useParams()
    const history   = useHistory()
    const [initial, setInitial] = useState(null)
    const [loading, setLoading] = useState(true)
    const [openDelete, setDelete]   = useState(false)
    
    const loadData = () => {
        setLoading(true)
        window.axios.get(`/categories/${id}`)
            .then(res => {
                const {data}    = res.data

                setInitial(data)
                setLoading(false)
            })
    }

    const deleteCategory = () => {
        setLoading(true)
        setDelete(false)
        window.axios.delete(`/categories/${initial?._id}`)
            .then(res => {
                history.goBack()
            })
            .catch(() => setLoading(false))
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <ChildWrapper path='/category/detail'>
            <Dialog
                open={openDelete}
                onClose={() => setDelete(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Delete Category</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to delete category "{initial?.name}"? 
                        this is also will delete all activities inside the category
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MUIButton onClick={() => setDelete(false)} color="primary">
                        Cancel
                    </MUIButton>
                    <MUIButton onClick={deleteCategory} color='secondary'>
                        Yes
                    </MUIButton>
                </DialogActions>
            </Dialog>
            
            {loading ? (
                <div className='flex justify-center items-center h-full'>
                    <CircularProgress/>
                </div>
            ):
            (
                <div>
                    <h4 className='font-semibold text-3xl mb-0'>{initial?.name}</h4>
                    <p className='text-gray-500 mb-5'>{initial?.description}</p>
                    
                    <div className='flex flex-col md:flex-row'>
                        <p className='flex items-center'>
                            <img className='h-12 w-12 rounded-full' alt={user.name} src={user.avatar ?? `${process.env.PUBLIC_URL}/logo512.png`}/>
                            <div className='ml-3'>
                                <p className='font-semibold mb-0'>{user.name}</p>
                                <small>Created on {format(new Date(initial.createdAt), 'EEEE, dd MMMM yyyy')}</small>
                            </div>
                        </p>
                        <div className='flex-grow flex items-center space-x-5 justify-start md:justify-end'>
                            <Button href={`#/account/category/${initial._id}/edit`} type='primary'>Edit</Button>
                            <Button onClick={() => setDelete(true)} type='default'>Delete</Button>
                        </div>
                    </div>
                    

                    <div className='mt-10'>
                        {initial.activities.length === 0 ? (
                            <div className='p-5 border border-dashed'>
                                <Empty description='This category is empty'/>
                            </div>
                        ): 
                        (
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-5'>
                                {initial.activities.map(item => (
                                    <ActivityItem 
                                        showCategory={false}
                                        key={item._id} 
                                        item={item} 
                                        deleteCallback={loadData}/>
                                ))}
                            </div>
                        )}
                    </div>
                    
                </div>
            )}
        </ChildWrapper>
    )
}

const mapStateToProps = (state, props) => {
    return {
        user    : state.session.user
    }
}

export default connect(mapStateToProps)(DetailCategory)