import React, {useEffect, useState} from 'react'
import {Button, Empty} from 'antd'
import {useHistory} from 'react-router-dom'
import ChildWrapper from '../../../components/ChildWrapper'
import {
    CircularProgress, 
    IconButton, Button as MUIButton,
    Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,
    List, ListItem, ListItemAvatar,
    ListItemText
} from '@material-ui/core'
import {MenuRounded, DeleteOutlined, EditOutlined, FolderOutlined} from '@material-ui/icons'

export default function ListCategories(){
    const history   = useHistory()
    const [list, setList]               = useState([])
    const [loading, setLoading] = useState(false)
    const [openDelete, setDelete]   = useState(false)
    const [actions, setActions] = useState({
        open        : false,
        selectedCat : null,
        selectedAct : null
    })

    const deleteCategory = () => {
        setLoading(true)
        setDelete(false)
        window.axios.delete(`/categories/${actions.selectedCat?._id}`)
            .then(res => {
                const {data}    = res.data

                setList(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }

    useEffect(() => {
        setLoading(true)

        window.axios.get('/categories')
            .then(res => {
                const {data}    = res.data
                
                setList(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    return (
        <ChildWrapper>
            <Dialog
                open={openDelete}
                onClose={() => setDelete(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Delete Category</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to delete category "{actions.selectedCat?.name}"? 
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
            
            
            <Dialog 
                // maxWidth='md'
                // fullWidth
                
                onClose={() => setActions({...actions, open: false})} 
                open={actions.open}>
                {/* <DialogTitle>{actions.selectedCat?.name}</DialogTitle> */}
                <List>
                    <ListItem divider button onClick={() => {
                        setActions({...actions, open: false})
                        history.push(`/account/category/${actions.selectedCat._id}`)
                    }}>
                        <ListItemAvatar>
                            <FolderOutlined/>
                        </ListItemAvatar>
                        <ListItemText primary="See details" />
                    </ListItem>
                    <ListItem divider button onClick={() => {
                        setActions({...actions, open: false})
                        history.push(`/account/category/${actions.selectedCat._id}/edit`)
                    }}>
                        <ListItemAvatar>
                            <EditOutlined/>
                        </ListItemAvatar>
                        <ListItemText primary="Edit category" />
                    </ListItem>
                    <ListItem button onClick={() => {
                        setActions({...actions, open: false})
                        setDelete(true)
                    }}>
                        <ListItemAvatar>
                            <DeleteOutlined className='text-red-600'/>
                        </ListItemAvatar>
                        <ListItemText className='text-red-600' primary="Delete category" />
                    </ListItem>
                </List>
            </Dialog>
            
            <div className='mb-5'>
                <Button href='#/account/category/create' type='default'>Create New</Button>
            </div>
            {loading ? (
                <div className='flex justify-center items-center h-full'>
                    <CircularProgress/>
                </div>
            ): (
                list.length === 0 ? (
                    <div className='flex justify-center items-center h-full'>
                        <Empty
                        // image={Empty.PRESENTED_IMAGE_SIMPLE} 
                        description="You don't have any category yet"/>
                    </div>
                ): (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                        {list.map((item, index) => (
                            <div key={index} className='rounded-lg overflow-hidden'>
                                <div className='bg-blue-400 px-5 flex items-center'>
                                    <h4 className='flex-grow mb-0 font-semibold text-lg'>{item.name}</h4>
                                    <div style={{ marginRight: -15}} className='flex-none'>
                                        <IconButton 
                                            onClick={() => setActions({...actions, selectedCat: item, open: true})} 
                                            className='focus:outline-none'>
                                            <MenuRounded/>
                                        </IconButton>
                                    </div>
                                </div>
                                <div className='bg-gray-300 p-5 flex items-center'>
                                    <span className='font-semibold text-3xl md:text-5xl mr-3'>{item.activities.length}</span>
                                    <span>Activities</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )
                
            )}
        </ChildWrapper>
    )
}