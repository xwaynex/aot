"use client"

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { PromotionsPages } from '@/store/slice/promotionsSlice';
import ModalComponent from './PromoModal';
import bin from "@/assets/delete.png";
import edit from "@/assets/edit.png";
import Image from 'next/image';
import { useGetPromoCodesQuery } from '../../api/apiSlice';
import SimpleModalExample from './testmodal';




const columns = [
  { field: 'id', headerName: 'S/N', width: 100 },
  { field: 'promo', headerName: 'Promo Code',type:"string", width: 200 },
  { field: 'discount', headerName: 'Discount(%)', width: 100 },
 
  {
    field: 'status',
    headerName: 'Status',
    type:"string",
    width: 150,
    renderCell: (params) => {
      // Change the color based on a certain condition
      const access = params.value;
      const color = "green"

      return (
        <span style={{ color }}>{access}</span>
      );
    },
  
    
    
  },

  {
    
    field: 'actions',
    headerName: 'Actions',
    width: 300,
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
        
        <>
        <div className='flex gap-3'>
       
        <button
  className={`${params.row.activate ? "border-[#552A00]" : "border-[#16BD31]"} text-[16px]} rounded-lg border  w-[99px] h-[36px]`} 
  onClick={() => handleRowClick(params)}
 
>
  <h1 className={` ${params.row.activate ? "text-[#552A00]" : "text-[#16BD31]"} text-[16px]`}>
    {params.row.activate ? "Activate" : "Deactivate"}
  </h1>
</button>
        <div className='grid place-content-center w-[36px] h-[36px] bg-[#ff000035]'>
        <Image src={bin} width="" height="" alt='image'/>
        </div>
        <div className='grid place-content-center w-[36px] h-[36px] bg-[#2455d242]'>
        <Image src={edit} width="" height="" alt='image'/>
        </div>

        </div>
       
        

          
          {openModal && selectedRowData?.id === params.row.id && (
            <ModalComponent rowData={selectedRowData} open={openModal} handleClose={handleCloseModal} />
          )}
          
       

        </>


        


        
        
      );
    },
  },

];






export default function Promotions({ searchQuery }) {

  const tableStyles = {
    border: 'none',
  };

  const cellStyles = {
    borderBottom: 'none',
  };

  const columnHeaderStyles = {
    borderRight: 'none',
  };


 

  const [customColumn, setCustomColumn] = React.useState(columns);
  const [filter, setFilter] = React.useState("");
  const currentPage = useSelector((state) => state.promotionsState.currentPage);

  // Use the query hook to fetch promo codes
  const { data, error, isLoading } = useGetPromoCodesQuery();

  React.useEffect(() => {
    if (currentPage === PromotionsPages.ALL_PROMOTIONS) setFilter("");
    if (currentPage === PromotionsPages.ACTIVE) setFilter("active");
    if (currentPage === PromotionsPages.INACTIVE) setFilter("inactive");
  }, [currentPage]);

  const filteredData = data?.data.filter(
    (item) =>
      item.status === filter &&
      (item.promo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.discount.toString().includes(searchQuery))
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
          <div style={{}} className="h-[70vh] w-[70vw]  text-[5px] cursor-pointer">

       {data && ( // Only render DataGrid if data is available
        <DataGrid
          // ... other props ...
          rows={filteredData || []} // Use filteredData if available, or an empty array
          columns={customColumn}
          rowHeight={50}
          hideFooterPagination={true} 

        />
      )}

      <div className='w-full flex justify-center items-center'>
      <SimpleModalExample />
      </div>
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

