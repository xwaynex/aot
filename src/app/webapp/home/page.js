
"use client"
import React from 'react'
import Layout from "../../shared/Layout3"
import map from "../../../../public/map.png"
import triple from "../../../assets/triple.png"
import Image from 'next/image'
import { useState } from 'react'
import delv1 from "../../../assets/delv1.png"
import delv2 from "../../../assets/delv2.png"
import delv3 from "../../../assets/delv3.png"
import dine from "../../../assets/dine.png"
import car from "../../../assets/car.png"
import truck from "../../../assets/truck.png"
import cash from "../../../assets/cash.png"
import wallet from "../../../assets/wallet.png"
import cc from "../../../assets/cc.png"

const page = () => {

  const [uiState, setUiState] = useState('home');

  const handleRequestClick = () => {
    // Toggle the state when the button is clicked
    setUiState('requestPickup');
  };

  const handleBackClick = () => {
    // Switch to the previous state when the back button is clicked
    if (uiState === 'requestPickup') {
      setUiState('home');
    } else if (uiState === 'proceedToPay') {
      setUiState('requestPickup');
    }
  };

  const handleProceedToPay = () => {
    // Switch to the 'proceedToPay' state when the proceed button is clicked
    setUiState('proceedToPay');
  };
    
    return (
      
        <Layout>

         {uiState === 'requestPickup' &&  (
        // New UI
        <div>
          <div className=' bg-white w-full  text-black h-auto'>
    <div className=' bg-white w-[auto]  flex mt-[55px]'>    
    <div className='mr-auto w-full '>
    <h1 className='text-black text-[32px] '>Request Pickup</h1>
    </div>

   
    </div>


    


    <div className=' grid grid-cols-12 gap-3 w-[95%] h-[70%] mt-10'>
    <div
    className="h-screen col-span-7 flex flex-col  w-full h-auto bg-image bg-cover bg-center "
    style={{
      backgroundImage: `url(${map.src})`,
    }}
    >
<div class="flex-grow">
  </div>
   
    </div>

    <div className='col-span-5 flex flex-col flex-grow h-screen '>
        <div className='flex-grow flex py-3 flex-col gap-9'>
<div className='flex flex-col gap-3'>
<div className='w-full px-5 grid grid-cols-12 flex space py-2 px-5 rounded-sm around bg-[#d4d4d4]'>
  <div className='col-span-1'><Image src={delv1}/></div>
  <div className='col-span-11 flex justify-between font-bold'><h1>Pickup Details</h1><p className='text-[24px] text-[#FF7D00]'>+</p></div>
</div>
<div className='w-full px-5 grid grid-cols-12 flex space py-2 px-5 rounded-sm around bg-[#d4d4d4]'>
  <div className='col-span-1'><Image src={delv2}/></div>
  <div className='col-span-11 flex justify-between font-bold'><h1>Pickup Details</h1><p className='text-[24px] text-[#FF7D00]'>+</p></div>
</div>
<div className='w-full px-5 grid grid-cols-12 flex space py-2 px-5 rounded-sm around bg-[#d4d4d4]'>
  <div className='col-span-1'><Image src={delv3}/></div>
  <div className='col-span-11 flex justify-between font-bold'><h1>Pickup Details</h1><p className='text-[24px] text-[#FF7D00]'>+</p></div>
</div>

</div>

    {/*icons */}
    <div className='grid px-5 place-content-center space-between grid-cols-12'>
        <div className='col-span-4 h-[120px] w-[90px] border bg-[#ff7d00] grid place-content-center'>
          <Image src={dine} alt="" width="" height=""/>
          <h1 className='text-center text-white'>Bike</h1>
          </div>
        <div className='col-span-4 h-[120px] w-[90px] border border-[#ff7d00] grid place-content-center'>
        <Image src={car} alt="" width="" height=""/>
          <h1 className='text-center text-[#ff7d00] '>car</h1>
        </div>
        <div className='col-span-4 h-[120px] w-[90px] border border-[#ff7d00] grid place-content-center'>
        <Image src={truck} alt="" width="" height=""/>
          <h1 className='text-center text-[#ff7d00]  '>truck</h1>
        </div>
        
    </div>
    </div>

    <div className='footer w-full  grid mb-36 place-content-center'>
      <button onClick={handleProceedToPay} className='  grid grid-cols-12 items-center  bottom-2 m-3 rounded-lg border bg-[#ff7d00] py-3 px-20 text-[16px] text-white text-center'>
      <h1 className='col-span-11'>Proceed to Pay</h1>
      </button>
      </div>

    </div>


    </div>
    </div>
    
        </div>
      )}
      
    {uiState === 'home' &&  (



    <div className=' bg-white w-[100%]  text-black h-auto'>
    <div className=' bg-white w-[auto]  sticky top-0 flex mt-[55px]'>    
    <div className='mr-auto w-full '>
    <h1 className='text-black text-[32px] '>Home</h1>
    </div>

   
    </div>


    


    <div className='w-screen h-screen mt-10'>
    <div
    className="h-screen flex flex-col  w-[800px] h-[700px] bg-image bg-cover bg-center "
    style={{
      backgroundImage: `url(${map.src})`,
    }}
    >
<div className="flex-grow">
  </div>
    <div className='footer w-full  grid place-content-center'>
      <button onClick={handleRequestClick} className='  grid grid-cols-12 items-center  bottom-2 m-3 rounded-lg border bg-[#FF7D00] p-5 text-[16px] text-white text-center'>
        <Image src={triple} className='col-span-1' />
      <h1 className='col-span-11'>Continue with google</h1>
      </button>
      </div>
    </div>


    </div>


    </div>
    )} 


    
    {uiState === 'proceedToPay' && (
      // New UI
      <div>
        <div className=' bg-white w-full  text-black h-auto'>
  <div className=' bg-white w-[auto]  flex mt-[55px]'>    
  <div className='mr-auto w-full '>
  <h1 className='text-black text-[32px] '>Request Pickup</h1>
  </div>

 
  </div>


  


  <div className=' grid grid-cols-12 gap-3 w-[95%] h-[70%] mt-10'>
  <div
  className="h-screen col-span-7 flex flex-col  w-full h-auto bg-image bg-cover bg-center "
  style={{
    backgroundImage: `url(${map.src})`,
  }}
  >
<div className="flex-grow">
</div>
 
  </div>

  <div className='col-span-5 flex flex-col flex-grow h-screen '>
      <div className='flex-grow flex py-3 flex-col gap-9'>
<div className='flex flex-col gap-3'>

<div className='flex flex-col text-center gap-5 font-bold'>
<h1 className='text-[22px]'>Payment</h1>
<h1 className='text-[18px]'>Select your prefered Payment Method</h1>
</div>

<div className='flex flex-col gap-5 my-5 text-[14px] font-light'>
  <div className='grid grid-cols-12 gap-3 justify-center items-center'>
    <div className='col-span-1'> <Image src={cash} alt="" width="" height=""/></div>
    <div className='col-span-11 flex justify-between'><h1>Cash On Delivery</h1>
    <div ><input type='radio' className='outline-none border-transparent'/></div>
    </div>
  </div>

  <div className='w-full border border-2-black my-1'></div>
  <div className='grid grid-cols-12 gap-3 justify-center items-center'>
    <div className='col-span-1'> <Image src={wallet} alt="" width="" height=""/></div>
    <div className='col-span-11 flex justify-between'><h1>Wallet</h1>
    <div ><input type='radio' className='outline-none border-transparent'/></div>
    </div>
  </div>

  <div className='w-full border border-2-black my-1'></div>
  <div className='grid grid-cols-12 gap-3 justify-center items-center'>
    <div className='col-span-1'> <Image src={cc} alt="" width="" height=""/></div>
    <div className='col-span-11 flex justify-between'><h1>Credit/Debit Card</h1>
    <div ><input type='radio' className='outline-none border-transparent'/></div>
    </div>
  </div>

  <div className='w-full border border-2-black mt-9 font-bold'></div>
  <div className='col-span-11 flex justify-between'><h1 className='font-bold'>Total</h1>
    <div ><p className='font-bold'>#2,000</p></div>
    </div>


</div>


</div>

  {/*icons */}
  
  </div>

  <div className='footer w-full  grid mb-36 place-content-center'>
    <button onClick={handleBackClick} className='  grid grid-cols-12 items-center  bottom-2 m-3 rounded-lg border bg-[#ff7d00] py-3 px-20 text-[16px] text-white text-center'>
    <h1 className='col-span-11'>Proceed</h1>
    </button>
    </div>

  </div>


  </div>
  </div>
  
      </div>
    )}
    
    
    
    </Layout>
    )
  }
  
  export default page


