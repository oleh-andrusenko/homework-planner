import React from "react"

export async function generateMetadata({ params }) {
  const id = params.id
  const res = await fetch("http://localhost:3000/subjects/getSubject/" + id)
  console.log(res)
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  const { name } = await res.json()
  return {
    title: "Список завдань " + name,
    description: "Список завдань " + name,
  }
}

function ListLayout({ children }) {
  return <>{children}</>
}

export default ListLayout
