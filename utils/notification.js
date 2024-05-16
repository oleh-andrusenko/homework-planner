import { toast } from "react-toastify"

const options = {
  position: "top-center",
  autoClose: 1200,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "light",
}

export const notifySuccess = (text) => {
  toast.success(text, options)
}

export const notifyError = (text) => {
  toast.error(text, options)
}
