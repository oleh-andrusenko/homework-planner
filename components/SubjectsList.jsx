"use client"

import { useGetSubjectsQuery } from "@/redux/subjectsApi"
import SubjectItem from "./SubjectItem"
import noDataImg from "../public/empty.svg"
import Loader from "./Loader"
import NewSubject from "./SubjectForm"
import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { FaPlus } from "react-icons/fa"

function SubjectsList() {
  const { data: session } = useSession()
  const [addNew, setAddNew] = useState(false)
  const { data, isLoading } = useGetSubjectsQuery(session?.user?.email)


  return (
    <div className=''>
      {addNew ? (
        <NewSubject onClose={() => setAddNew(false)} />
      ) : (
        <div className='flex items-center justify-between py-4 px-2 dark:text-slate-50 '>
          <p className='font-bold '>Предмети</p>
          <button className='text-[16px]' onClick={() => setAddNew(true)}>
            <FaPlus />
          </button>
        </div>
      )}
      <ul className='rounded-xl bg-white dark:bg-slate-800 px-6 py-2 h-60 overflow-auto relative'>
        {!isLoading && (
          <>
            {data.length > 0 && (
              <>
                {data.map((item) => (
                  <SubjectItem subject={item} key={item._id} />
                ))}
              </>
            )}
            {data.length === 0 && (
              <div className='flex flex-col gap-4 items-center'>
                <p className='pt-10 text-center dark:text-slate-50'>
                  Немає предметів...
                </p>
                <Image src={noDataImg} className='w-16' alt='' />
              </div>
            )}
          </>
        )}
        {isLoading && <Loader />}
      </ul>
    </div>
  )
}

export default SubjectsList
