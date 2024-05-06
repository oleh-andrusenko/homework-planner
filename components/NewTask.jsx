"use client"

import { useRef, useState } from "react"
import { FaArrowCircleRight, FaCalendar, FaClock, FaPlus } from "react-icons/fa"
import { useAddTaskMutation, useGetTasksQuery } from "@/redux/tasksApi"
import { useGetSubjectsQuery } from "@/redux/subjectsApi"
import DashboardTaskList from "./DashboardTaskList"
import Loader from "./Loader"
import SearchBar from "./SearchBar"

function NewTask() {
  const [taskTitle, setTaskTitle] = useState("")
  const [selectedSubject, setSelectedSubject] = useState()
  const [selectedDate, setSelectedDate] = useState()
  const [filter, setFilter] = useState("")
  const [activeDateTab, setActiveDateTab] = useState()

  const { data, isLoading } = useGetSubjectsQuery()
  const { data: tasks, isLoading: isTasksLoading } = useGetTasksQuery()
  const [addTask] = useAddTaskMutation()
  const dateRef = useRef(null)

  async function handleAddTask() {
    addTask({
      title: taskTitle,
      date: selectedDate,
      subject: selectedSubject || data[0],
    })
    setTaskTitle("")
    setActiveDateTab(null)
    setSelectedDate(null)
  }

  function handleDatePick() {
    setActiveDateTab(2)
    dateRef.current.focus()
  }

  return (
    <div className='w-full max-w-full flex flex-col '>
      <SearchBar filter={filter} setFilter={setFilter} />
      {isLoading && <Loader />}
      {!isLoading && data.length === 0 && (
        <p className='w-full h-20'>
          Для створення завдання створіть предмет...
        </p>
      )}
      {!isLoading && !isTasksLoading && data.length > 0 && (
        <div className='rounded-lg bg-white py-2 px-4'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Додати завдання...'
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className='h-1/2 w-full border-2 rounded-lg py-1 px-2 focus:outline-none focus:border-green-a'
            />
            <button
              className='absolute right-2 bottom-2 text-green-a '
              onClick={handleAddTask}
            >
              <FaPlus />
            </button>
          </div>

          <div className='flex items-center gap-2 mt-2'>
            {!isLoading && data.length !== 0 && (
              <div className='px-2 py-1 border-2 rounded-lg flex items-center'>
                <div
                  className='w-3 h-3 rounded-full '
                  style={{
                    backgroundColor: selectedSubject?.color || data[0].color,
                  }}
                ></div>

                <select
                  name='subject'
                  id='subject'
                  className='w-30 truncate ... px-2'
                  onChange={(e) => {
                    setSelectedSubject(
                      data.filter((item) => item._id === e.target.value)[0]
                    )
                  }}
                >
                  {data.map((item, index) => (
                    <option
                      key={item._id}
                      selected={index === 0}
                      value={item._id}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              className={`px-2 py-1 border-2 rounded-lg flex gap-2 items-center ${
                activeDateTab === 0
                  ? "text-white bg-green-a border-[#1d9385]"
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
                  activeDateTab === 2 ? "text-white" : "text-green-a"
                }`}
              />
              Інший день
            </button>

            <input
              ref={dateRef}
              className={`${activeDateTab === 2 ? undefined : "hidden"}`}
              type='date'
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
      )}
      {!isTasksLoading && <DashboardTaskList data={tasks} filterQuery={filter} category={false}/>}
      
    </div>
  )
}

export default NewTask
