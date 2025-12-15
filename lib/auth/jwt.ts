import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

export const AUTH_COOKIE_NAME = "auth-token";
const secretKey = process.env.JWT_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

if (!secretKey) {
  throw new Error("Invalid JWT_SECRET");
}

export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export async function signToken(
  payload: Omit<JWTPayload, "iat" | "exp">
): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN || "7d")
    .sign(encodedKey);
}

export const verifyToken = async (
  token: string
): Promise<JWTPayload | null> => {
  try {
    const { payload } = await jwtVerify<JWTPayload>(token, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    // Log specific error for debugging
    if (error instanceof Error) {
      console.error("JWT verification failed:", error.message);
    } else {
      console.error("JWT verification failed:", error);
    }
    return null;
  }
};

export async function getTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  return token || null;
}

export async function setTokenInCookies(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function removeTokenFromCookies(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}
