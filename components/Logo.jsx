"use client"
import Link from "next/link"
import { SiGooglekeep } from "react-icons/si"
function Logo() {
  return (
    <Link href='/dashboard' className='w-full text-2xl font-bold bg-transparent px-6 pb-4 dark:text-green-a'>
      <p className='flex items-center my-1'>
        <SiGooglekeep className='text-green-a mr-2 mb-2 text-3xl' />
        Homework
      </p>
      <p>Keeper</p>
    </Link>
  )
}

export default Logo
