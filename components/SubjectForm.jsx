"use client"
import { FaPlus } from "react-icons/fa6"
import {
  useAddSubjectMutation,
  useUpdateSubjectMutation,
} from "@/redux/subjectsApi"
import { useState } from "react"
import { MdOutlineClose } from "react-icons/md"
import { useSession } from "next-auth/react"
import { notifyError, notifySuccess } from "@/utils/notification"
import { useRouter } from "next/navigation"

function NewSubject({ onClose, subj }) {
  const { data: session } = useSession()
  const [addSubject] = useAddSubjectMutation()
  const [updateSubject] = useUpdateSubjectMutation()
  const [subject, setSubject] = useState(subj?.name || "")
  const [subjectColor, setSubjectColor] = useState(subj?.color || "#0da57d")
  const router = useRouter()
  async function handleAddSubject() {
    if (subject) {
      const res = await addSubject({
        userEmail: session.user.email,
        name: subject,
        color: subjectColor,
      }).unwrap()
      if (res.status === 201) {
        setSubject("")
        setSubjectColor("#0da57d")
        onClose()
        notifySuccess(res.message)
      } else {
        console.error(res)
        notifyError(res.message)
      }
    } else notifyError("Назва не може бути порожньою!")
  }

  async function handleUpdateSubject() {
    if (subject) {
      const res = await updateSubject({
        id: subj._id,
        name: subject,
        color: subjectColor,
      }).unwrap()
      if (res.status === 200) {
        router.replace("/dashboard")
        notifySuccess("Предмет оновлено!")
      } else {
        console.error(res)
        notifyError("При оновленні предмета сталась помилка!")
      }
    } else notifyError("Назва не може бути порожньою!")
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
        placeholder={!subj ? "Додати предмет..." : "Редагувати предмет..."}
        className='border-2 border-gray-200 px-2 py-1 rounded-lg w-[75%] text-sm dark:text-white dark:bg-slate-600 dark:border-green-a'
      />
      {!subj && (
        <>
          <button onClick={handleAddSubject}>
            <FaPlus className='text-xl hover:text-green-a' />
          </button>
          <button onClick={onClose}>
            <MdOutlineClose className='text-lg hover:text-red-600' />
          </button>
        </>
      )}
      {subj && (
        <div className='ml-4 flex gap-2'>
          <button
            className='p-1  rounded-lg bg-green-a text-white'
            onClick={handleUpdateSubject}
          >
            Зберегти
          </button>
          <button
            className='p-1 rounded-lg bg-red-600 text-white'
            onClick={() => router.back()}
          >
            Закрити
          </button>
        </div>
      )}
    </div>
  )
}

export default NewSubject
