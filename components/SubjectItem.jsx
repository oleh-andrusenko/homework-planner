import React, { useState } from "react"
import SubjectsContextMenu from "./SubjectsContextMenu"
import { AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

function SubjectItem({ subject }) {
  const path = usePathname()
  const currentPathId = path.split("/")[3]
  const initialContextMenu = {
    isShown: false,
  }
  const [contextMenu, setContextMenu] = useState(initialContextMenu)
  return (
    <li
      onContextMenu={(e) => {
        e.preventDefault()
        setContextMenu({
          isShown: true,
        })
      }}
      key={subject._id}
      className='flex flex-col text-lg text-gray-700 dark:text-slate-50  my-4 '
    >
      <Link href={`/dashboard/list/${subject._id}`}>
        <div
          className={`flex items-center gap-2 ${
            currentPathId === subject._id
              ? " text-green-a font-semibold  ml-2"
              : ""
          }`}
        >
          <div
            className={`w-3 h-3 rounded-full`}
            style={{
              backgroundColor: subject.color.toLowerCase(),
            }}
          ></div>
          <span
            className={`w-2/3 hover:text-green-a cursor-pointer text-md truncate ... `}
            title={subject.name}
          >
            {subject.name}
          </span>
        </div>
        <AnimatePresence>
          {contextMenu.isShown && (
            <SubjectsContextMenu
              clickedItem={subject}
              closeMenu={() => setContextMenu(initialContextMenu)}
            />
          )}
        </AnimatePresence>
      </Link>
    </li>
  )
}

export default SubjectItem
