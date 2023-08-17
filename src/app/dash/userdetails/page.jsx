"use client"
import React from 'react'
import Layout from '../../shared/Layout'
import { Search } from '@mui/icons-material'
import FilterListIcon from '@mui/icons-material/FilterList';
import Usertable from '../../components/dash/Usertable';
import { useDispatch } from 'react-redux';
import { DashboardPages, setCurrentPage } from '@/store/slice/dashboardSlice';
import ProtectedRoute from '@/app/components/Protected';
import { useSelector } from 'react-redux'; 

const page = () => {
  const dispatch=useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <ProtectedRoute user={user}>

    <Layout>
    
    <div className=''>
    <div className=' bg-white my-5 text-black'>
    <h1 className='text-black font-semibold text-[32px] p-2'>User Details</h1>
    </div>


    <div>
    <ul className="flex text-sm font-light">
  <li className="mr-6">
    <button className="text-gray-500 text-[16px] hover:underline"  onClick={()=>dispatch(setCurrentPage(DashboardPages.ALL_USERS))}>All Users</button>
  </li>
  <li class="mr-6">
    <button className="text-gray-500 text-[16px] hover:underline"  onClick={()=>dispatch(setCurrentPage(DashboardPages.LOGISTICS_USERS))}>User</button>
  </li>
  <li class="mr-6">
    <button className="text-gray-500 text-[16px] hover:underline"  onClick={()=>dispatch(setCurrentPage(DashboardPages.COMPANY))}>Company</button>
  </li>
  <li class="mr-6">
    <button className="text-gray-400 text-[16px] hover:underline" onClick={()=>dispatch(setCurrentPage(DashboardPages.INDIVIDUAL))}>Individual</button>
  </li>
</ul>
    </div>

    {/** searchbar and Most Recent*/}
    <div className='grid grid-cols-12 my-2'>
    <div className='col-span-6'>
    <div className="flex items-center border-gray-300 border rounded-xl w-[80%] p-1">
    <Search className="text-gray-500" />

      <input
        className="outline-none bg-transparent flex-grow"
        type="text"
        placeholder="Search..."
      />
    </div>
    </div>
    {/**most Recent */}
    <div className='col-span-6 flex gap-2 text-right text-xs font-light items-center'>
    <h2 className='text-black w-full text-[14px] text-right'>Most Recent</h2>
    <span><FilterListIcon className='text-gray-500'/></span>
    </div>
    </div>

    {/**table */}
    <div className='bg-white shadow-xl rounded-lg mt-5 p-10  h-full w-full'>
    <Usertable/>
    
    </div>

    </div>
    </Layout>
    </ProtectedRoute>
  )
}

export default page
