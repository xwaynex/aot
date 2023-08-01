import React from 'react'
import Image from 'next/image'
import logo from '../../../../public/logo.png'
import login from "../../../../public/login.png"

const page = () => {
  return (
    <div 
    className="h-full flex  bg-image bg-cover bg-center "
    style={{
      backgroundImage: `url(${login.src})`,
    }}>
      <section className="md:w-[50%] w-full px-2 md:px-36 h-screen bg-white">
      <div className=' mt-9'>
      <Image src={logo} width="48" height="48" alt='logo'/>
      </div>

      {/*welcome back */}
      <section className=" mt-20 ">
      <div><h1 className='text-[20px] font-bold'>Welcome back</h1></div>
      </section>

      {/*inputs div */}
      <section className='mt-5 flex flex-col gap-3 text-[12px]'>
      <div className=''>
      <h2>Email address</h2>
      <input className="w-full p-3 border rounded-lg" type="email" placeholder="enter email"  />

      </div>

      <div className=''>
      <h2>Password</h2>
      <input className="w-full p-3 border rounded-lg" type="email" placeholder="enter password"  />
      </div>

      </section>

      {/* remember */}
      <section className='mt-2 flex text-[12px] justify-between text-black'>
      <div className='flex gap-1'>
      <input type='checkbox'/>
      <h2>Remember</h2>
      </div>
      <div>
      <h2>Forgot Password?</h2>
      </div>
      </section>

      {/* buttons */}
      <section className='mt-[37px] text-[12px]'>
      <div>
      <button className='w-full rounded-lg text-white p-3 text-[16px] bg-[#FF7D00] text-center'>
      <h1>sign in</h1>
      </button>
      </div>

      <div>
      <h1 className='text-center my-[16px]'>OR</h1>
      </div>

      <div>
      <button className='w-full rounded-lg border border-[#FF7D00] p-3 text-[16px] text-[#FF7D00] text-center'>
      <h1>Continue with google</h1>
      </button>
      </div>

      <div>
      <h1 className='text-right my-[16px]'>Don’t have an account? Sign Up</h1>
      </div>

      </section>

      </section>
    </div>
  )
}

export default page
