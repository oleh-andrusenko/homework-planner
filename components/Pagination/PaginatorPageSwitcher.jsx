import React from "react"
import { GrPrevious, GrNext } from "react-icons/gr"
function PaginatorPageSwitcher({ pages, currentPage, setCurrentPage }) {
  function handlePrevPage() {
    setCurrentPage((curPage) => (curPage - 1 <= 0 ? 1 : curPage - 1))
  }

  function handleNextPage() {
    setCurrentPage((curPage) =>
      curPage + 1 > pages.length ? pages.length : curPage + 1
    )
  }

  return (
    <li className='flex mt-4'>
      <button
        className='w-8 text-lg h-8 border-2  rounded-full mx-2 flex items-center justify-center  bg-green-a border-green-a text-white disabled:bg-slate-500 disabled:border-gray-600 disabled:text-gray-300'
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <GrPrevious />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`w-8 text-lg h-8 border-2  border-green-a rounded-full mx-2  ${
            currentPage === page + 1
              ? " bg-green-a  text-white scale-125"
              : " bg-white dark:bg-slate-800  text-green-a"
          }`}
          onClick={() => setCurrentPage(page + 1)}
        >
          {page + 1}
        </button>
      ))}

      <button
        className='w-8 text-lg h-8 border-2  rounded-full mx-2 flex items-center justify-center  bg-green-a border-green-a text-white disabled:bg-slate-500 disabled:border-gray-600 disabled:text-gray-300'
        onClick={handleNextPage}
        disabled={currentPage === pages.length}
      >
        <GrNext />
      </button>
    </li>
  )
}

export default PaginatorPageSwitcher
