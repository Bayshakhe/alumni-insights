import { configureStore } from "@reduxjs/toolkit";
import { authServices } from "./services/authServices";

export const store = configureStore({
  reducer: {
    [authServices.reducerPath]: authServices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authServices.middleware),
});
