import FocusLayout from "@/components/FocusLayout"
import NewSubject from "@/components/SubjectForm"

import React from "react"

async function getData(id) {
  const res = await fetch("http://localhost:3000/subjects/getSubject/" + id, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

async function EditSubjectPage({ params }) {
  const data = await getData(params.id)

  return (
    <FocusLayout title={"Редагування предмету"} id={data._id}>
      <NewSubject subj={data} />
    </FocusLayout>
  )
}

export default EditSubjectPage
