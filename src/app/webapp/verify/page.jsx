"use client"
import React from 'react'
import Image from 'next/image'
import logo from '../../../../public/logo.png'
import PhoneNumberInput, { countryOptions } from "../../components/webapp/phone"; // Import the countryOptions here
import { useState } from 'react'
import background from "../../../../public/signup.png"

const page = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);
  
    const handlePhoneNumberChange = (value) => {
      setPhoneNumber(value);
    };
  
    const handleCountryChange = (selectedOption) => {
      setSelectedCountry(selectedOption);
    };
  return (
    <div
    className="h-full bg-image bg-cover bg-center "
    style={{
      backgroundImage: `url(${background.src})`,
    }}
    >
      <section className="w-[665px] h-full bg-white py-[20px] px-[119px]">
      {/*logo */}

      <div className='pt-[44px]'>
      <Image src={logo} width="60px" height="60px" alt='logo'/>
      </div>

        {/* verification */}
            <section className='flex flex-col h-full w-[100%] py-24 '>
            <div className='w-full items-start'>

            <div className='flex flex-col gap-1'>
            <h1 className='text-[28px]'>Verify Phone Number</h1>
            <p className='text-[20px] w-full font-lig[70px]'>Please enter the OTP sent to 0709******98</p>
            </div>
            
            <div>
                <form action="" method="post">
                  <div className="flex flex-col gap-4 my-4">
                    <div className="flex flex-row gap-2 mx-auto w-full">
                      <div className="w-[70px] h-[70px]">
                        <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-lg shadow-lg border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" />
                      </div>
                      <div className="w-[70px] h-[70px]">
                        <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-lg shadow-lg border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" />
                      </div>
                      <div className="w-[70px] h-[70px]">
                        <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-lg shadow-lg border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" />
                      </div>
                      <div className="w-[70px] h-[70px]">
                        <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-lg shadow-lg border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" />
                      </div>
                    </div>
        
                    <div className="flex flex-col">
        
                      <div className="flex flex-row text-left text-sm font-medium space-x-1 text-gray-500">
                        <p>Haven't received our code? </p> <a className="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
                      </div>
                    </div>


                    <section className='mt-[37px] '>
      <div>
      <button className='w-full rounded-lg text-white p-5 text-[16px] bg-[#FF7D00] text-center'>
      <h1>Confirm</h1>
      </button>
      </div>

      </section>

                  </div>
                </form>
              </div>

            </div>
            
            </section>
      </section>
    </div>
  )
}

export default page
