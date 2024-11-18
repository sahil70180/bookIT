"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { toast } from "react-toastify";
import { IRoom } from "@/backend/models/room";
import Image from "next/image";

const Rating = dynamic(() => import("../ui-elements/Rating"), { ssr: false });

interface Props {
  room: IRoom;
}

export default function RoomItem({ room }: Props) {
  const handleClick = () => {
    toast.success("clicked");
  };

  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3 d-flex">
      <div className="card p-2 w-100">
        <Image
          className="card-img-top mx-auto"
          src={
            room?.images?.length > 0
              ? room?.images[0].url
              : "images/default_room_image.jpg"
          }
          alt=""
          height="170"
          width="100"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link href={`/rooms/${room?._id}`}>{room?.name}</Link>
          </h5>
          <div className="mt-auto">
            <p className="card-text mt-2">
              <b>Rs. {room?.pricePerNight * 100}</b> / night
            </p>
          </div>
          <div>
            <div className="d-flex">
              <Rating rating={room?.ratings} />
              <span className="no-of-reviews">
                ({room?.numOfReviews} Reviews)
              </span>
            </div>
            <Link
              className="btn view-btn mt-3 w-100"
              href={`/rooms/${room?._id}`}
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
