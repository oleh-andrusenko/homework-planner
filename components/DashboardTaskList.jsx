"use client"

import { FaList } from "react-icons/fa"

import TaskItem from "./TaskItem"
function DashboardTaskList({ data, filterQuery, category }) {
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(filterQuery.toLowerCase())
  )
  return (
    <div className='w-full'>
      <div className='flex gap-3 ml-2 items-end'>
        {category && (
          <div
            className='text-2xl flex gap-2 items-center ml-2 py-2'
            style={{
              color: data[0].subject.color,
            }}
          >
            <FaList />
            <h4 className='text-2xl font-bold m-0'>{data[0].subject.name}</h4>
          </div>
        )}
        <div className='flex items-end py-2 px-4 gap-4'>
          <p>
            Всього завдань:{" "}
            <span className='text-green-a font-semibold text-xl'>
              {data.length}
            </span>
          </p>
          <p>
            Виконаних завдань: &nbsp;
            <span className='text-green-a font-semibold text-xl'>
              {data.reduce((acc, item) => (item.isDone ? (acc += 1) : acc), 0)}
            </span>
          </p>
        </div>
      </div>
      {filteredData.length > 0 && (
        <div className='w-full py-2 px-4'>
          <ul>
            {filteredData.map((item) => (
              <TaskItem task={item} />
            ))}
          </ul>
        </div>
      )}

      {filteredData.length === 0 && <p>Немає завдань :)</p>}
    </div>
  )
}

export default DashboardTaskList
