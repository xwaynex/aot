"use client"
import React from 'react'
import Layout from '../../shared/Layout'
import Control from '../../components/dash/Control';
import { useDispatch } from 'react-redux';

const page = () => {
  const dispatch=useDispatch();
  return (
    <Layout>
    
    <div className='sticky'>
    <div className=''>
    <div className=' bg-white my-5 text-black'>
    <h1 className='text-black font-semibold text-[32px] p-2'>Support</h1>
    </div>
    </div>

    {/**table */}
    <div className='bg-white shadow-xl rounded-lg mt-5 p-10  h-full w-[80%]'>
    <Control/>
    
    </div>

    </div>
    </Layout>
  )
}

export default page
