import Dashboard from "@/components/Dashboard"
import Loader from "@/components/Loader"
import { authConfig } from "@/configs/auth"
import { getServerSession } from "next-auth"

async function DashboardPage() {
  const session = await getServerSession(authConfig)

  return <Dashboard />
}

export default DashboardPage
