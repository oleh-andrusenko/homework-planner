"use client"

import { FaList } from "react-icons/fa"

import TaskItem from "./TaskItem"
import NewTask from "./NewTask"
import { useState } from "react"
import SearchBar from "./SearchBar"
import NoTasks from "./NoTasks"
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
        <div className='flex gap-3 ml-2 items-end'>
          <div className='flex items-end py-2 px-4 gap-4 dark:text-slate-50'>
            <p>
              Всього завдань:&nbsp;
              <span className='text-green-a font-semibold text-xl'>
                {data.length}
              </span>
            </p>
            <p>
              Виконаних завдань: &nbsp;
              <span className='text-green-a font-semibold text-xl'>
                {data.reduce(
                  (acc, item) => (item.isDone ? (acc += 1) : acc),
                  0
                )}
              </span>
            </p>
          </div>
        </div>
      )}
      {filteredData.length > 0 && (
        <div className='w-full py-2 px-4'>
          <ul>
            {filteredData.map((item) => (
              <TaskItem task={item} key={item._id} />
            ))}
          </ul>
        </div>
      )}

      {filteredData.length === 0 && <NoTasks />}
    </div>
  )
}

export default DashboardTaskList
