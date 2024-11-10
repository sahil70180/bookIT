import { NextRequest, NextResponse } from "next/server";

type controllerFunction = (
  req: NextRequest,
  params: any
) => Promise<NextResponse>;

export const catchAsyncErrors =
  (controllerFunction: controllerFunction) =>
  async (req: NextRequest, params: any) => {
    try {
      return await controllerFunction(req, params);
    } catch (error: any) {
      console.log("Error : ", error?.name);
      // console error for modify the error messages

      //   1) like to update error message for invalid mongoose ID
      if (error?.name === "CastError") {
        error.message = `Resource not found. Invalid ${error?.path}`;
        error.statusCode = 400;
      }

      return NextResponse.json(
        {
          message: error?.message,
        },
        {
          status: error?.statusCode || 500,
        }
      );
    }
  };
