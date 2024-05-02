"use client"

import { useGetSubjectsQuery } from "@/redux/subjectsApi"
import SubjectItem from "./SubjectItem"

import Loader from "./Loader"
import NewSubject from "./NewSubject"
import { useState } from "react"

function SubjectsList() {
  const [addNew, setAddNew] = useState(false)
  const { data, isLoading } = useGetSubjectsQuery()

  console.log(data)
  return (
    <div className=''>
      {addNew ? (
        <NewSubject onClose={() => setAddNew(false)} />
      ) : (
        <div className='flex items-center justify-between py-4 px-2'>
          <p className='font-bold'>Предмети</p>
          <button className='text-lg' onClick={() => setAddNew(true)}>
            +
          </button>
        </div>
      )}
      <ul className='rounded-xl bg-white px-6 py-2 h-60 overflow-auto relative'>
        {!isLoading && (
          <>
            {data.length > 0 && (
              <>
                {data.map((item) => (
                  <SubjectItem subject={item} key={item.id} />
                ))}
              </>
            )}
            {data.length === 0 && (
              <p className='pt-10 text-center'>Немає предметів...</p>
            )}
          </>
        )}
        {isLoading && <Loader />}
      </ul>
    </div>
  )
}

export default SubjectsList
