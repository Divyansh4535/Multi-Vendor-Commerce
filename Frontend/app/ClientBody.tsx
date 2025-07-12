"use client";
import { store } from "@/redux/store";
// import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

export function ClientBody({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      {/* <Toaster reverseOrder={false} position="top-right" /> */}
    </Provider>
  );
}
