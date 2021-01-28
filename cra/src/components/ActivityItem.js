import React from 'react'
import {FolderOutlined} from '@ant-design/icons'
import {Tooltip, Popconfirm} from 'antd'
import {IconButton} from '@material-ui/core'
import {DeleteOutlined} from '@material-ui/icons'
import {format, formatDistance, isSameDay, isToday} from 'date-fns'

export default function ActivityItem({item, showCategory=true, deleteCallback}){
    const tooltipValue = () => {
        const dateStart = new Date(item.timeStart)
        const dateEnd   = new Date(item.timeEnd)

        if(isToday(dateStart) && isToday(dateEnd)){
            return `Today ${format(dateStart, 'HH:mm:ss')} - ${format(dateEnd, 'HH:mm:ss')}`
        }

        if(isSameDay(dateStart, dateEnd)){
            return `${format(dateStart, 'EEEE, dd MMMM yyyy HH:mm:ss')} - ${format(dateEnd, 'HH:mm:ss')}`
        }

        return `${format(dateStart, 'EEEE, dd MMMM yyyy HH:mm:ss')} - ${format(dateEnd, 'EEEE, dd MMMM yyyy HH:mm:ss')}`       
    }

    const parseDuration = () => {
        return formatDistance(
            new Date(item.timeStart),
            new Date(item.timeEnd),
            {
                includeSeconds  : true
            }
        )
    }

    const deleteActivity = () => {
        window.axios.delete(`/activities/${item._id}`)
            .then(res => {
                const {data}    = res.data

                if(deleteCallback){
                    deleteCallback(data)
                }
            })
    }

    return (
        <div className='bg-gray-200 hover:bg-gray-300 rounded-lg px-5 py-3'>
            <div className='flex h-full'>
                <div className='flex-grow flex flex-col h-full'>
                    <div className='flex-grow'>
                        <h4 className='font-semibold text-lg mb-0 flex items-center'>
                            {item.name}
                            {(item.category && showCategory) && (
                                <a href={`#/account/category/${item.category._id}`} className='flex items-center flex-none bg-gray-500 font-normal py-1 px-2 ml-2 text-white text-xs rounded-full'>
                                    <FolderOutlined className='mr-1'/>
                                    {item.category.name}
                                </a>
                            )}
                        </h4>
                        {item.description && (<p className='text-gray-600 mb-0 mt-0'>{item.description}</p>)}
                    </div>
                    
                    <div className='flex flex-shrink items-center flex-none mt-3'>
                        <Tooltip title={tooltipValue()}>
                            <span style={{ marginLeft: -20}} className='bg-blue-500 cursor-default text-white text-xs rounded-r-full py-1 px-3'>
                                {parseDuration()} long
                            </span>
                        </Tooltip>
                    </div>
                </div>
                <div className='flex-none flex justify-center items-center'>
                    <Popconfirm
                        title='Are you sure to delete this activity?'
                        placement='topRight'
                        okText='Yes'
                        onConfirm={() => deleteActivity()}
                        cancelText='No'>
                        <IconButton className='focus:outline-none'>
                            <DeleteOutlined className='text-lg'/>
                        </IconButton>
                    </Popconfirm>
                    
                </div>
            </div>
        </div>
    )
}