import React from 'react'
import Image from 'next/image'
import logo from '../../../../public/logo.png'

const page = () => {
  return (
    <div>
      <section className="w-[665px] h-screen bg-white m-3">
      <div className='ml-[120px] mt-[40px]'>
      <Image src={logo} width="60px" height="60px" alt='logo'/>
      </div>

      {/*welcome bacl */}
      <section className="mx-[119px] p-0 mt-[121px]">
      <div><h1 className='text-[28px] font-bold'>Welcome back</h1></div>
      </section>

      {/*inputs div */}
      <section className='mt-[81px] ml-[120px]'>
      <div className='py-0'>
      <h2>Email address</h2>
      <input className="w-full p-3 border rounded-lg" type="email" placeholder="enter email"  />

      </div>

      <div className='py-2'>
      <h2>Password</h2>
      <input className="w-full p-3 border rounded-lg" type="email" placeholder="enter password"  />
      </div>

      </section>

      {/* remember */}
      <section className='mt-2 ml-[120px] flex justify-between text-black'>
      <div className='flex gap-1'>
      <input type='checkbox'/>
      <h2>Remember</h2>
      </div>
      <div>
      <h2>Forgot Password?</h2>
      </div>
      </section>

      {/* buttons */}
      <section className='mt-[37px] ml-[120px]'>
      <div>
      <button className='w-full rounded-lg text-white p-5 text-[16px] bg-[#FF7D00] text-center'>
      <h1>sign in</h1>
      </button>
      </div>

      <div>
      <h1 className='text-center my-[16px]'>OR</h1>
      </div>

      <div>
      <button className='w-full rounded-lg border border-[#FF7D00] p-5 text-[16px] text-[#FF7D00] text-center'>
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
