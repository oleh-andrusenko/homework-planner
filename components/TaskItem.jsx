"use client"
import { useCheckTaskMutation } from "@/redux/tasksApi"
import React from "react"

function TaskItem({ task }) {
  console.log("task", task)
  const { color, name } = task.subject
  const [checkTask] = useCheckTaskMutation()

  const handleCheckTask = async () => {
    checkTask({ id: task._id, body: { status: !task.isDone } })
  }

  return (
    <li
      key={task._id}
      className={`flex gap-2 justify-between items-center bg-white w-full px-4 py-2  my-2 shadow-lg rounded-lg ${
        task.isDone &&
        " relative overflow-hidden after:w-2 after:h-full after:bg-green-a after:absolute after:top-0 after:right-0 before:w-2 before:h-full before:bg-green-a before:absolute before:top-0 before:left-0"
      }`}
    >
      <div className='flex w-[5%]'>
        <input
          type='checkbox'
          checked={task.isDone}
          className='w-5 h-5'
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
      <div className='w-[15%] text-green-a'>{task.date.slice(0, 10)}</div>
    </li>
  )
}

export default TaskItem
