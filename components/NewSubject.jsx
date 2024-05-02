"use client"
import { FaPlus } from "react-icons/fa6"
import { useAddSubjectMutation } from "@/redux/subjectsApi"
import { useState } from "react"
import { MdOutlineClose } from "react-icons/md"

function NewSubject({ onClose }) {
  const [addSubject, { isError }] = useAddSubjectMutation()
  const [subject, setSubject] = useState("")
  const [subjectColor, setSubjectColor] = useState("#0da57d")
  async function handleAddSubject() {
    if (subject) {
      await addSubject({ name: subject, color: subjectColor }).unwrap()
      setSubject("")
      setSubjectColor("#0da57d")
      onClose()
    }
  }

  return (
    <div className='py-4 flex justify-between items-center'>
      <input
        type='color'
        value={subjectColor}
        className='w-6 h-6 mr-2  border-none bg-transparent cursor-pointer'
        onChange={(e) => setSubjectColor(e.target.value)}
      />
      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        type='text'
        placeholder='Додати предмет...'
        className='px-2 py-1 rounded-lg w-[75%] text-sm'
      />
      <button onClick={handleAddSubject}>
        <FaPlus className='text-lg hover:text-green-a' />
      </button>
      <button onClick={onClose}>
        <MdOutlineClose className='text-lg hover:text-red-600' />
      </button>
    </div>
  )
}

export default NewSubject
