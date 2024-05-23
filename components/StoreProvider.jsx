"use client"
import { Provider } from "react-redux"
import { SessionProvider } from "next-auth/react"
import { store } from "@/redux/store"
function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      <SessionProvider refetchOnWindowFocus={true}>{children}</SessionProvider>
    </Provider>
  )
}

export default StoreProvider
