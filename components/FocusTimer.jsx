"use client"

import { useState } from "react"
import { FaPlay } from "react-icons/fa"
import timerImg from "../public/timer.svg"
import Image from "next/image"
function FocusTimer() {
  const [timer, setTimer] = useState(30)
  return (
    <div className='bg-white w-2/6 shadow-lg col-span-2 rounded-lg p-4 flex flex-col items-center justify-between'>
      <h3 className='font-semibold text-lg m-0'>Таймер фокусування</h3>
      <p className='text-sm m-0'>Теорія права. Лекція.</p>
      <div className='flex items-center gap-2'>
        <button
          onClick={() => setTimer((prev) => (prev > 0 ? prev - 5 : prev))}
          className='text-lg flex items-center justify-center w-8 h-8 rounded-full bg-green-a text-white'
        >
          -
        </button>
        <div className='text-4xl mx-2'>{timer} хв.</div>
        <button
          onClick={() => setTimer((prev) => prev + 5)}
          className='text-lg w-8 h-8 flex items-center justify-center  rounded-full bg-green-a text-white'
        >
          +
        </button>
      </div>
      <div>
        <button className='flex gap-1 items-center px-2 py-1 border-2 rounded-lg bg-white border-black'>
          <FaPlay /> Старт
        </button>
      </div>
      <Image src={timerImg} className='w-32' />
    </div>
  )
}

export default FocusTimer
