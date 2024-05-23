import FocusLayout from "@/components/FocusLayout"
import TaskForm from "@/components/TaskForm"
import React from "react"

async function getData(id) {
  const res = await fetch("http://localhost:3000/tasks/getTask/" + id, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

async function EditTaskPage({ params }) {
  const data = await getData(params.id)

  return (
    <FocusLayout title={"Редагування завдання"} id={data._id}>
      <TaskForm task={data} />
    </FocusLayout>
  )
}

export default EditTaskPage
