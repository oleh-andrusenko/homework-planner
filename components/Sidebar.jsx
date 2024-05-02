"use client"

import Logo from "./Logo"
import Menu from "./Menu"
import SubjectsList from "./SubjectsList"

function Sidebar() {
  return (
    <aside className='w-[15%]  flex flex-col  justify-between fixed top-6 left-6 z-10'>
      <Logo />
      <Menu />
      <SubjectsList />
      <div className='flex items-center text-sm gap-4'>
        <div className='w-8 h-8 bg-green-a rounded-full'></div>
        <div>
          <p className='font-semibold'>John Doe</p>
          <p className='text-[10px]'>jonh@gmail.com</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
