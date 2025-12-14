import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { AUTHORIZATION_REQUIRED } from "@/lib/http/errorMessages";

export const UNAUTHORIZED_ERROR = "Unauthorized";

export const isAuthError = (error: unknown) =>
  error instanceof Error && error.message === UNAUTHORIZED_ERROR;

export const returnUnauthorizedError = () =>
  NextResponse.json(
    { error: AUTHORIZATION_REQUIRED },
    { status: StatusCodes.UNAUTHORIZED }
  );
