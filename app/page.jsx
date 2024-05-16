import AuthForm from "@/components/AuthForm"
import { authConfig } from "@/configs/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"


export default async function Home() {
  
  const session = await getServerSession(authConfig)
  if (session) redirect("/dashboard", "replace")
  return <div className='w-screen'>{!session && <AuthForm />}</div>
}
