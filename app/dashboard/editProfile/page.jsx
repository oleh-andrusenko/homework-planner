import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authConfig } from "@/configs/auth"
import ProfileForm from "@/components/ProfileForm"
async function EditProfilePage() {
  const session = await getServerSession(authConfig)
  
  if (!session) redirect("/login", "replace")
  const userData = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  }
  return <div>{session && <ProfileForm user={userData} />}</div>
}

export default EditProfilePage
