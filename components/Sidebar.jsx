"use client"

import Logo from "./Logo"
import Menu from "./Menu"
import SubjectsList from "./SubjectsList"
import UserInfo from "./UserInfo"

function Sidebar() {
  return (
    <aside className='w-[15%]  flex flex-col  fixed top-6 left-6 z-10'>
      <Logo />
      <Menu />
      <SubjectsList />
      <UserInfo />
    </aside>
  )
}

export default Sidebar
