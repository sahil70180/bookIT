import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room";

export const allRooms = async (req: NextRequest) => {
  const data = await Room.find();

  return NextResponse.json({
    success: "true",
    message: "All Rooms fetched Successfully",
    data,
  });
};

export const newRoom = async (req: NextRequest) => {
  const body = await req.json();
  const room = await Room.create(body);

  return NextResponse.json({
    success: true,
    message: "Room Created Successfully",
    room,
  });
};
