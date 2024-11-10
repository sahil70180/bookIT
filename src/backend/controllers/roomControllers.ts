import { NextRequest, NextResponse } from "next/server";
import Room from "@/backend/models/room";
import ErrorHandler from "../utils/ErrorHandler";

// get all rooms ==> /api/rooms
export const allRooms = async (req: NextRequest) => {
  try {
    const data = await Room.find();

    throw new ErrorHandler("No Found", 404);

    return NextResponse.json({
      success: "true",
      message: "All Rooms fetched Successfully",
      data,
    });
  } catch (error: any) {
    // console.log(error);
    return NextResponse.json(
      {
        success: "true",
        message: error?.message,
      },
      {
        status: error?.statusCode,
      }
    );
  }
};

// create new room ==> /api/admin/room
export const newRoom = async (req: NextRequest) => {
  const body = await req.json();
  const room = await Room.create(body);

  return NextResponse.json({
    success: true,
    message: "Room Created Successfully",
    room,
  });
};

// get Single Room Details ==> /api/rooms/[id]
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

// update room details ==> /api/admin/rooms/[id]
export const updateRoomDetails = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;
  const body = await req?.json();

  // find room first
  let room = await Room.findById(id);

  if (!room) {
    return NextResponse.json(
      {
        success: false,
        message: "No Room Found with this id",
      },
      { status: 404 }
    );
  }

  // found then update room
  room = await Room.findByIdAndUpdate(id, body, { new: true }); // new : true means it will return the room with update details

  return NextResponse.json(
    {
      success: true,
      message: "Room Details Updated successfully",
      room,
    },
    { status: 200 }
  );
};

// delete room based on id ==> /api/admin/rooms/[id]

export const deleteRoom = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;

  // find room first
  let room = await Room.findById(id);

  if (!room) {
    return NextResponse.json(
      {
        success: false,
        message: "No Room Found with this id",
      },
      { status: 404 }
    );
  }

  // found then update room
  await Room.findByIdAndDelete(id);

  return NextResponse.json(
    {
      success: true,
      message: "Room Deleted Successfully",
    },
    { status: 200 }
  );
};
