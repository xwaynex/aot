"use client"
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
    <div className='md:grid md:grid-cols-12 flex gap-3 flex-col md:grid place-content-center h-screen '>
      <div className='col-span-4 grid place-content-center'>
      <div>
      <div className='w-full rounded-lg border border-[#FF7D00] p-3 text-[16px] text-[#FF7D00] text-center'>
        <a href='webapp/home'> <h1>Webapp</h1></a>
      </div>
      </div>
      </div>
      <div className='col-span-4 grid place-content-center'>
      <div>
      <div className='w-full rounded-lg border border-[#FF7D00] p-3 text-[16px] text-[#FF7D00] text-center'>
        <a href='dash/userdetails'> <h1>Admin Dashboard</h1></a>
      </div>
      </div>
      </div>
      <div className='col-span-4 grid place-content-center'>
      <div>
      <div className='w-full rounded-lg border border-[#FF7D00] p-3 text-[16px] text-[#FF7D00] text-center'>
        <a href='cs/user'> <h1>Customer Service</h1></a>
      </div>
      </div>
      </div>
    </div>
    </main>
  )
}
