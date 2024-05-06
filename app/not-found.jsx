import Image from "next/image"
import notFoundImg from "../public/not-found.svg"
import Link from "next/link"

export const metadata = {
  title: "Page not found!",
}

function Page404() {
  return (
    <div className='py-10 px-8 absolute w-screen h-screen top-0 left-0 bg-white z-20 flex flex-col items-center justify-between'>
      <h1 className="text-7xl font-bold mb-6">Page not found!</h1>
      <Image src={notFoundImg} className="w-[600px]"/>
      <Link href='/dashboard' className=" py-2 px-4 rounded-lg bg-green-a text-white">Back to dashboard</Link>
    </div>
  )
}

export default Page404
