import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import { DatePicker, Button, message } from 'antd';
import {useForm} from 'react-hook-form'


function AddRecord({session}){
    const { RangePicker } = DatePicker;

    const history   = useHistory()
    const [loading, setLoading]     = useState(false)
    const [timeRange, setTimeRange] = useState([])
    const {handleSubmit, errors, register, reset, trigger}  = useForm()

    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);

        setTimeRange(value ? dateString : [])
        setTimeout(() => {
            trigger('time_range')
        }, 100)
    }

    const onSubmit = (params) => {
        const {name, description}   = params

        setLoading(true)
        window.axios.post('/activities/create', {
            name, description,
            timeStart   : timeRange[0],
            timeEnd     : timeRange[1]
        })
            .then(res => {
                
                history.push('/account/activities')
                setLoading(false)
                message.success('Activity added')
            })
            .catch(err => {
                setLoading(false)
            })
    }

    return (
            <div className='h-full'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex relative space-y-4 flex-col'>
                    <div>
                        <label>Activity Name</label>
                        <input 
                            name='name' 
                            type='text'
                            ref={
                                register({
                                    required    : 'Activity name is required'
                                })
                            }
                            className={`a-input-text ${errors.name && 'border-red-500'}`}/>
                        {errors.name && (<small className='text-red-500'>{errors.name.message}</small>)}
                    </div>
                    <div>
                        <label>Time Range</label>
                        <div className='mt-1'>
                            <input
                                type='hidden'
                                name='time_range'
                                value={timeRange.length > 0 ? `${timeRange[0]}|${timeRange[1]}` : ''}
                                ref={
                                    register({
                                        required: 'Time range is required'
                                    })
                                }/>

                            <RangePicker
                                showTime={{ format: 'HH:mm:ss' }}
                                // value={timeRange}
                                // format='YYYY-MM-DDTHH:MM:SSZ'
                                onChange={onChange}
                                />
                        </div>
                        {errors.time_range && (<small className='text-red-500'>{errors.time_range.message}</small>)}
                    </div>
                    <div>
                        <label>Description (optional)</label>
                        <textarea 
                            name='description'
                            ref={
                                register({
                                    required    : false
                                })
                            }
                            className='a-input-text'></textarea>
                    </div>
                    <div>
                        <Button loading={loading} htmlType='submit' shape='round' size='large' type='primary'>Save Activity</Button>
                    </div>
                </form>
            </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        session     : state.session
    }
}

export default connect(mapStateToProps)(AddRecord)