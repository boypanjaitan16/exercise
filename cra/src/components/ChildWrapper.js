import {useEffect, useState} from 'react'
import {Breadcrumb} from 'antd'
import {HomeFilled} from '@ant-design/icons'
import {useLocation} from 'react-router-dom'

export default function ChildWrapper({children, path}){
    const location          = useLocation()
    const [paths, setPaths] = useState([])

    useEffect(() => {
        const arr   = (path ?? location.pathname).split('/')

        setPaths(arr.filter(item => item !== "" && item !== "account"))

    }, [path])

    const UCFirst = (word) => {
        return `${word[0].toUpperCase()}${word.slice(1)}`
    }

    const composeURL = (index) => {
        return `#/account/${[...paths.slice(0, index+1)].join('/')}`
    }

    return (
        <>
            <div className='border-b py-3 px-5 border-gray-300'>
                <Breadcrumb>
                    <Breadcrumb.Item href="#/account">
                        <HomeFilled />
                    </Breadcrumb.Item>
                    {paths.map((item, index) => {
                        if(index === (paths.length-1)){
                            return (
                                <Breadcrumb.Item key={index}>
                                    {UCFirst(item)}
                                </Breadcrumb.Item>
                            )
                        }
                        return (
                            <Breadcrumb.Item key={index} href={composeURL(index)}>
                                {UCFirst(item)}
                            </Breadcrumb.Item>
                        )
                    })}
                </Breadcrumb>
            </div>
            <div className='p-5 md:pr-8 h-full'>
                {children}
            </div>
        </>
    )
}