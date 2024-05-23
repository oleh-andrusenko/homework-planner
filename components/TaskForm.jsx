"use client"

import { useState } from "react"
import { FaArrowLeft, FaPlus, FaSave } from "react-icons/fa"
import {
  useAddTaskMutation,
  useCheckTaskMutation,
  useUpdateTaskMutation,
} from "@/redux/tasksApi"
import { useGetSubjectsQuery } from "@/redux/subjectsApi"
import Loader from "./Loader"
import { useSession } from "next-auth/react"
import { notifyError, notifySuccess } from "@/utils/notification"
import DatePicker from "./DatePicker"
import SelectSubject from "./SelectSubject"
import { useRouter } from "next/navigation"

function TaskForm({ task }) {
  const { data: session } = useSession()
  const [taskTitle, setTaskTitle] = useState(task?.title || "")
  const [selectedSubject, setSelectedSubject] = useState(task?.subject || null)
  const [selectedDate, setSelectedDate] = useState(task?.date || new Date())
  const { data: subjects, isLoading } = useGetSubjectsQuery(
    session?.user?.email
  )
  const [addTask] = useAddTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const router = useRouter()
  console.log()
  async function handleAddTask() {
    if (taskTitle) {
      const res = await addTask({
        userEmail: session.user.email,
        title: taskTitle,
        date: selectedDate,
        subject: selectedSubject || subjects[0],
      }).unwrap()
      if (res.status === 201) {
        notifySuccess("Завдання створено!")
        setTaskTitle("")
        setSelectedDate(new Date())
      } else notifyError("При додаванні завдання сталась помилка!")
    } else notifyError("Поле назви не може бути порожнім!")
  }

  async function handleUpdateTask() {
    if (taskTitle) {
      const res = await updateTask({
        id: task._id,
        body: {
          ...task,
          title: taskTitle,
          date: selectedDate,
          subject: selectedSubject || subjects[0],
        },
      }).unwrap()

      if (res.status === 200) {
        notifySuccess("Завдання оновлено!")
        router.replace("/dashboard")
      } else notifyError("При оновленні завдання сталась помилка!")
    } else notifyError("Поле назви не може бути порожнім!")
  }

  return (
    <div className='w-full max-w-full flex flex-col dark:bg-slate-800 rounded-lg'>
      {isLoading && <Loader />}
      {!isLoading && subjects.length === 0 && (
        <p className='relative w-full flex items-center justify-center h-20 bg-white dark:bg-slate-800 dark:text-slate-50 rounded-lg text-'>
          <FaArrowLeft className='absolute left-2  animate-pulse text-green-a' />
          Для створення завдання створіть предмет в меню ліворуч😊
        </p>
      )}
      {!isLoading && subjects.length > 0 && (
        <div
          className={`${
            task ? "w-[700px]" : "w-full"
          } relative rounded-lg bg-white dark:bg-slate-800 py-6 px-4`}
        >
          <div className='relative'>
            <input
              type='text'
              placeholder={
                !task ? "Додати завдання..." : "Редагувати завдання..."
              }
              onKeyPress={(e) =>
                e.key === "Enter" ? handleAddTask() : undefined
              }
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className='h-1/2 w-full border-2 rounded-lg py-1 px-2 focus:outline-none focus:border-green-a dark:bg-slate-700 dark:text-slate-50'
            />
            <button
              className='absolute right-2 bottom-2 text-green-a dark:text-slate-50 '
              onClick={handleAddTask}
            >
              {!task && <FaPlus />}
            </button>
          </div>

          <div
            className={`flex ${
              task ? "flex-col" : "items-center"
            } justify-between gap-2 mt-2`}
          >
            <SelectSubject
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
            />
            <DatePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
          {task && (
            <div className='w-full flex items-center justify-end mt-4 gap-4'>
              <button
                className='py-1 px-4 bg-green-a text-white rounded-lg'
                onClick={handleUpdateTask}
              >
                Зберегти
              </button>
              <button
                className='py-1 px-2 bg-red-500 text-white rounded-lg'
                onClick={() => router.back()}
              >
                Закрити
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TaskForm
