import React from "react";
import RoomItem from "./room/RoomItem";
import { IRoom } from "@/backend/models/room";
import CustomPagination from "./layout/CustomPagination";

interface Props {
  data: {
    message: string;
    success: boolean;
    roomCount: number;
    filteredRoomCount: number;
    resPerPage: number;
    rooms: IRoom[];
  };
}
export default function Home({ data }: Props) {
  const { rooms, resPerPage, filteredRoomCount } = data;

  return (
    <div>
      <section id="rooms" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">All Rooms</h2>
        <a href="/search" className="ml-2 back-to-search">
          <i className="fa fa-arrow-left"></i> Back to Search
        </a>
        <div className="row mt-4">
          {rooms?.length === 0 ? (
            <div className="alert alert-danger mt-5 w-100">
              <p>No Rooms Found</p>
            </div>
          ) : (
            rooms?.map((room, index) => <RoomItem key={index} room={room} />)
          )}
        </div>
      </section>

      {/* pagination  */}
      <CustomPagination resPerPage={resPerPage} filteredRoomCount={filteredRoomCount}/>
    </div>
  );
}
