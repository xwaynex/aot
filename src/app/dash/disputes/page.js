"use client"
import React from 'react'
import Layout from '../../shared/Layout'
import { Search } from '@mui/icons-material'
import FilterListIcon from '@mui/icons-material/FilterList';
import Dispute from '../../components/dash/Dispute';
import { useDispatch } from 'react-redux';
import { DisputePages, setCurrentPage } from '@/store/slice/disputeSlice';
import { useSelector } from 'react-redux'; 
import ProtectedRoute from "../../components/Protected"


const page = () => {
  const dispatch=useDispatch();
  const user = useSelector((state) => state.user);

  
  return (
    <ProtectedRoute user={user}>    <Layout>
    
    <div className='px-10'>
    <div className=' bg-white my-5 text-black'>
    <h1 className='text-black font-semibold text-xl p-2'>Disputes</h1>
    <div className='grid grid-cols-9 gap-3'></div>
    </div>


    <div>
    <ul className="flex text-sm font-light">
  <li className="mr-6">
    <button className="text-gray-500 hover:underline"  onClick={()=>dispatch(setCurrentPage(DisputePages.ALL_DISPUTES))}>All Disputes</button>
  </li>
  <li className="mr-6">
    <button className="text-gray-500 hover:underline"  onClick={()=>dispatch(setCurrentPage(DisputePages.RESOLVED))}>Resolved</button>
  </li>
  <li className="mr-6">
    <button className="text-gray-500 hover:underline"  onClick={()=>dispatch(setCurrentPage(DisputePages.UNRESOLVED))}>Unresolved</button>
  </li>
  <li className="mr-6">
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
    <h2 className='text-black w-full text-right'>Most Recent</h2>
    <span><FilterListIcon className='text-gray-500'/></span>
    </div>
    </div>

    {/**table */}
    <div className='bg-white shadow-xl rounded-lg mt-5 h-[80%]'>
    <Dispute />
    
    </div>

    </div>
    </Layout>
    </ProtectedRoute>
  )
}

export default page
