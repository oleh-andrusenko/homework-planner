"use client"
import { FaPlus } from "react-icons/fa6"
import { useAddSubjectMutation } from "@/redux/subjectsApi"
import { useState } from "react"
import { MdOutlineClose } from "react-icons/md"
import { useSession } from "next-auth/react"

function NewSubject({ onClose }) {
  const { data: session } = useSession()
  const [addSubject, { isError }] = useAddSubjectMutation()
  const [subject, setSubject] = useState("")
  const [subjectColor, setSubjectColor] = useState("#0da57d")

  async function handleAddSubject() {
    if (subject) {
      await addSubject({
        userEmail: session.user.email,
        name: subject,
        color: subjectColor,
      }).unwrap()
      setSubject("")
      setSubjectColor("#0da57d")
      onClose()
    }
  }

  return (
    <div className='py-4 flex justify-between items-center dark:text-slate-50 '>
      <input
        type='color'
        value={subjectColor}
        className='w-6 h-6 mr-2  border-none bg-transparent cursor-pointer text-green-a'
        onChange={(e) => setSubjectColor(e.target.value)}
      />
      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        type='text'
        onKeyDown={(e) => (e.key === "Enter" ? handleAddSubject() : undefined)}
        placeholder='Додати предмет...'
        className='px-2 py-1 rounded-lg w-[75%] text-sm dark:text-black'
      />
      <button onClick={handleAddSubject}>
        <FaPlus className='text-xl hover:text-green-a' />
      </button>
      <button onClick={onClose}>
        <MdOutlineClose className='text-lg hover:text-red-600' />
      </button>
    </div>
  )
}

export default NewSubject
