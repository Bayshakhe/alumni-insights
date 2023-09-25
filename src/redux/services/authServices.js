import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../helper/baseUrl";

export const authServices = createApi({
  reducerPath: "authServices",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    // getStudents: builder.query({
    //   query: () => "/students",
    // }),
    // // get single student data
    // getSingleStudent: builder.query({
    //   query: (id) => ({
    //     url: `/students/${id}`,
    //   }),
    // }),

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
    }),
  }),
});

export const {
  // useGetStudentsQuery,
  // useGetSingleStudentQuery,
  usePostRegisterStudentMutation,
  usePostLoginStudentMutation,
} = authServices;
