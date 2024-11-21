"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

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
      <Provider store={store}>
        <SessionProvider>{children}</SessionProvider>
      </Provider>
    </>
  );
}
