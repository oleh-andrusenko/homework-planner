import { ToastContainer } from "react-toastify"
import "./globals.css"

import "react-toastify/dist/ReactToastify.css"
import SmallThemeSwitcher from "@/components/SmallThemeSwitcher"
export const metadata = {
  title: "Homework Keeper",
  description: "Keep your homework in one place",
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        {children}
        <ToastContainer />
        <SmallThemeSwitcher />
      </body>
    </html>
  )
}
