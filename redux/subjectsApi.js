import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const subjectsApi = createApi({
  reducerPath: "subjectsApi",
  tagTypes: ["Subjects"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (build) => ({
    getSubjects: build.query({
      query: (id) => `subjects/${id}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Subjects", id })),
              { type: "Subjects", id: "LIST" },
            ]
          : [{ type: "Subjects", id: "LIST" }],
    }),
    addSubject: build.mutation({
      query: (body) => ({
        url: "subjects",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Subjects", id: "LIST" }],
    }),
    deleteSubject: build.mutation({
      query: (id) => ({
        url: `subjects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "Subjects", id: "LIST" },
        { type: "Tasks", id: "LIST" },
      ],
    }),
  }),
})

export const {
  useGetSubjectsQuery,
  useAddSubjectMutation,
  useDeleteSubjectMutation,
} = subjectsApi
