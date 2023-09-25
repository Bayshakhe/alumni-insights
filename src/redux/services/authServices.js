import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../helper/baseUrl";

export const authServices = createApi({
  reducerPath: "authServices",
  tagTypes: ["authServices"],
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    // post student register info
    postRegisterStudent: builder.mutation({
      query: (postBody) => ({
        url: "/register",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: postBody,
      }),
      invalidatesTags: ["authServices"],
    }),
    // find student for login info
    postLoginStudent: builder.mutation({
      query: (postBody) => ({
        url: "/login",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: postBody,
      }),
      invalidatesTags: ["authServices"],
    }),
  }),
});

export const {
  // useGetStudentsQuery,
  // useGetSingleStudentQuery,
  usePostRegisterStudentMutation,
  usePostLoginStudentMutation,
} = authServices;
