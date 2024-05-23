"use client"
import { useState } from "react"
import axios from "axios"
import { FaUpload, FaWindowClose } from "react-icons/fa"
import { FaPhotoFilm } from "react-icons/fa6"
import { notifyError, notifySuccess } from "@/utils/notification"
function FileUploader({ setProfileAvatar }) {
  const [uploading, setUploading] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")
  const [selectedFile, setSelectedFile] = useState()

  const handleFileUpload = async () => {
    setUploading(true)
    try {
      if (!selectedFile) return
      const formData = new FormData()
      formData.append("avatar", selectedFile)
      const { data } = await axios.post(
        "http://localhost:3000/files/",
        formData
      )
      console.log(data)
      if (data.code === 200) {
        setIsUploaded(true)
        setProfileAvatar(data.fileName)
        notifySuccess("Зображення збережене!")
      }
    } catch (error) {
      console.error(error)
    }
    setUploading(false)
  }

  return (
    <form className='flex items-center gap-4'>
      <label>
        <input
          type='file'
          name='avatar'
          hidden
          onChange={({ target }) => {
            if (target.files) {
              const file = target.files[0]
              setSelectedImage(URL.createObjectURL(file))
              setSelectedFile(file)
            }
          }}
        />
        <div className='w-16 h-16 rounded-full overflow-hidden flex items-center justify-center border-2 border-dashed cursor-pointer'>
          {selectedImage ? (
            <img src={selectedImage} />
          ) : (
            <span className='text-3xl text-slate-500'>
              <FaPhotoFilm />
            </span>
          )}
        </div>
      </label>
      {!isUploaded && (
        <button
          disabled={uploading}
          className='px-2 py-1 bg-green-a rounded disabled:bg-teal-300 text-white flex items-center gap-2'
          onClick={handleFileUpload}
        >
          <FaUpload /> Завантажити
        </button>
      )}
      {isUploaded && (
        <button
          className='px-2 py-1 bg-red-500 rounded disabled:bg-teal-300 text-white flex items-center gap-2'
          onClick={(e) => {
            e.preventDefault()
            setSelectedFile("")
            setSelectedImage("")
            setIsUploaded(false)
            setProfileAvatar('')
            notifyError('Зображення очищене!')
          }}
        >
          <FaWindowClose /> Очистити
        </button>
      )}
    </form>
  )
}

export default FileUploader
