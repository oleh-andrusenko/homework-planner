import React from "react"

function PaginatorParamsSwitcher({ recordsPerPage, setRecordsPerPage }) {
  return (
    <li className='flex items-center gap-1 dark:text-slate-50'>
      Записів на сторінці:
      <button
        className={`w-12 text-lg h-8 border-2  rounded-full mx-2 flex items-center justify-center   border-green-a  ${
          recordsPerPage === 10
            ? "bg-green-a text-white"
            : "bg-white dark:bg-slate-800  text-green-a"
        }`}
        onClick={() => setRecordsPerPage(10)}
      >
        10
      </button>
      <button
        className={`w-12 text-lg h-8 border-2  rounded-full mx-2 flex items-center justify-center   border-green-a  ${
          recordsPerPage === 20
            ? "bg-green-a text-white"
            : "bg-white dark:bg-slate-800  text-green-a"
        }`}
        onClick={() => setRecordsPerPage(20)}
      >
        20
      </button>
      <button
        className={`w-12 text-lg h-8 border-2  rounded-full mx-2 flex items-center justify-center   border-green-a  ${
          recordsPerPage === 50
            ? "bg-green-a text-white"
            : "bg-white dark:bg-slate-800  text-green-a"
        }`}
        onClick={() => setRecordsPerPage(50)}
      >
        50
      </button>
    </li>
  )
}

export default PaginatorParamsSwitcher
