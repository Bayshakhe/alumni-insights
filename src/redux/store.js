import { configureStore } from "@reduxjs/toolkit";
import { authServices } from "./services/authServices";
import { studentsService } from "./services/studentsService";
import { paymentService } from "./services/paymentService";
import { eventService } from "./services/eventService";

export const store = configureStore({
  reducer: {
    [authServices.reducerPath]: authServices.reducer,
    [studentsService.reducerPath]: studentsService.reducer,
    [paymentService.reducerPath]: paymentService.reducer,
    [eventService.reducerPath]: eventService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authServices.middleware,
      studentsService.middleware,
      paymentService.middleware,
      eventService.middleware
    ),
});
