"use client"
import { useCheckTaskMutation, useDeleteTaskMutation } from "@/redux/tasksApi"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import { TbBallpen, TbDotsVertical, TbTrash } from "react-icons/tb"

function TaskItem({ task }) {
  const { color, name } = task.subject
  const router = useRouter()
  const [checkTask] = useCheckTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()

  const handleCheckTask = async () => {
    await checkTask({ id: task._id, body: { status: !task.isDone } }).unwrap()
  }

  const handleDeleteTask = async () => {
    await deleteTask(task._id).unwrap()
  }
  return (
    <li
      key={task._id}
      className={`relative flex gap-2 justify-between items-center bg-white dark:bg-slate-800 dark:text-slate-50 w-full px-4 py-2  my-2 shadow-lg rounded-lg ${
        task.isDone &&
        "  overflow-hidden after:w-2 after:h-full after:bg-green-a after:absolute after:top-0 after:right-0 before:w-2 before:h-full before:bg-green-a before:absolute before:top-0 before:left-0"
      }`}
    >
      <div className='flex w-[5%]'>
        <input
          type='checkbox'
          checked={task.isDone}
          className='w-6 h-6 '
          onChange={handleCheckTask}
        />
      </div>
      <div className='flex flex-col gap-2 w-[80%]'>
        <p className='text-lg font-semibold'> {task.title}</p>
        <div className='flex gap-2 items-center'>
          <div
            style={{ backgroundColor: color }}
            className='w-1 h-5 rounded-lg'
          />
          <div>{name}</div>
        </div>
      </div>
      <div className='w-[15%] text-lg text-green-a font-semibold'>
        {task.date.slice(0, 10)}
      </div>
      <div className='group absolute right-4'>
        <p className='text-2xl group-hover:hidden'>
          <TbDotsVertical />
        </p>
        <div className='hidden group-hover:flex flex-col gap-2'>
          <button onClick={handleDeleteTask}>
            <TbTrash  className='mr-2 text-lg text-red-400' />
          </button>
          <Link href={`/dashboard/editTask/${task._id}`}>
            <TbBallpen className='mr-2 text-lg text-amber-400' />
          </Link>
        </div>
      </div>
    </li>
  )
}

export default TaskItem
