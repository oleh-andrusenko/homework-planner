import React from "react"
import Link from "next/link"
import { FaSignOutAlt } from "react-icons/fa"

function UserInfo() {
  return (
    <Link
      href='/'
      className='w-full bg-white flex justify-center py-4 mt-6 rounded-lg items-center text-sm gap-4'
    >
      <div className='w-12 h-12 bg-green-a rounded-full'></div>
      <div>
        <p className='text-[16px] font-bold'>John Doe</p>
        <p className=''>jonh@gmail.com</p>
      </div>
      <button className='h-12'>
        <FaSignOutAlt className='text-xl text-green-a' />
      </button>
    </Link>
  )
}

export default UserInfo
