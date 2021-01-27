import {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {format, formatDistance, isSameDay, isToday} from 'date-fns'
import {Tooltip, Popconfirm, Empty} from 'antd'
import {CircularProgress, IconButton} from '@material-ui/core'
import {DeleteOutlined} from '@material-ui/icons'
import {ClockCircleOutlined} from '@ant-design/icons'

function Activities({session}){
    const [list, setList]       = useState([])
    const [loading, setLoading] = useState(false)

    const parseToTime = (item, date) => {
        const from  = new Date(item.timeStart)
        const to    = new Date(item.timeEnd)

        if(isSameDay(from, to)){
            return format(new Date(date), 'HH:mm')
        }

        return format(new Date(date), 'dd/MM/yyyy HH:mm')
    }

    const tooltipValue = (start, end) => {
        const dateStart = new Date(start)
        const dateEnd   = new Date(end)

        if(isToday(dateStart) && isToday(dateEnd)){
            return `Today ${format(dateStart, 'HH:mm:ss')} - ${format(dateEnd, 'HH:mm:ss')}`
        }

        if(isSameDay(dateStart, dateEnd)){
            return `${format(dateStart, 'EEEE, dd MMMM yyyy HH:mm:ss')} - ${format(dateEnd, 'HH:mm:ss')}`
        }

        return `${format(dateStart, 'EEEE, dd MMMM yyyy HH:mm:ss')} - ${format(dateEnd, 'EEEE, dd MMMM yyyy HH:mm:ss')}`       
    }

    const parseDuration = (first, second) => {
        return formatDistance(
            new Date(first),
            new Date(second),
            {
                includeSeconds  : true
            }
        )
    }

    const deleteActivity = (item) => {
        window.axios.delete(`/activities/${item._id}`)
            .then(res => {
                const {data}    = res.data

                // setTimeout(() => {
                    setList(data)
                    setLoading(false)
                // }, 1000)
            })
    }

    useEffect(() => {
        setLoading(true)
        window.axios.get('/activities')
            .then(res => {
                const {data}    = res.data

                // setTimeout(() => {
                    setList(data)
                    setLoading(false)
                // }, 1000)
                
            })
            .catch(err => {
                setLoading(false)
            })
    }, [])

    if(loading){
        return (
            <div className='flex justify-center items-center h-full'>
                <CircularProgress/>
            </div>
        )
    }


    return (
        <>
            {list.length === 0 ? (
                <div className='flex justify-center items-center h-full'>
                    <Empty
                    // image={Empty.PRESENTED_IMAGE_SIMPLE} 
                    description="You don't have any activity recorded yet"/>
                </div>
            ): (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-5'>
                    {list.map(item => (
                        <div key={item._id} className='bg-gray-200 hover:bg-gray-300 rounded-lg px-5 py-3'>
                            <div className='flex'>
                                <div className='flex-grow'>
                                    <h4 className='font-semibold text-lg mb-0'>{item.name}</h4>
                                    <p className='text-gray-600 mt-0'>
                                        {item.description && (<p>{item.description}</p>)}
                                    </p>
                                    <div className='flex flex-shrink items-center'>
                                        <Tooltip title={tooltipValue(item.timeStart, item.timeEnd)}>
                                            <span className='bg-blue-500 cursor-default text-white text-xs rounded-full py-1 px-3'>{parseDuration(item.timeStart, item.timeEnd)} long</span>
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className='flex-none flex justify-center items-center'>
                                    <Popconfirm
                                        title='Are you sure to delete this activity?'
                                        placement='topRight'
                                        okText='Yes'
                                        onConfirm={() => deleteActivity(item)}
                                        cancelText='No'>
                                        <IconButton className='focus:outline-none'>
                                            <DeleteOutlined className='text-lg'/>
                                        </IconButton>
                                    </Popconfirm>
                                    
                                </div>
                            </div>
                            
                            
                            

                        </div>
                    ))}
                </div>
    
            )}
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        session     : state.session
    }
}

export default connect(mapStateToProps)(Activities)