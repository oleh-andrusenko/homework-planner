"use client"

import Image from "next/image"
import morningBg from "../public/morning.svg"
import dayBg from "../public/day.svg"
import eveningBg from "../public/evening.svg"
import nightBg from "../public/night.svg"
import { useGetTasksQuery } from "@/redux/tasksApi"
import { useGetSubjectsQuery } from "@/redux/subjectsApi"
import Loader from "./Loader"

function Summary() {
  const { data: tasks, isLoading: isTasksLoading } = useGetTasksQuery()
  const { data: subjects, isLoading: isSubjectsLoading } = useGetSubjectsQuery()
  const today = new Date()
  let currentHours = today.getHours()
  currentHours = 11
  let greeting
  let background

  switch (true) {
    case currentHours >= 5 && currentHours < 11: {
      greeting = "Доброго ранку"
      background = morningBg
      break
    }
    case currentHours >= 11 && currentHours < 18: {
      greeting = "Добрий день"
      background = dayBg
      break
    }
    case currentHours >= 18 && currentHours < 22: {
      greeting = "Добрий вечір"
      background = eveningBg
      break
    }
    case currentHours >= 22 || currentHours < 5: {
      greeting = "Доброї ночі"
      background = nightBg
      break
    }
    default:
      greeting = "undefined"
  }

  return (
    <div
      id='summary'
      className='w-3/5 px-6 h-72 shadow-lg  rounded-xl py-4 bg-white relative overflow-hidden col-span-3'
    >
      {!isTasksLoading && !isSubjectsLoading && (
        <>
          <h2 className='text-3xl font-bold py-2'>
            {greeting}, <span className='text-green-a'>Олег</span>!
          </h2>

          <p className='text-lg'>
            Завдань на сьогодні: &nbsp;
            <span className='text-green-a font-semibold'>
              {
                tasks.filter(
                  (task) =>
                    task.date.slice(0, 10) === today.toISOString().slice(0, 10)
                ).length
              }
            </span>
          </p>

          <div className='w-1/2 border-l-2 border-l-gray-400 px-3 py-2  flex flex-col text-slate-700'>
            <p className='text-black py-1 font-semibold'>Поточні завдання</p>
            {tasks.slice(0, 3).map((item) => (
              <div
                style={{
                  borderColor: item.subject.color,
                }}
                className='w-3/4 flex gap-2 items-center border-l-[3px]  my-1 px-2'
              >
                <span className='truncate ...'>{item.title}</span>
              </div>
            ))}
          </div>

          <Image
            src={background}
            className='absolute w-[400px] h-[200px] right-4 bottom-1'
          />
        </>
      )}
      {(isTasksLoading || isSubjectsLoading) && <Loader />}
    </div>
  )
}

export default Summary
