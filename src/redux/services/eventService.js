import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../../helper/baseUrl";

export const eventService = createApi({
  reducerPath: "eventService",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    // get all upcoming events
    getUpcomingEvents: builder.query({
      query: () => ({
        url: "/upcoming-events",
      }),
    }),
    // get events by id
    getSingleUpcomingEvent: builder.query({
      query: (id) => ({
        url: `/upcoming-events/${id}`,
      }),
    }),
    // createPayment: builder.mutation({
    //   query: (postBody) => ({
    //     url: "/create-payment-intent",
    //     method: "POST",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     body: postBody,
    //   }),
    // }),
  }),
});

export const { useGetUpcomingEventsQuery, useGetSingleUpcomingEventQuery } =
  eventService;
