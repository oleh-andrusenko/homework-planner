"use client"
import React, { useState } from "react"
import FileUploader from "./FileUpload/FileUploader"
import { notifySuccess } from "@/utils/notification"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

function ProfileForm({ user }) {
  const [name, setName] = useState(user.name)
  const [profileAvatar, setProfileAvatar] = useState("")
  const { data: session, update } = useSession()
  const router = useRouter()
  async function handleUpdateUser() {
    await update({
      name: name,
      image: profileAvatar || "user.png",
    })
    notifySuccess("Дані оновлено!")
    router.replace("/dashboard/profile")
  }

  return (
    <>
      <h2 className='text-3xl text-green-a mb-2 font-semibold'>
        Редагування профілю
      </h2>
      <hr />
      <div className='w-[450px] mx-auto px-6 py-10 flex flex-col  gap-4 bg-white rounded-lg shadow-lg mt-24'>
        <div className='flex gap-4 justify-between'>
          <div className='flex flex-col gap-4'>
            <div className='w-full flex gap-2 items-center justify-between'>
              <label>Email</label>
              <input type='text' value={user.email} disabled />
            </div>
            <div className='w-full flex gap-2 items-center justify-between'>
              <label>Ім'я</label>
              <input
                type='text'
                value={name}
                className='py-1 px-3 rounded-lg border-2'
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <img
            src={"http://localhost:3000/userAvatars/" + user.image}
            className='w-20 h-20 rounded-full'
          />
        </div>
        <FileUploader setProfileAvatar={setProfileAvatar} />
        <p>{profileAvatar}</p>
        <div className='flex justify-end items-center gap-2'>
          <button
            className='px-2 py-1 rounded bg-green-a text-white'
            onClick={handleUpdateUser}
          >
            Зберегти
          </button>
          <button className='px-2 py-1 rounded bg-red-500 text-white'>
            Закрити
          </button>
        </div>{" "}
      </div>
    </>
  )
}

export default ProfileForm
