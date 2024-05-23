"use client"
import { useRef, useState } from "react"
import { FaArrowCircleRight, FaCalendar, FaClock } from "react-icons/fa"
function DatePicker({ selectedDate, setSelectedDate = () => {} }) {
  const [activeDateTab, setActiveDateTab] = useState(0)
  const dateRef = useRef(null)

  function handleDatePick() {
    setActiveDateTab(2)
    dateRef.current.focus()
  }

  return (
    <div className='py-1 flex items-end gap-2'>
      <button
        className={`px-2 py-1 border-2 rounded-lg flex gap-2 items-center border-[#1d9385] ${
          activeDateTab === 0
            ? "text-white bg-green-a "
            : "text-green-a bg-white dark:bg-slate-800 "
        }`}
        onClick={() => {
          setSelectedDate(new Date())
          setActiveDateTab(0)
        }}
      >
        <FaClock
          className={`${activeDateTab === 0 ? "text-white" : "text-green-a"}`}
        />
        Сьогодні
      </button>
      <button
        className={`px-2 py-1 border-2 rounded-lg flex gap-2 items-center border-[#1d9385] ${
          activeDateTab === 1
            ? "text-white bg-green-a "
            : "text-green-a bg-white dark:bg-slate-800 "
        }`}
        onClick={() => {
          let tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          setSelectedDate(tomorrow)
          setActiveDateTab(1)
        }}
      >
        <FaArrowCircleRight
          className={`${activeDateTab === 1 ? "text-white" : "text-green-a"}`}
        />
        Завтра
      </button>
      <button
        onClick={handleDatePick}
        className={`px-2 py-1 border-2 rounded-lg flex gap-2 items-center border-[#1d9385] ${
          activeDateTab === 2
            ? "text-white bg-green-a "
            : "text-green-a bg-white dark:bg-slate-800 "
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
          activeDateTab === 2 ? "dark:bg-slate-800 dark:text-green-a" : "hidden"
        }`}
        type='date'
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
    </div>
  )
}

export default DatePicker
