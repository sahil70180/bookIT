import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import User from "../models/user";
import ErrorHandler from "../utils/ErrorHandler";

// register Route ==> /api/register
export const register = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();
  const { name, email, password } = body;

  const isUserAlreadyExist = await User.findOne({ email });

  if (isUserAlreadyExist) {
    throw new ErrorHandler("Duplicate Email Entered.", 400);
  }

  const user = await User.create({ name, email, password });

  return NextResponse.json(
    {
      success: true,
      message: "User Register Success",
    },
    { status: 200 }
  );
});
