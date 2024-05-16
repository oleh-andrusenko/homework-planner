"use client"

import { useRef, useState } from "react"
import {
  FaArrowCircleRight,
  FaArrowLeft,
  FaCalendar,
  FaClock,
  FaPlus,
} from "react-icons/fa"
import { useAddTaskMutation } from "@/redux/tasksApi"
import { useGetSubjectsQuery } from "@/redux/subjectsApi"
import Loader from "./Loader"
import { useSession } from "next-auth/react"
import { notifyError, notifySuccess } from "@/utils/notification"

function NewTask() {
  const { data: session } = useSession()

  const [taskTitle, setTaskTitle] = useState("")
  const [selectedSubject, setSelectedSubject] = useState()
  const [selectedDate, setSelectedDate] = useState(new Date())

  const [activeDateTab, setActiveDateTab] = useState(0)

  const { data: subjects, isLoading } = useGetSubjectsQuery(session.user.email)
  const [addTask] = useAddTaskMutation()
  const dateRef = useRef(null)

  async function handleAddTask() {
    const res = await addTask({
      userEmail: session.user.email,
      title: taskTitle,
      date: selectedDate,
      subject: selectedSubject || subjects[0],
    }).unwrap()
    if (res.status === 201) {
      notifySuccess("Завдання створено!")
      setTaskTitle("")
      setActiveDateTab(0)
      setSelectedDate(new Date())
    } else notifyError("При додаванні завдання сталась помилка!")
  }

  function handleDatePick() {
    setActiveDateTab(2)
    dateRef.current.focus()
  }

  return (
    <div className='w-full max-w-full flex flex-col dark:bg-slate-800 rounded-lg'>
      {isLoading && <Loader />}
      {!isLoading && subjects.length === 0 && (
        <p className='relative w-full flex items-center justify-center h-20 bg-white dark:bg-slate-800 dark:text-slate-50 rounded-lg text-lg'>
          <FaArrowLeft className='absolute left-2  animate-pulse text-green-a' />
          Для створення завдання створіть предмет в меню ліворуч😊
        </p>
      )}
      {!isLoading && subjects.length > 0 && (
        <div className='rounded-lg bg-white dark:bg-slate-800 py-2 px-4'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Додати завдання...'
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
              <FaPlus />
            </button>
          </div>

          <div className='flex items-center gap-2 mt-2'>
            {!isLoading && subjects.length !== 0 && (
              <div className='px-2 py-1 border-2 rounded-lg flex items-center'>
                <div
                  className='w-3 h-3 rounded-full '
                  style={{
                    backgroundColor:
                      selectedSubject?.color || subjects[0].color,
                  }}
                ></div>

                <select
                  name='subject'
                  id='subject'
                  defaultValue={subjects[0]._id}
                  className='w-30 truncate ... px-2 dark:bg-slate-800 dark:text-slate-50'
                  onChange={(e) => {
                    setSelectedSubject(
                      subjects.filter((item) => item._id === e.target.value)[0]
                    )
                  }}
                >
                  {subjects.map((item, index) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              className={`px-2 py-1 border-2 rounded-lg flex gap-2 items-center ${
                activeDateTab === 0
                  ? "text-white bg-green-a border-[#1d9385] dark:border-slate-50"
                  : "text-green-a bg-white"
              }`}
              onClick={() => {
                setSelectedDate(new Date())
                setActiveDateTab(0)
              }}
            >
              <FaClock
                className={`${
                  activeDateTab === 0 ? "text-white" : "text-green-a"
                }`}
              />
              Сьогодні
            </button>
            <button
              className={`px-2 py-1 border-2 rounded-lg flex gap-2 items-center ${
                activeDateTab === 1
                  ? "text-white bg-green-a border-[#1d9385]"
                  : "text-green-a bg-white"
              }`}
              onClick={() => {
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                setSelectedDate(tomorrow)
                setActiveDateTab(1)
              }}
            >
              <FaArrowCircleRight
                className={`${
                  activeDateTab === 1 ? "text-white" : "text-green-a"
                }`}
              />
              Завтра
            </button>
            <button
              onClick={handleDatePick}
              className={`px-2 py-1 border-2 rounded-lg flex gap-2 items-center ${
                activeDateTab === 2
                  ? "text-white bg-green-a border-[#1d9385]"
                  : "text-green-a bg-white"
              }`}
            >
              <FaCalendar
                className={`${
                  activeDateTab === 2
                    ? "text-white dark:text-slate-50"
                    : "text-green-a"
                }`}
              />
              Інший день
            </button>

            <input
              ref={dateRef}
              className={`${
                activeDateTab === 2
                  ? "dark:bg-slate-800 dark:text-slate-50"
                  : "hidden"
              }`}
              type='date'
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default NewTask
