"use client"
import Image from "next/image"
import errorImg from "../public/error.svg"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { IoReload } from "react-icons/io5"

export const metadata = {
  title: "Error!",
}

function ErrorPage({ error }) {
  const router = useRouter()
  return (
    <div className='py-10 px-8 absolute w-screen h-screen top-0 left-0 bg-white z-20 flex flex-col items-center justify-between'>
      <h1 className='text-7xl font-bold mb-6'>Error occured!!</h1>
      <p>{error.message}</p>
      <Image src={errorImg} className='w-[600px]' />
      <Link
        href='/dashboard'
        className=' py-2 px-4 rounded-lg bg-green-a text-white'
      >
        До панелі завдань
      </Link>
      <button
        className='flex gap-2  items-center py-2 px-4 rounded-lg bg-amber-600 text-white'
        onClick={() => router.refresh()}
      >
        <IoReload /> Оновити
      </button>
    </div>
  )
}

export default ErrorPage
