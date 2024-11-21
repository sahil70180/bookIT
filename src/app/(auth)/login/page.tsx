import Login from "@/components/auth/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login || BookIT",
  description: "Login, NextAuth, Authentication",
};

export default function LoginPage() {
  return <Login />;
}
