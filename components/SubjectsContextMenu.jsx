import React from "react"
import { FaArchive, FaEdit, FaTrash } from "react-icons/fa"
import { MdOutlineClose } from "react-icons/md"
import { useDeleteSubjectMutation } from "@/redux/subjectsApi"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
function SubjectsContextMenu({ x, y, clickedItem, closeMenu }) {
  const [deleteSubject] = useDeleteSubjectMutation()
  const router = useRouter()
  const handleDeleteSubject = async (id) => {
    await deleteSubject(id).unwrap()
    router.replace("/dashboard")
    router.refresh()
  }

  return (
    <motion.div
      initial={{
        height: 0,
      }}
      animate={{
        height: "auto",
      }}
      exit={{
        height: 0,
      }}
      className=' rounded-lg shadow-lg p-2 bg-white dark:bg-slate-900'
      onClick={closeMenu}
    >
      <motion.ul
        initial={{
          opacity: 0,
        }}
        animate={{ opacity: 1, transitionDelay: 0.4 }}
        exit={{ opacity: 0, transitionDelay: 0.2 }}
        className='text-sm'
      >
        <li>
          <Link
            href={`/dashboard/editSubject/${clickedItem._id}`}
            className='flex items-center gap-1 my-2 hover:text-green-a'
          >
            <FaEdit />
            Змінити
          </Link>
        </li>
        <li>
          <button
            className='flex items-center gap-1 my-2 hover:text-green-a'
            onClick={() => handleDeleteSubject(clickedItem._id)}
          >
            <FaTrash />
            Видалити
          </button>
        </li>
        <hr />
        <li>
          <button
            onClick={closeMenu}
            className='flex items-center gap-1 hover:text-red-500'
          >
            <MdOutlineClose /> Закрити
          </button>
        </li>
      </motion.ul>
    </motion.div>
  )
}

export default SubjectsContextMenu
