import Sidebar from "@/components/Sidebar"
import StoreProvider from "@/components/StoreProvider"

export const metadata = {
  title: "Homework Keeper",
  description: "Keep your homework in one place",
}

export default function DashboardLayout({ children }) {
  return (
    <>
      <StoreProvider>
        <Sidebar />
        <div className='ml-[17%] w-[80%]'>{children}</div>
      </StoreProvider>
    </>
  )
}
