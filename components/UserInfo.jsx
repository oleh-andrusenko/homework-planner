"use client"

import React from "react"
import Link from "next/link"
import { FaSignOutAlt } from "react-icons/fa"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import userImg from "../public/user.png"

function UserInfo() {
  const { data: session, status } = useSession()
  return (
    <Link
      href='/dashboard/profile'
      className='w-full bg-white dark:bg-slate-800 dark:text-slate-50  flex justify-center py-4 mt-6 rounded-lg items-center text-sm gap-4'
    >
      <Image src={userImg} className='w-10 h-10 rounded-full' alt='' />
      {status === "authenticated" && (
        <div>
          <p className='text-[14px] font-bold'>{session.user.name}</p>
          <p className='w-1/2 text-[10px] truncate ... '>{session.user.email}</p>
        </div>
      )}
      <button
        className='h-12 hover:scale-110'
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        <FaSignOutAlt className='text-xl text-green-a' />
      </button>
    </Link>
  )
}

export default UserInfo
