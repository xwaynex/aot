import React from 'react'
import Image from 'next/image'
import logo from '../../../../public/logo.png'
import signup from '../../../../public/signup.png'

const page = () => {
  return (
    <div
    className="h-full flex  bg-image bg-cover bg-center "
    style={{
      backgroundImage: `url(${signup.src})`,
    }}>
      <section className="md:w-[50%] md:px-36 h-full bg-white">
      <div className=' mt-3'>
      <Image src={logo} width="48" height="48" alt='logo'/>
      </div>

      {/*welcome bacl */}
      <section className=" flex flex-col gap-3 p-0 mt-5">
      <div><h1 className='text-[20px] font-bold'>Create an Account</h1></div>
      <div><p className='text-[12px]'>Complete the sign up process to get started</p></div>
      </section>

      {/*inputs div */}
      <section className='mt-3 flex flex-col gap-3 text-[12px]'>
      <div className=''>
      <h2>Email address</h2>
      <input className="w-full p-3 border rounded-lg" type="email" placeholder="enter email"  />

      </div>

      <div className=''>
      <h2>Password</h2>
      <input className="w-full p-3 border rounded-lg" type="email" placeholder="enter password"  />
      </div>
      
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
      <section className='mt-3 flex flex-col gap-3 text-[12px]'>
      <div>
      <button className='w-full rounded-lg text-white p-3 bg-[#FF7D00] text-center'>
      <h1>sign in</h1>
      </button>
      </div>

      <div>
      <h1 className='text-center my-1'>OR</h1>
      </div>

      <div>
      <button className='w-full rounded-lg border border-[#FF7D00] p-3 text-[#FF7D00] text-center'>
      <h1>Continue with google</h1>
      </button>
      </div>

      <div>
      <h1 className='text-right my-3'>Don’t have an account? Sign Up</h1>
      </div>

      </section>

      </section>
    </div>
  )
}

export default page
