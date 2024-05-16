import User from "@/(models)/User"
import { connectToDb } from "@/utils/db"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDb()

        const user = await User.findOne({ email: credentials.email })

        if (!user) return null

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!passwordsMatch) return null
        
        return user
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
}
