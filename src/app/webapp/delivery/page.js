"use client"
import React from 'react'
import Layout from '../../shared/Layout3'
import { Search } from '@mui/icons-material'
import FilterListIcon from '@mui/icons-material/FilterList';
import Usertable from '../../components/webapp/table';
import { useDispatch } from 'react-redux';
import { DashboardPages, setCurrentPage } from '@/store/slice/dashboardSlice';

const page = () => {
  const dispatch=useDispatch();
  return (
    <Layout>
    
    <div className=''>
    <div className=' bg-white my-5 text-black'>
    <h1 className='text-black font-semibold text-[32px] p-2'>My Deliveries</h1>
    </div>


    

    

    {/**table */}
    <div className='bg-white shadow-xl rounded-lg mt-5 p-10  h-full w-[90%]'>
    
    </div>

    </div>
    </Layout>
  )
}

export default page
