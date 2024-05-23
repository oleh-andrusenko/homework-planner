import { NextResponse } from "next/server"
import User from "@/(models)/User"

import { connectToDb } from "@/utils/db"

export async function GET(req) {
  try {
    await connectToDb()

    const email = req.url.split("/").reverse()[0]
    const findedUser = await User.findOne(
      { email: email },
      { password: 0, createdAt: 0, updatedAt: 0, __v: 0 }
    )

    if (findedUser) return NextResponse.json({ findedUser }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.toString() },
      { status: 500 }
    )
  }
}
