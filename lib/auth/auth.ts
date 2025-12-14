import { getTokenFromCookies, verifyToken } from "./jwt";
import prisma from "@/lib/prisma";
import { logError } from "@/lib/logger/logger";
import { UNAUTHORIZED_ERROR } from "@/lib/auth/errorHandlers";

interface AuthUser {
  id: string;
  email: string;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const token = await getTokenFromCookies();
    if (!token) return null;

    const payload = await verifyToken(token);
    if (!payload) return null;

    // Verify user still exists in database
    return await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true },
    });
  } catch (error) {
    logError("Error getting current user: ", error);
    return null;
  }
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error(UNAUTHORIZED_ERROR);
  }
  return user;
}
