import React from "react"
import { TiWarning } from "react-icons/ti"

function InputError({ error }) {
  return (
    <div className='absolute z-20 w-[300px] -right-80 top-0 border-2 border-red-400 px-2 py-1 bg-red-100 text-sm rounded-lg text-red-500 flex items-center  gap-2'>
      <TiWarning /> {error}
    </div>
  )
}

export default InputError
