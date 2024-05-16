"use client"

import { useState, useEffect } from "react"
import { useSound } from "use-sound"
import { useGetTasksQuery } from "@/redux/tasksApi"

import { FaPlay, FaPause, FaStop } from "react-icons/fa"
import { VscDebugContinue } from "react-icons/vsc"
import { FaGear } from "react-icons/fa6"
import { useSession } from "next-auth/react"

function FocusTimer() {
  const { data: session } = useSession()

  const [minutes, setMinutes] = useState(30)
  const [seconds, setSeconds] = useState(0)

  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const { data: tasks, isLoading } = useGetTasksQuery(
    `${session?.user?.email}-`
  )

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes < 0 ? 0 : minutes
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds < 0 ? 0 : seconds

  let interval

  const [playEnd] = useSound("/sounds/timer-end.wav")

  useEffect(() => {
    if (isRunning) {
      interval = setInterval(() => {
        clearInterval(interval)
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59)
            setMinutes(minutes - 1)
          } else {
            stopTimer()
            playEnd()
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    }
  }, [seconds, isRunning])

  function stopTimer(mins = 30, secs = 0) {
    clearInterval(interval)
    setMinutes(mins)
    setSeconds(secs)
    setIsRunning(false)
  }

  return (
    <div className='relative overflow-hidden dark:text-slate-50  bg-white dark:bg-slate-800 w-2/6 shadow-lg col-span-2 rounded-lg p-4 flex flex-col items-center justify-between'>
      <h3 className='font-bold text-xl m-0 text-green-a'>Таймер фокусування</h3>
      {!isLoading && tasks.length > 0 && (
        <select
          defaultValue={tasks[0].title}
          disabled={isRunning || isPaused}
          className='w-3/4 truncate ... text-sm border-b-2 pb-2 text-center bg-transparent'
        >
          {tasks.map((task) => (
            <option key={task._id} value={task.title}>
              {task.title}
            </option>
          ))}
        </select>
      )}
      {!isLoading && tasks.length === 0 && <p>Немає завдань</p>}

      <div className='flex items-center gap-2'>
        {!isRunning && !isPaused && (
          <button
            onClick={() => setMinutes((prev) => (prev <= 0 ? 1 : prev - 5))}
            className='text-xl flex items-center justify-center w-10 h-10 rounded-full bg-green-a text-white'
          >
            -
          </button>
        )}
        <div
          className={`flex items-center  mx-2 ${
            isRunning || isPaused ? "animate-pulse" : ""
          }`}
        >
          <input
            type='number'
            className='text-5xl  w-16 text-center py-2 bg-transparent '
            
            min={1}
            max={90}
            value={!isRunning ? minutes : timerMinutes}
            onChange={(e) => {
              e.target.value ? setMinutes(e.target.value) : setMinutes(1)
            }}
          />
          <p className='text-5xl'>:</p>
          <p className='text-5xl  w-16  text-center'>{timerSeconds}</p>
        </div>
        {!isRunning && !isPaused && (
          <button
            onClick={() => setMinutes((prev) => prev + 5)}
            className='text-xl w-10 h-10 flex items-center justify-center  rounded-full bg-green-a text-white'
          >
            +
          </button>
        )}
      </div>
      <div className='w-full h-12 flex items-center justify-center'>
        {minutes !== 0 && !isRunning && !isPaused && (
          <button
            onClick={() => setIsRunning(true)}
            className='flex justify-center w-10 h-10 items-center  border-2 rounded-full bg-green-a border-green-a text-white hover:bg-green-a hover:text-white'
          >
            <FaPlay />
          </button>
        )}

        <div className='flex gap-3'>
          {isRunning && !isPaused && (
            <button
              onClick={() => {
                setIsPaused(true)
                stopTimer(minutes, seconds)
              }}
              className='w-10 h-10 rounded-full border-2 flex items-center justify-center text-amber-500 border-amber-300'
            >
              <FaPause />
            </button>
          )}
          {!isRunning && isPaused && (
            <button
              onClick={() => {
                setIsRunning(true)
                setIsPaused(false)
              }}
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                isPaused ? "bg-amber-500 text-white" : "text-amber-500 "
              } border-amber-500 `}
            >
              <VscDebugContinue />
            </button>
          )}
          {(isRunning || isPaused) && (
            <button
              className='w-10 h-10 rounded-full border-2 flex items-center justify-center text-red-500 border-red-300'
              onClick={() => {
                setIsPaused(false)
                stopTimer()
              }}
            >
              <FaStop />
            </button>
          )}
        </div>
      </div>

      <div
        className={`bottom-0 absolute w-full h-3  ${
          isRunning
            ? "bg-green-a animate-pulse"
            : isPaused
            ? "bg-amber-500 animate-pulse"
            : "bg-green-a"
        }`}
      ></div>
    </div>
  )
}

export default FocusTimer
