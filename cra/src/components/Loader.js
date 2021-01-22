import React from 'react'
import {CircularProgress} from '@material-ui/core'

export default function Loader({loading = false}){
    return (
        <div className={`${loading ? 'absolute' : 'hidden'} w-full h-full inset-0 bg-black bg-opacity-25 flex item-center justify-center`}>
            <CircularProgress className='m-auto'/>
        </div>
    )
}