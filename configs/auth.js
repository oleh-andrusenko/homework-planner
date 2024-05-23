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
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      console.log("jwt callback", { token, user, session })
      if (trigger === "update" && session?.name) {
        token.name = session.name
        token.picture = session.image
      }

      if (user) {
        return {
          ...token,
          id: user.id,
          picture: user.image,
        }
      }
      const updatedUser = await User.findOneAndUpdate(
        { email: token.email },
        { name: token.name, image: token.picture }
      )

      console.log("RES", updatedUser)
      return token
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          image: token.picture,
          name: token.name,
        },
      }
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
}
