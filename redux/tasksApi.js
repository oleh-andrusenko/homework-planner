import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  tagTypes: ["Tasks"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (build) => ({
    getTasks: build.query({
      query: (id) => `tasks/getTasks/${id}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Tasks", id })),
              { type: "Tasks", id: "LIST" },
            ]
          : [{ type: "Tasks", id: "LIST" }],
    }),
    getTaskById: build.query({
      query: (id) => `tasks/getTask/${id}`,
    }),
    addTask: build.mutation({
      query: (body) => ({
        url: "tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }, "Stats"],
    }),
    deleteTask: build.mutation({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }, "Stats"],
    }),
    checkTask: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `tasks/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }, "Stats"],
    }),
    updateTask: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `tasks/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
  }),
})

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useCheckTaskMutation,
} = tasksApi
