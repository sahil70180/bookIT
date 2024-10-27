import { NextRequest, NextResponse } from "next/server";
import Room from "@/backend/models/room";

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

export const getRoomDetails = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;

  const room = await Room.findById(id);

  if (!room) {
    return NextResponse.json(
      {
        success: false,
        message: "No Room Found with this id",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Room Details fetched successfully",
      room,
    },
    { status: 200 }
  );
};
