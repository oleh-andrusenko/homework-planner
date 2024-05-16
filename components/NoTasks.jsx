"use client"
import Image from "next/image"
import noTasksImg from "../public/empty-tasks.svg"

function NoTasks() {
  return (
    <div className='w-full flex-col flex items-center gap-6 justify-center pt-10 text-xl dark:text-slate-50 '>
      <p className="text-xl">Немає завдань...</p>
      <Image src={noTasksImg} className='w-32'  alt=''/>
    </div>
  )
}

export default NoTasks
