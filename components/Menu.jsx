"use client"

import { ImHome } from "react-icons/im"
import { MdOutlinePlaylistAddCheckCircle } from "react-icons/md"
import { FaRegCalendarAlt } from "react-icons/fa"
import { usePathname } from "next/navigation"
import Link from "next/link"

function Menu() {
  const pathname = usePathname()
  const linkClasses =
    "flex gap-4 items-center text-lg text-gray-700 dark:text-slate-50  my-4 hover:text-green-a cursor-pointer"

  const activeLinkClasses =
    "flex gap-4 items-center text-lg text-green-a my-4 hover:text-green-a cursor-pointer font-semibold"
  return (
    <nav>
      <ul className='rounded-xl bg-white dark:bg-slate-800 px-6 py-2'>
        <li>
          <Link
            href='/dashboard'
            className={
              pathname === "/dashboard" ? activeLinkClasses : linkClasses
            }
          >
            <ImHome className='text-xl' /> Панель задач
          </Link>
        </li>
        <li>
          <Link
            href='/dashboard/list'
            className={pathname === "/dashboard/list" ? activeLinkClasses : linkClasses}
          >
            <MdOutlinePlaylistAddCheckCircle className='text-xl' />
            Список
          </Link>
        </li>

        <li>
          <Link
            href='/dashboard/planner'
            className={
              pathname === "/dashboard/planner" ? activeLinkClasses : linkClasses
            }
          >
            <FaRegCalendarAlt className='text-xl' /> Планер
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Menu
