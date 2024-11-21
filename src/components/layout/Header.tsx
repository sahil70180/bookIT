"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

export default function Header() {
  const { data } = useSession();
  const user = data?.user;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    toast.success("Logout Successfully");
  };

  return (
    <nav className="navbar sticky-top py-2">
      <div className="container">
        <div className="col-6 col-lg-3 p-0">
          <div className="navbar-brand">
            <Link href="/">
              <img
                style={{ cursor: "pointer" }}
                src="/images/bookit_logo.png"
                alt="BookIT"
              />
            </Link>
          </div>
        </div>

        <div className="col-6 col-lg-3 mt-3 mt-md-0 text-end">
          {data?.user ? (
            <div className="ml-4 dropdown d-line">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src="/images/default_avatar.jpg"
                    alt="John Doe"
                    className="rounded-circle placeholder-glow"
                    height="50"
                    width="50"
                  />
                </figure>
                <span className="placeholder-glow ps-1">{user?.name}</span>
              </button>

              <div
                className="dropdown-menu w-100"
                aria-labelledby="dropdownMenuButton1"
              >
                <Link href="/admin/dashboard" className="dropdown-item">
                  Dashboard
                </Link>
                <Link href="/bookings/me" className="dropdown-item">
                  My Bookings
                </Link>
                <Link href="/me/update" className="dropdown-item">
                  Profile
                </Link>
                <Link
                  href="/"
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            data === null && (
              <Link
                href="/login"
                className="btn btn-danger px-4 text-white login-header-btn float-right"
              >
                Login
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
