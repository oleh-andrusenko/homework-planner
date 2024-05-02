import React from "react"
import { FaSearch } from "react-icons/fa"
function SearchBar({ filter, setFilter }) {
  return (
    <div className='sticky top-0 left-0 z-10 w-full shadow-lg flex justify-end items-center bg-white rounded-xl mb-8 py-4 px-2'>
      <FaSearch className='absolute left-4 top-6 text-gray-600' />
      <input
        type='text'
        value={filter}
        placeholder="Шукати завдання..."
        onChange={(e) => setFilter(e.target.value)}
        className='w-full border-[1px] border-gray-200 p-1 pl-8 rounded-lg focus:outline-none focus:border-[1px] focus:border-gray-500'
      />
    </div>
  )
}

export default SearchBar
