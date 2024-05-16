import React from "react"
import plannerImg from "@/public/planner.png"
import Image from "next/image"
function PlannerPage() {
  return (
    <div className="w-full flex flex-col justify-center items-center py-24">
      <Image src={plannerImg} alt='' className="w-[256px]"/>
      <h1 className="text-4xl text-green-a font-semibold">Сторінка знаходиться в розробці...</h1>
    </div>
  )
}

export default PlannerPage
