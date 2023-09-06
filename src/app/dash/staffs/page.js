"use client"
import React from 'react'
import Layout from '../../shared/Layout'
import Staffs from '../../components/dash/Staffs';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'; 
import ProtectedRoute from '@/app/components/Protected';


const page = () => {
  const dispatch=useDispatch();
  const user = useSelector((state) => state.user);

  
  return (
    <ProtectedRoute user={user}>
      <Layout>
    <div className='sticky'>
    <div className='w-full'>
    <div className=' bg-white my-5 text-black'>
    <h1 className='text-black font-semibold text-[32px] p-2'>Staffs</h1>
    </div>
    </div>

    {/**table */}
    <div className='bg-white shadow-xl rounded-lg mt-5 p-10  h-full w-full'>
    <Staffs/>
    
    </div>

    </div>
    </Layout>
    </ProtectedRoute>
  )
}

export default page
