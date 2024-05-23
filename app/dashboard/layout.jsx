import Sidebar from "@/components/Sidebar"

export const metadata = {
  title: "Homework Keeper",
  description: "Keep your homework in one place",
}

export default function DashboardLayout({ children }) {
  return (
    <>
      <Sidebar />
      <div className='ml-[17%] w-[80%]'>{children}</div>
    </>
  )
}
