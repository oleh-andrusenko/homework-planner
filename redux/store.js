import { configureStore } from "@reduxjs/toolkit"
import { subjectsApi } from "./subjectsApi"
import { tasksApi } from "./tasksApi"
import { statsApi } from "./statsApi"
export const store = configureStore({
  reducer: {
    [subjectsApi.reducerPath]: subjectsApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      subjectsApi.middleware,
      tasksApi.middleware,
      statsApi.middleware
    ),
})
