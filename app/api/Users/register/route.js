import { NextResponse } from "next/server"
import User from "@/(models)/User"
import bcrypt from "bcrypt"
import { connectToDb } from "@/utils/db"
export async function POST(req) {
  try {
    await connectToDb()
    const body = await req.json()
    const userData = body.user
    const findedUser = await User.findOne({ email: userData.email })

    if (findedUser) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        { status: 300 }
      )
    }

    const hashedPassword = await bcrypt.hash(userData.password, 12)
    await User.create({ ...userData, password: hashedPassword })
    return NextResponse.json({ message: "User created" }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.toString() },
      { status: 500 }
    )
  }
}
