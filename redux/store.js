import { configureStore } from "@reduxjs/toolkit"
import { subjectsApi } from "./subjectsApi"
import { tasksApi } from "./tasksApi"
export const store = configureStore({
  reducer: {
    [subjectsApi.reducerPath]: subjectsApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(subjectsApi.middleware, tasksApi.middleware),
})
