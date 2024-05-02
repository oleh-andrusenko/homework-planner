import React from "react"
import { FaArchive, FaEdit, FaTrash } from "react-icons/fa"
import { MdOutlineClose } from "react-icons/md"
import { useDeleteSubjectMutation } from "@/redux/subjectsApi"
import { motion } from "framer-motion"
function SubjectsContextMenu({ x, y, clickedItem, closeMenu }) {
  const [deleteSubject] = useDeleteSubjectMutation()

  const handleDeleteSubject = async (id) => {
    await deleteSubject(id).unwrap()
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
      style={{
        backgroundColor: "#fff",
      }}
      className=' rounded-lg shadow-lg p-2'
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
        <hr />
        <li>
          <button className='flex items-center gap-1 my-2 hover:text-green-a'>
            <FaArchive className='text-sm' /> Архівувати
          </button>
        </li>
        <li>
          <button className='flex items-center gap-1 my-2 hover:text-green-a'>
            <FaEdit />
            Змінити
          </button>
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
