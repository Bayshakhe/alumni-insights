import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../helper/baseUrl";

export const studentsService = createApi({
  reducerPath: "studentsService",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    // get all alumni students
    getAlumniStudents: builder.query({
      query: () => "/alumniStudents",
    }),
    // get all students
    getAllStudents: builder.query({
      query: () => "/allStudents",
    }),
    // get single student data
    getSingleStudent: builder.query({
      query: (id) => ({
        url: `/students/${id}`,
      }),
    }),
    // update students
    updateStudent: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `/updateProfile/${_id}`,
        method: "PUT",
        body: data,
      }),
    }),
    // make admin
    makeAdmin: builder.mutation({
      query: (id) => ({
        url: `/makeAdmin/${id}`,
        method: "PUT",
      }),
    }),
    // remove admin
    removeAdmin: builder.mutation({
      query: (id) => ({
        url: `/removeAdmin/${id}`,
        method: "PUT",
      }),
    }),
    // delete students
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/allStudents/${id}`,
        method: "Delete",
      }),
    }),
  }),
});

export const {
  useGetAlumniStudentsQuery,
  useGetAllStudentsQuery,
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useMakeAdminMutation,
  useRemoveAdminMutation,
} = studentsService;
