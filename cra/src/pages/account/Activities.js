import {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {format, formatDistance, isSameDay, isToday} from 'date-fns'
import {Tooltip, Popconfirm, Empty} from 'antd'
import {CircularProgress, IconButton} from '@material-ui/core'
import {DeleteOutlined, ClockCircleOutlined} from '@ant-design/icons'

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

    const tooltipValue = (value) => {
        const date  = new Date(value)

        if(isToday(date)){
            return 'Today'
        }
        return format(date, 'EEEE, dd MMMM yyyy')        
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
                    image={Empty.PRESENTED_IMAGE_SIMPLE} 
                    description="You don't have any activity recorded yet"/>
                </div>
            ): (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-5'>
                    {list.map(item => (
                        <div key={item._id} className='bg-gray-200 rounded-lg px-5 py-3 relative'>
                            <div className='flex relative'>
                                <div className='flex-grow'>
                                    <h4 className='font-semibold text-lg mb-0'>{item.name}</h4>
                                    <span className='text-gray-600'>
                                        {item.description && (<p>{item.description}</p>)}
                                    </span>
                                </div>
                                <div style={{ right: -20}} className='flex-none text-right absolute'>
                                    <span className='bg-blue-500 text-white text-xs rounded-l-full py-1 px-3'>{parseDuration(item.timeStart, item.timeEnd)}</span>
                                </div>
                            </div>
                            <hr/>
                            <div className='flex'>
                                <div className='flex flex-grow items-center'>
                                    <ClockCircleOutlined className='mr-2 text-lg'/>
                                    {isSameDay(new Date(item.timeStart), new Date(item.timeEnd)) ? (
                                        <Tooltip title={tooltipValue(item.timeStart)}>
                                            <span>{parseToTime(item, item.timeStart)}</span>
                                            <span className='px-3'>-</span>
                                            <span>{parseToTime(item, item.timeEnd)}</span>
                                        </Tooltip>
                                    ) : (
                                        <>
                                            <span>{parseToTime(item, item.timeStart)}</span>
                                            <span className='px-3'>-</span>
                                            <span>{parseToTime(item, item.timeEnd)}</span>
                                        </>
                                    )}
                                    
                                    
                                </div>
                                <div className='flex-none'>
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