"use client"
import React from 'react'
import Layout from '../../shared/Layout'
import { Search } from '@mui/icons-material'
import FilterListIcon from '@mui/icons-material/FilterList';
import Faq from '../../components/dash/Faq';
import { useDispatch } from 'react-redux';
import { PromotionsPages, setCurrentPage } from '@/store/slice/promotionsSlice';

const page = () => {
  const dispatch=useDispatch();
  return (
    <Layout>
    
    <div className='sticky text-black'>
    <div className=''>
    <div className=' bg-white my-5 text-black'>
    <h1 className='text-black font-semibold text-[32px] p-2'>Staffs</h1>
    </div>
    </div>

    {/**table */}
    <div className='bg-white shadow-xl rounded-lg mt-5 p-10  h-full w-[80%]'>
    <Faq/>
    
    </div>

    </div>
    </Layout>
  )
}

export default page
