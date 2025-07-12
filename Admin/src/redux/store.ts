import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "@/redux/reducer/SidebarReducer";
import userSlice from "@/redux/reducer/UserReducer";

export const store = configureStore({
  reducer: {
    sidebar: sidebarSlice,
    user:userSlice
  },
});

// ✅ Define RootState and AppDispatch types here
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
