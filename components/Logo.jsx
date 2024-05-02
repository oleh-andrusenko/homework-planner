'use client'
import { SiGooglekeep } from "react-icons/si"
function Logo() {
  return (
    <div className=' text-2xl font-bold bg-[#f5f5f5] px-6 pb-4'>
      <p className='flex items-center my-1'>
        <SiGooglekeep className='text-green-a mr-2 mb-2 text-3xl' />
        Homework
      </p>
      <p>Keeper</p>
    </div>
  )
}

export default Logo
