import React from "react"
import { PieChart } from "react-minimal-pie-chart"
function StatsTile({ title, total, completed, color }) {
  return (
    <div class='relative w-64  overflow-hidden rounded-lg bg-white dark:bg-slate-800 dark:text-slate-50 p-6 shadow-lg'>
      <div
        style={{
          backgroundColor: color,
        }}
        class='absolute left-0 right-0 top-0 flex h-10 items-center justify-center truncat text-white'
      >
        <p class='... w-3/4 truncate text-center text-lg'>{title}</p>
      </div>
      <div class='p-6 flex items-end gap-6 '>
        <p class='flex flex-col border-r-2 pr-4 '>
          <span class='text-6xl  font-semibold'>{total}</span> завдань
        </p>
        <p class='flex flex-col'>
          <span class='text-4xl  font-semibold'>
            {Math.round((completed / total) * 100) || 0}%
          </span>{" "}
          ефективності
        </p>
      </div>
    </div>
  )
}

export default StatsTile
