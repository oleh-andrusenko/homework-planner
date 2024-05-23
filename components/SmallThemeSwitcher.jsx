"use client"
import { useState, useEffect } from "react"
import { FaRegLightbulb, FaLightbulb } from "react-icons/fa"

function SmallThemeSwitcher() {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const prevTheme = window.localStorage.getItem("theme")
    if (prevTheme) setTheme(prevTheme)
  }, [])

  useEffect(() => {
    if (theme === "dark") {
     
      document.documentElement.classList.add("dark")
      window.localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      window.localStorage.setItem("theme", "light")
    }
  }, [theme])

  return (
    <button
      className='fixed text-2xl top-0 left-0 rotate-180 flex flex-col items-center px-2 z-30'
      onClick={() =>
        setTheme((prevTheme) => {
          if (prevTheme === "light") {
            return "dark"
          } else {
            return "light"
          }
        })
      }
    >
      <div>
        {theme === "light" && <FaLightbulb className='text-amber-500' />}
        {theme === "dark" && <FaRegLightbulb className='text-slate-50' />}
      </div>
      <div className='w-[3px] h-3 bg-black/85 dark:bg-slate-50'></div>
    </button>
  )
}

export default SmallThemeSwitcher
