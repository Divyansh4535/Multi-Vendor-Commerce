"use client";

import { store } from "@/redux/store";
import { Toaster } from "sonner";
import { Provider } from "react-redux";

export function ClientBody({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <Toaster
        richColors
        expand
        visibleToasts={3}
        position="bottom-right"
        closeButton
      />
    </Provider>
  );
}
