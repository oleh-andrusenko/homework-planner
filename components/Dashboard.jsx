"use client"

import Summary from "./Summary"
import FocusTimer from "./FocusTimer"
import { useGetTasksQuery } from "@/redux/tasksApi"
import DashboardTaskList from "./DashboardTaskList"
import { useSession } from "next-auth/react"
import Loader from "./Loader"

function Dashboard() {
  const { data: session, status } = useSession()
  const { data, isLoading } = useGetTasksQuery(`${session?.user?.email}-`)

  if (status === "loading" || status === "unauthenticated") return <Loader />

  return (
    <div className='flex justify-between flex-wrap gap-1 gap-y-4  relative'>
      <Summary />
      <FocusTimer />
      {!isLoading && <DashboardTaskList data={data} category={false} />}
    </div>
  )
}

export default Dashboard
