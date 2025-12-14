import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { signToken, setTokenInCookies } from "@/lib/auth/jwt";
import { logError } from "@/lib/logger/logger";
import { StatusCodes } from "http-status-codes";
import prisma from "@/lib/prisma";
import {
  userEmailRule,
  userPasswordRule,
} from "@/lib/validation/userValidationRules";
import {
  LOGIN_FAIL,
  LOGIN_FAIL_WITH_INVALID_CREDENTIALS,
  LOGIN_SUCCESS,
} from "@/lib/http/errorMessages";

const loginSchema = z.object({
  email: userEmailRule(),
  password: userPasswordRule(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { error: LOGIN_FAIL_WITH_INVALID_CREDENTIALS },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: LOGIN_FAIL_WITH_INVALID_CREDENTIALS },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    const token = await signToken({
      userId: user.id,
      email: user.email,
    });

    await setTokenInCookies(token);

    return NextResponse.json(
      {
        message: LOGIN_SUCCESS,
        user: {
          id: user.id,
          email: user.email,
        },
      },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: LOGIN_FAIL_WITH_INVALID_CREDENTIALS },
        { status: 400 }
      );
    }

    logError("Login error:", error);
    return NextResponse.json(
      { error: LOGIN_FAIL },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
