"use client"

import { useSession } from "next-auth/react"
import userImg from "../../../public/user.png"
import Image from "next/image"
import { FaEdit } from "react-icons/fa"
import { useGetTasksQuery } from "@/redux/tasksApi"
import ProfileStats from "@/components/ProfileStats"
import SmallLoader from "@/components/SmallLoader/SmallLoader"
function ProfilePage() {
  const { data: session } = useSession()

  return (
    <div className='px-6'>
      <div className='flex items-center justify-between'>
        
          <div>
            <Image src={userImg} alt='' className='w-[96px]' />
          </div>
          <div className="flex gap-10 items-end">
            <h2 className='text-3xl text-green-a font-bold'>
              {session?.user?.name}
            </h2>
            <p className='text-lg text-slate-800 dark:text-slate-50'>
              {session?.user?.email}
            </p>
          </div>
        
        <button className='px-2 py-1 bg-green-a text-white rounded-lg flex items-center gap-2 text-lg'>
          <FaEdit />
          Редагувати
        </button>
      </div>
      <div></div>

      <div>
        <ProfileStats />
      </div>
    </div>
  )
}

export default ProfilePage
