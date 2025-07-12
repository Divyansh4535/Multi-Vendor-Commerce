import "./globals.css";
import type { Metadata } from "next";
import { ClientBody } from "./ClientBody";
import { ThemeProvider } from "@/Components/theme-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin panel built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientBody>{children}</ClientBody>
          <Toaster
            richColors
            expand
            visibleToasts={3}
            position="bottom-right"
            closeButton
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
