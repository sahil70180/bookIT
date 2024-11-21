"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        theme="colored"
        // toastStyle={{ backgroundColor: "green" }}
        newestOnTop={true}
      />
      <SessionProvider>{children}</SessionProvider>
    </>
  );
}
