import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../helper/baseUrl";

export const authServices = createApi({
  reducerPath: "authServices",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/students",
    }),
  }),
});
