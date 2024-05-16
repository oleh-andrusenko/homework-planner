"use client"

import DashboardTaskList from "@/components/DashboardTaskList"
import NewTask from "@/components/NewTask"
import NoTasks from "@/components/NoTasks"
import { useGetSubjectsQuery } from "@/redux/subjectsApi"
import { useGetTasksQuery } from "@/redux/tasksApi"
import { useSession } from "next-auth/react"

function ListOfSubject({ params }) {
  const { id } = params
  const { data: session } = useSession()
  const { data: subjects, isLoading: isSubjectsLoading } = useGetSubjectsQuery()
  const { data, isLoading } = useGetTasksQuery(`${session?.user?.email}-${id}`)

  return (
    <div>
      {!isLoading && data.length > 0 && (
        <DashboardTaskList
          data={data}
          filterQuery=''
          category={subjects.filter((subject) => subject._id === id)[0]}
        />
      )}
      {!isLoading && !isSubjectsLoading && data.length === 0 && (
        <>
          <DashboardTaskList
            data={data}
            filterQuery=''
            category={subjects.filter((subject) => subject._id === id)[0]}
          />
        </>
      )}
    </div>
  )
}

export default ListOfSubject
