import { configureStore } from "@reduxjs/toolkit";
import { authServices } from "./services/authServices";
import { studentsService } from "./services/studentsService";

export const store = configureStore({
  reducer: {
    [authServices.reducerPath]: authServices.reducer,
    [studentsService.reducerPath]: studentsService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authServices.middleware,
      studentsService.middleware
    ),
});
