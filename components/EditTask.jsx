'use client'

import React, { useState } from "react"
import Input from "./Input"
import DatePicker from "./DatePicker"

function EditTask({ task }) {
  const [selectedDate, setSelectedDate] = useState(task.date)
  return (
    <div className='relative w-full flex items-center justify-center py-32'>
      <form className='py-4 px-6 bg-white rounded-lg shadow-lg'>
        <Input type='text' value={task.title}>
          Завдання
        </Input>

        <DatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </form>
    </div>
  )
}

export default EditTask
