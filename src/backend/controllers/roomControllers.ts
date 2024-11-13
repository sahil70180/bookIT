import { NextRequest, NextResponse } from "next/server";
import Room, { IRoom } from "@/backend/models/room";
import ErrorHandler from "@/backend/utils/ErrorHandler";
import { catchAsyncErrors } from "@/backend/middlewares/catchAsyncErrors";
import ApiFilters from "../utils/apiFilters";

// get all rooms ==> /api/rooms
export const allRooms = catchAsyncErrors(async (req: NextRequest) => {
  // getting all the query Parameters from the url in Next js
  const { searchParams } = new URL(req.url);

  const queryStr: any = {};

  searchParams.forEach((value, key) => {
    queryStr[key] = value;
  });

  // creating the instance of class
  const apiFilters = new ApiFilters(Room, queryStr).search().filters(); // in query pass ROmm modal and queryStr pass the params

  const rooms: IRoom = await apiFilters.query;

  return NextResponse.json({
    success: "true",
    message: `Rooms fetched Successfully`,
    rooms,
  });
});

// create new room ==> /api/admin/room
export const newRoom = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();
  const room = await Room.create(body);

  return NextResponse.json({
    success: true,
    message: "Room Created Successfully",
    room,
  });
});

// get Single Room Details ==> /api/rooms/[id]
export const getRoomDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;

    const room = await Room.findById(id);

    if (!room) {
      throw new ErrorHandler("No Room Found with this id", 404);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Room Details fetched successfully",
        room,
      },
      { status: 200 }
    );
  }
);

// update room details ==> /api/admin/rooms/[id]
export const updateRoomDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;
    const body = await req?.json();

    // find room first
    let room = await Room.findById(id);

    if (!room) {
      throw new ErrorHandler("No Room Found with this id", 404);
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
  }
);

// delete room based on id ==> /api/admin/rooms/[id]

export const deleteRoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;

    // find room first
    let room = await Room.findById(id);

    if (!room) {
      throw new ErrorHandler("No Room Found with this id", 404);
    }

    // found then Delete room
    await Room.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Room Deleted Successfully",
      },
      { status: 200 }
    );
  }
);
