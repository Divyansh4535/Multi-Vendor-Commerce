import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
