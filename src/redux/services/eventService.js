import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseUrl } from "../../helper/baseUrl";

export const eventService = createApi({
  reducerPath: "eventService",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["eventService"],
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
    addEvent: builder.mutation({
      query: (postBody) => ({
        url: "/upcoming-events",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: postBody,
      }),
      providesTags: ["eventService"],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/upcoming-events/${id}`,
        method: "Delete",
      }),
    }),
  }),
});

export const {
  useGetUpcomingEventsQuery,
  useGetSingleUpcomingEventQuery,
  useAddEventMutation,
  useDeleteEventMutation,
} = eventService;
