"use client";

import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
      },
    },
  });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#fefefe]">
        <QueryClientProvider client={queryClient}>
          {children}
          <ToastContainer position="top-center" autoClose={3000} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
