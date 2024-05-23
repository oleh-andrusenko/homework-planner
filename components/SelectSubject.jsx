"use client"

import { useGetSubjectsQuery } from "@/redux/subjectsApi"
import { useSession } from "next-auth/react"
import { useState } from "react"

function SelectSubject({ selectedSubject, setSelectedSubject }) {
  const { data: session } = useSession()
  const { data: subjects, isLoading: isSubjectsLoading } = useGetSubjectsQuery(
    session?.user?.email
  )
  return (
    <>
      {!isSubjectsLoading && subjects.length !== 0 && (
        <div className='px-2 py-1 border-2 rounded-lg flex items-center'>
          <div
            className='w-3 h-3 rounded-full '
            style={{
              backgroundColor: selectedSubject?.color || subjects[0].color,
            }}
          ></div>

          <select
            name='subject'
            id='subject'
            defaultValue={subjects[0]._id}
            value={
              selectedSubject !== null ? selectedSubject._id : subjects[0]._id
            }
            className='w-full truncate ... px-2 dark:bg-slate-800 dark:text-slate-50'
            onChange={(e) => {
              setSelectedSubject(
                subjects.filter((item) => item._id === e.target.value)[0]
              )
            }}
          >
            {subjects.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  )
}

export default SelectSubject
