"use client"

import React from "react"
import loadingImg from "../public/loading.svg"
import Image from "next/image"
function Loader() {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-50 bg-white dark:bg-slate-800 dark:text-slate-50 flex flex-col justify-center items-center'>
      <Image src={loadingImg} alt='' className="w-64" />
      <p className="text-green-a animate-pulse">Завантаження...</p>
      <div className='loader'></div>
    </div>
  )
}

export default Loader
