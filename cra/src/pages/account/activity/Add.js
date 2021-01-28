import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import { DatePicker, Button, message, Select } from 'antd';
import {useForm} from 'react-hook-form'
import ChildWrapper from '../../../components/ChildWrapper'


function AddRecord({session}){
    const { RangePicker } = DatePicker;

    const history   = useHistory()
    const [loading, setLoading]     = useState(false)
    const [categories, setCategories]   = useState({
        loading     : false,
        data        : [],
        selected    : null
    })
    const [timeRange, setTimeRange] = useState([])
    const { Option } = Select;
    const {handleSubmit, errors, register, trigger}  = useForm()

    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);

        setTimeRange(value ? dateString : [])
        setTimeout(() => {
            trigger('time_range')
        }, 100)
    }

    const onSelectChange = (value) => {
        console.log('selected', value)
    }

    const onSubmit = (params) => {
        const {name, description}   = params

        setLoading(true)
        window.axios.post('/activities/create', {
            name, description,
            categoryId  : categories.selected,
            timeStart   : timeRange[0],
            timeEnd     : timeRange[1]
        })
            .then(res => {
                
                history.push('/account/activity')
                setLoading(false)
                message.success('Activity added')
            })
            .catch(err => {
                setLoading(false)
            })
    }

    useEffect(() => {
        setCategories({...categories, loading : true})
        window.axios.get('/categories')
            .then(res => {
                const {data}    = res.data
                
                setCategories({data, loading: false})
            })
            .catch(() => setCategories({...categories, loading: false}))
    }, [])

    return (
        <ChildWrapper>
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
                            className='w-full md:w-8/12 lg:w-6/12'
                            onChange={onChange}
                            />
                    </div>
                    {errors.time_range && (<small className='text-red-500'>{errors.time_range.message}</small>)}
                </div>
                <div>
                    <label>Category (optional)</label>
                    <div className='mt-1'>
                        <Select
                            showSearch
                            loading={categories.loading}
                            className='w-full md:w-8/12 lg:w-6/12'
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={(selected) => setCategories({...categories, selected})}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {categories.data.map(item => (
                                <Option key={item._id} value={item._id}>{item.name}</Option>
                            ))}
                        </Select>
                    </div>
                    
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
        </ChildWrapper>
    )
}

const mapStateToProps = (state, props) => {
    return {
        session     : state.session
    }
}

export default connect(mapStateToProps)(AddRecord)