import { NextRequest, NextResponse } from "next/server";

export const allRooms = async (req: NextRequest) => {
  return NextResponse.json({
    data: "Test from Controllers (All Rooms)",
  });
};
