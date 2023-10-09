import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../../helper/baseUrl";

export const paymentService = createApi({
  reducerPath: "paymentService",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["paymentService"],
  endpoints: (builder) => ({
    getAllPayment: builder.query({
      query: () => ({
        url: "/allPayments",
      }),
      providesTags: ["paymentService"],
    }),
    getStudentPayment: builder.query({
      query: (email) => ({
        url: `/payments/${email}`,
      }),
      providesTags: ["paymentService"],
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
      invalidatesTags: ["paymentService"],
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
      invalidatesTags: ["paymentService"],
    }),
  }),
});

export const {
  useGetAllPaymentQuery,
  useCreatePaymentMutation,
  useGetStudentPaymentQuery,
  useGivePaymentMutation,
} = paymentService;
