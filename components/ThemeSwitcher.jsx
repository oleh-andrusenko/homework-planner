import React, { useState } from "react"
import { FaMoon, FaSun } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
function ThemeSwitcher() {
  const [theme, setTheme] = useState("light")

  return (
    <button
      className='absolute top-4 right-4 w-12 h-48 flex flex-col justify-between'
      onClick={() => {
        setTheme((prevTheme) => {
          if (prevTheme === "light") {
            document.documentElement.classList.add("dark")
            return "dark"
          } else {
            document.documentElement.classList.remove("dark")
            return "light"
          }
        })
      }}
    >
      <AnimatePresence>
        {theme === "dark" && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1, scale: [1, 1.2, 1] }}
            exit={{ opacity: 0 }}
          >
            <FaMoon className='text-5xl text-amber-300' />
          </motion.div>
        )}

        {theme === "light" && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1, scale: [1, 1.1, 1], rotate: 90 }}
            exit={{ opacity: 0, scale: 0.7 }}
          >
            <FaSun className='text-5xl text-amber-300' />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

export default ThemeSwitcher
