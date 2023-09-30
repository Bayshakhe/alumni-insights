import { configureStore } from "@reduxjs/toolkit";
import { authServices } from "./services/authServices";
import { studentsService } from "./services/studentsService";
import { paymentService } from "./services/paymentService";

export const store = configureStore({
  reducer: {
    [authServices.reducerPath]: authServices.reducer,
    [studentsService.reducerPath]: studentsService.reducer,
    [paymentService.reducerPath]: paymentService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authServices.middleware,
      studentsService.middleware,
      paymentService.middleware
    ),
});
