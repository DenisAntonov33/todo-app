import { NextResponse } from "next/server";
import { removeTokenFromCookies } from "@/lib/auth/jwt";
import { logError } from "@/lib/logger/logger";
import { StatusCodes } from "http-status-codes";
import { LOGOUT_FAIL, LOGOUT_SUCCESS } from "@/lib/http/errorMessages";

export async function POST() {
  try {
    await removeTokenFromCookies();

    return NextResponse.json(
      { message: LOGOUT_SUCCESS },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    logError("Logout error: ", error);
    return NextResponse.json(
      { error: LOGOUT_FAIL },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
