"use client"

import DashboardTaskList from "@/components/DashboardTaskList"
import { useGetTasksQuery } from "@/redux/tasksApi"

function ListOfSubject({ params }) {
  const { id } = params
  const { data, isLoading } = useGetTasksQuery(id)
  return (
    <div>
      {!isLoading && (
        <DashboardTaskList data={data} filterQuery='' category={true} />
      )}
    </div>
  )
}

export default ListOfSubject
