import { NextResponse } from "next/server"
import User from "@/(models)/User"

import { connectToDb } from "@/utils/db"

export async function PUT(req) {
  try {
    await connectToDb()
    const body = await req.json()
    const { email, data } = body
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { ...data }
    )

    return NextResponse.json({ updatedUser, code: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Error", error: error.toString() },
      { status: 500 }
    )
  }
}
