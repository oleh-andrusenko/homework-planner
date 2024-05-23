import React from "react"

function FocusLayout({ children, title, id }) {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-white dark:bg-slate-700 z-20 flex items-center justify-center'>
      <div className='w-1/2 bg-white dark:bg-slate-900 border-2 dark:border-none rounded-lg shadow-lg p-4'>
        <h3 className='text-xl text-green-a font-semibold'>{title}</h3>
        <p className='text-[10px] text-slate-600'>{id}</p>
        {children}
      </div>
    </div>
  )
}

export default FocusLayout
