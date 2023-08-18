import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { DashboardPages } from '@/store/slice/dashboardSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ModalComponent from './Modal';
import { useGetDashboardQuery } from '../../api/apiSlice';

const columns = [
  { field: 'user_id', headerName: 'User ID', width: 70 },
  { field: 'created_at', headerName: 'Date', type: 'string', width: 130 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'email', headerName: 'Email', type: 'email', width: 150 },
  { field: 'phone_number', headerName: 'Phone No.', type: 'number', width: 130 },
  {
    field: 'type',
    headerName: 'Account Type',
    type: 'string',
    width: 130,
    renderCell: (params) => {
      const access = params.value;
      const color = "#FF7D00";
      return (
        <span style={{ color }}>{access}</span>
      );
    },
  },
];

const additionalColumnData = [
  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: (params) => {
      const [openModal, setOpenModal] = useState(false);
      const [selectedRowData, setSelectedRowData] = useState(null);
    
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
            <button
              className='rounded-lg border border-[#16BD31] px-[17px] text-sm p-[8px]'
              onClick={() => handleRowClick(params)}
            >
              <h1 className='text-[#16BD31] text-[16px]'>Verify</h1>
            </button>
            <button
              className='rounded-lg border border-[#2455D2] px-[17px] text-sm p-[8px]'
              onClick={() => handleRowClick(params)}
            >
              <h1 className='text-[#2455D2] text-[16px]'>Download</h1>
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

export default function Usertable() {
  const [customColumn, setCustomColumn] = useState(() => columns); // Use a callback for initial state
  const [filter,setFilter]=useState("");
  const currentPage=useSelector((state)=>state.dashboardState.currentPage);
  const { data, error, isLoading } = useGetDashboardQuery();
  const dispatch = useDispatch(); 
  const users = data?.data?.users || [];
  const usersWithIds = users.map((user, index) => ({
    ...user,
    id: index + 1, // Adding 1 to ensure unique ids starting from 1
  }));


  useEffect(()=>{
    if(currentPage == DashboardPages.INDIVIDUAL) {setCustomColumn([...columns,...additionalColumnData]);
      setFilter("individual")
    }
    else setCustomColumn(columns);
    
    if(currentPage==DashboardPages.LOGISTICS_USERS) setFilter("rider");
    if(currentPage==DashboardPages.COMPANY) setFilter("company");
    if(currentPage==DashboardPages.ALL_USERS) setFilter("");
    
    
    
    
    },[currentPage])
  



    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  

  

// useEffect(()=>{

//   if(currentPage == DashboardPages.INDIVIDUAL) {setCustomColumn([...columns,...additionalColumnData]);
//     setFilter("individual")
//   }
//   else setCustomColumn(columns);
//   if(currentPage==DashboardPages.LOGISTICS_USERS) setFilter("user");
//   if(currentPage==DashboardPages.COMPANY) setFilter("company");
//   if(currentPage==DashboardPages.ALL_USERS) setFilter("");
  
//   },[currentPage])



  return (
    <div className="h-auto w-[100%] text-[16px]">
      <DataGrid
        rows={!!filter ? usersWithIds.filter((item)=>item.type==filter) : usersWithIds}
        columns={customColumn}
        rowHeight={40}
        // ... (other DataGrid props)
      />

     

      <style>
        {`
          .custom-cell {
            border-bottom: none;
          }

          .custom-column-header {
            border-right: none;
          }
        `}
      </style>
    </div>
  );
}
