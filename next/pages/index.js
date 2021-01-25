import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import {UserOutlined, GoogleOutlined} from '@ant-design/icons'

export default function Index(){
    return (
        <>
        <Head>
            <title>Welcome to {process.env.NEXT_PUBLIC_APP_NAME}</title>
        </Head>
        <div className='grid grid-cols-1 md:grid-cols-12 mx-5 md:mx-16 lg:mx-32 h-screen items-center'>
            <div className='md:col-span-8'>
                <h2 className='text-3xl font-semibold'>Welcome to {process.env.NEXT_PUBLIC_APP_NAME}</h2>
                <Image src='/home.png' className='max-w-sm' width={410} height={300}/>
            </div>
            <div className='md:col-span-4 flex space-y-3 flex-col'>
                <p className='text-gray-500'>You can start tracking your activities easily from now for the future you</p>
                <Link href='/auth/sign-in'>
                    <a className='w-full flex items-center py-2 px-3 rounded-md border-2 border-indigo-500 hover:border-indigo-600 bg-white'>
                        <span className='text-sm flex-grow'>Sign-in with username</span>
                        <UserOutlined/>
                    </a>
                </Link>
                <a href='#' className='w-full flex items-center py-2 px-3 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white'>
                    <span className='text-sm flex-grow'>Sign-in with Google</span>
                    <GoogleOutlined/>
                </a>
            </div>
        </div>
        </>
    )
}