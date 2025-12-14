import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/auth";
import {
  AUTHORIZATION_REQUIRED,
  USER_FETCH_FAILED,
} from "@/lib/http/errorMessages";
import { StatusCodes } from "http-status-codes";
import { logError } from "@/lib/logger/logger";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: AUTHORIZATION_REQUIRED },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    return NextResponse.json({ user }, { status: StatusCodes.UNAUTHORIZED });
  } catch (error) {
    logError("Get user error:", error);

    return NextResponse.json(
      { error: USER_FETCH_FAILED },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
