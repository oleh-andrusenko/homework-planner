"use client"

import DashboardTaskList from "@/components/DashboardTaskList"
import { useGetTasksQuery } from "@/redux/tasksApi"
import { useSession } from "next-auth/react"

function ListPage() {
  const { data: session } = useSession()
  const { data, isLoading } = useGetTasksQuery(`${session?.user?.email}-`)
  return <>{!isLoading && <DashboardTaskList data={data} />}</>
}

export default ListPage
