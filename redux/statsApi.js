import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const statsApi = createApi({
  reducerPath: "statsApi",
  tagTypes: ["Stats"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (build) => ({
    getStats: build.query({
      query: (email) => `stats/${email}`,
      providesTags: ["Stats"],
    }),
  }),
})

export const { useGetStatsQuery } = statsApi
