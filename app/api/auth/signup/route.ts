import {
  userEmailRule,
  userPasswordRule,
} from "@/lib/validation/userValidationRules";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { setTokenInCookies, signToken } from "@/lib/auth/jwt";
import {
  CREATE_ACCOUNT_FAIL,
  CREATE_ACCOUNT_FAIL_WITH_INVALID_INPUT,
  CREATE_ACCOUNT_FAIL_WITH_NON_UNIQUE_EMAIL,
  CREATE_ACCOUNT_SUCCESS,
} from "@/lib/http/errorMessages";
import { logError } from "@/lib/logger/logger";

const signupSchema = z.object({
  email: userEmailRule(),
  password: userPasswordRule(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = signupSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: CREATE_ACCOUNT_FAIL_WITH_NON_UNIQUE_EMAIL,
        },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = await signToken({
      userId: user.id,
      email: user.email,
    });

    // Set token in HTTP-only cookie
    await setTokenInCookies(token);

    return NextResponse.json(
      {
        message: CREATE_ACCOUNT_SUCCESS,
        user: {
          id: user.id,
          email: user.email,
        },
      },
      { status: StatusCodes.CREATED }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: CREATE_ACCOUNT_FAIL_WITH_INVALID_INPUT },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    logError("Signup error: ", error);
    return NextResponse.json(
      { error: CREATE_ACCOUNT_FAIL },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
