"use client"

import { useSession } from "next-auth/react"
import { FaEdit } from "react-icons/fa"
import ProfileStats from "@/components/ProfileStats"
import Link from "next/link"
function ProfilePage() {
  const { data: session } = useSession()

  return (
    <div className='px-6'>
      <div className='flex items-center justify-between'>
        <div>
          <img
            src={"http://localhost:3000/userAvatars/" + session?.user?.image}
            alt=''
            className='w-[96px] h-[96px] rounded-full border-2 border-green-a'
          />
        </div>
        <div className='flex gap-10 items-end'>
          <h2 className='text-3xl text-green-a font-bold'>
            {session?.user?.name}
          </h2>
          <p className='text-lg text-slate-800 dark:text-slate-50'>
            {session?.user?.email}
          </p>
        </div>

        <Link
          href={"/dashboard/editProfile"}
          className='px-2 py-1 bg-green-a text-white rounded-lg flex items-center gap-2 text-lg'
        >
          <FaEdit />
          Редагувати
        </Link>
      </div>
      <div></div>

      <div>
        <ProfileStats />
      </div>
    </div>
  )
}

export default ProfilePage
