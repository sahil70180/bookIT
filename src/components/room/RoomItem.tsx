"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { toast } from "react-toastify";

const Rating = dynamic(() => import("../ui-elements/Rating"), { ssr: false });

export default function RoomItem() {
  const handleClick = () => {
    toast.success("clicked");
  };
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3 d-flex">
      <div className="card p-2 w-100">
        <img
          className="card-img-top mx-auto"
          src="images/default_room_image.jpg"
          alt=""
          height="170"
          width="100"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <a href="/rooms/roomId">Room Name</a>
          </h5>
          <div className="mt-auto">
            <p className="card-text mt-2">
              <b>$100</b> / night
            </p>
          </div>
          <div>
            <div className="d-flex">
              <Rating />
              <span className="no-of-reviews">(50 Reviews)</span>
            </div>
            <Link
              className="btn view-btn mt-3 w-100"
              href="/"
              onClick={() => handleClick()}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
