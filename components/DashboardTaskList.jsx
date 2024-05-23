"use client"

import { FaList } from "react-icons/fa"

import TaskItem from "./TaskItem"
import NewTask from "./NewTask"
import { useState } from "react"
import SearchBar from "./SearchBar"
import NoTasks from "./NoTasks"
import Paginator from "./Pagination/Paginator"
function DashboardTaskList({ data, category }) {
  const [filter, setFilter] = useState("")

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className='w-full'>
      {category && (
        <div
          className='text-2xl flex gap-2 items-center ml-2 py-2'
          style={{
            color: category.color,
          }}
        >
          <FaList />
          <h4 className='text-2xl font-bold m-0'>{category.name}</h4>
        </div>
      )}
      {data.length > 0 && <SearchBar filter={filter} setFilter={setFilter} />}
      <NewTask />

      {filteredData.length > 0 && (
        <div className='w-full py-2 px-4'>
          <ul>
            <Paginator data={filteredData} />
          </ul>
        </div>
      )}

      {filteredData.length === 0 && <NoTasks />}
    </div>
  )
}

export default DashboardTaskList
