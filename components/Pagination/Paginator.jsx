import { useState } from "react"
import PaginatorPageSwitcher from "./PaginatorPageSwitcher"
import PaginatorParamsSwitcher from "./PaginatorParamsSwitcher"
import TaskItem from "../TaskItem"

function Paginator({ data }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(10)
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage
  const filteredData = data.slice(firstIndex, lastIndex)
  const pages = [...Array(Math.ceil(data.length / recordsPerPage)).keys()]

  return (
    <div className="">
      {filteredData.length !== 0 && (
        <ul className='flex h-90 py-4  flex-col  justify-center items-center'>
          <div className="w-full flex justify-between items-center">
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
            <PaginatorParamsSwitcher
              recordsPerPage={recordsPerPage}
              setRecordsPerPage={setRecordsPerPage}
            />
          </div>

          {filteredData.map((item) => (
            <TaskItem task={item} key={item._id} />
          ))}
          <PaginatorPageSwitcher
            pages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </ul>
      )}
    </div>
  )
}

export default Paginator
