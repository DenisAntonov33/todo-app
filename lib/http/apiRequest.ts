import { StatusCodes } from "http-status-codes";
import { isPublicRoute } from "@/lib/auth/publicRoutes";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiRequest = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = await fetch(API_URL + url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === StatusCodes.UNAUTHORIZED && !isPublicRoute(url)) {
      // window.location.href = "/login";
    }

    const error = await response
      .json()
      .catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || "Request failed");
  }

  return response.json();
};
