// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { baseUrl } from "../../helper/baseUrl";

// export const studentsService = createApi({
//   reducerPath: "authServices",
//   baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
//   endpoints: (builder) => ({
//     getStudents: builder.query({
//       query: () => "/alumniStudents",
//     }),
//     // get single student data
//     getSingleStudent: builder.query({
//       query: (id) => ({
//         url: `/students/${id}`,
//       }),
//     }),
//   }),
// });

// export const { useGetStudentsQuery, useGetSingleStudentQuery } =
//   studentsService;
