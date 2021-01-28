import {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Empty} from 'antd'
import {CircularProgress} from '@material-ui/core'
import ActivityItem from '../../../components/ActivityItem' 
import ChildWrapper from '../../../components/ChildWrapper'

function Activities({session}){
    const [list, setList]       = useState([])
    const [loading, setLoading] = useState(false)

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
        <ChildWrapper>
            {list.length === 0 ? (
                <div className='flex justify-center items-center h-full'>
                    <Empty
                    // image={Empty.PRESENTED_IMAGE_SIMPLE} 
                    description="You don't have any activity recorded yet"/>
                </div>
            ): (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-5'>
                    {list.map(item => (
                        <ActivityItem 
                            key={item._id} 
                            item={item} 
                            deleteCallback={(data) => {
                                setList(data)
                            }}/>
                    ))}
                </div>
    
            )}
        </ChildWrapper>
    )
}

const mapStateToProps = (state, props) => {
    return {
        session     : state.session
    }
}

export default connect(mapStateToProps)(Activities)