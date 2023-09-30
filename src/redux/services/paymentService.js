import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../../helper/baseUrl";

export const paymentService = createApi({
  reducerPath: "paymentService",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getAllPayment: builder.query({
      query: () => ({
        url: "/allPayments",
      }),
    }),
    getStudentPayment: builder.query({
      query: (email) => ({
        url: `/payments/${email}`,
      }),
    }),
    createPayment: builder.mutation({
      query: (postBody) => ({
        url: "/create-payment-intent",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: postBody,
      }),
    }),
    givePayment: builder.mutation({
      query: (postBody) => ({
        url: "/payments",
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
  useGetAllPaymentQuery,
  useCreatePaymentMutation,
  useGetStudentPaymentQuery,
  useGivePaymentMutation,
} = paymentService;
