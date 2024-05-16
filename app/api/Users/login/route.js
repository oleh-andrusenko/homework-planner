import { NextResponse } from "next/server"
import User from "@/(models)/User"
import bcrypt from "bcrypt"
import { connectToDb } from "@/utils/db"

export async function POST(req) {
  try {
    await connectToDb()
    const body = await req.json()
    const { email, password } = body
    const findedUser = await User.findOne({ email: email })

    if (findedUser) {
      const checkPasswords = await bcrypt.compare(password, findedUser.password)
      if (checkPasswords) {
        findedUser.password = undefined
        return NextResponse.json(
          {
            message: "Successfully logged in",
            user: findedUser,
          },
          { status: 200 }
        )
      } else
        return NextResponse.json(
          { message: "Wrong credentials!" },
          { status: 300 }
        )
    } else
      return NextResponse.json({ message: "User not found" }, { status: 300 })
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: error.toString() },
      { status: 500 }
    )
  }
}
