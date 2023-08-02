
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {data2} from '../../../app/dash/data/disputedata';
import { useSelector } from 'react-redux';
import { DisputePages } from '@/store/slice/disputeSlice';
import ModalComponent from './modal2'
import { useState } from 'react'
import eye from "@/assets/eye.png"
import Image from 'next/image';



const columns = [
  { field: 'id', headerName: 'User ID', width: 70 },
  { field: 'date', headerName: 'Date',type:"string", width: 100 },
  { field: 'name', headerName: 'Name', width: 150 },
  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    width: 150,
  },
  {
    field: 'phone',
    headerName: 'Phone No.',
    type:"number",
    width: 100,
    
  },
  {
    field: 'status',
    headerName: 'status',
    type:"string",
    width: 100,
    
  },
  {
    field: 'access',
    headerName: 'Account Type',
    type:"string",
    width: 100,
    renderCell: (params) => {
      // Change the color based on a certain condition
      const access = params.value;
      const color = "#FF7D00"

      return (
        <span style={{ color }}>{access}</span>
      );
    },
  
    
    
  },
  {
    
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => {

      const [openModal, setOpenModal] = useState(false);
      const [selectedRowData, setSelectedRowData] = useState(null);
    
      // ...
    
      const handleRowClick = (params) => {
        setSelectedRowData(params.row);
        setOpenModal(true);
      };
    
      const handleCloseModal = () => {
        setOpenModal(false);
      };

    
        
      return (
        
        <div className="">
        <div className='flex gap-3'>
        <button className='rounded-lg flex items-center gap-[8px] border border-[#2455D2] text-sm p-1' onClick={() => handleRowClick(params)} data-toggle="modal" data-target="#myModal">
          <h1 className='text-[#2455D2]'>View</h1>
          <Image src={eye} width="" height="" alt='image'/>
        </button>
        </div>
        
      
          
          {openModal && selectedRowData?.id === params.row.id && (
            <ModalComponent rowData={selectedRowData} open={openModal} handleClose={handleCloseModal} />
          )}
          
       

        </div>
      );
    },
  },

];





export default function Dispute() {


  const [customColumn,setCustomColumn]=React.useState(columns);
  const [filter,setFilter]=React.useState("");
  const currentPage=useSelector((state)=>state.disputeState.currentPage);

React.useEffect(()=>{


if(currentPage==DisputePages.RESOLVED) setFilter("Resolved");
if(currentPage==DisputePages.UNRESOLVED) setFilter("Unresolved");
if(currentPage==DisputePages.ALL_DISPUTES) setFilter("");



},[currentPage])


  return (
    <div style={{ height: 'auto', width: '100%'}}>
      <DataGrid
        className='text-md h-full'
        rows={!!filter ? data2.filter((item)=>item.status==filter) : data2}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 7 },
          },
        }}
        pageSizeOptions={[20, 50]}
        
      />

      
    </div>
  );
}

