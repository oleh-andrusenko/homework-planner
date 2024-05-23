"use client"

import React from "react"
import Link from "next/link"
import { FaSignOutAlt } from "react-icons/fa"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"


function UserInfo() {
  const { data: session, status } = useSession()
  return (
    <div className='w-full bg-white dark:bg-slate-800 dark:text-slate-50  flex justify-between py-4 px-2 gap-2 mt-6 rounded-lg items-center text-sm '>
      {status === "authenticated" && (
        <>
          <img
            src={`http://localhost:3000/userAvatars/${session?.user?.image}`}
            width={40}
            height={40}
            className='w-10 h-10 rounded-full'
            alt=''
          />
          <Link href='/dashboard/profile/'>
            <p
              className='text-[14px] font-bold truncate ...'
              title={session.user.name}
            >
              {session.user.name}
            </p>
            <p
              className=' text-[10px] truncate ... '
              title={session.user.email}
            >
              {session.user.email}
            </p>
          </Link>
        </>
      )}
      <button
        className='w-8 hover:scale-110'
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        <FaSignOutAlt className='text-xl text-green-a' />
      </button>
    </div>
  )
}

export default UserInfo
