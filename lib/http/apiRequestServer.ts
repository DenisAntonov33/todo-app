import { cookies } from "next/headers";
import { logError } from "@/lib/logger/logger";

const BASE_URL = process.env.BASE_URL;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL || !BASE_URL) {
  throw new Error("No BASE_URL or API_URL provided");
}

// Server-side version
export const apiRequestServer = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const cookieStore = await cookies();

  const authCookie = cookieStore.get("auth-token");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  // Forward auth cookie
  if (authCookie) {
    headers.append("Cookie", `${authCookie.name}=${authCookie.value}`);
  }

  const response = await fetch(BASE_URL + API_URL + url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Request failed" }));
    logError("server fetching error ==> ", error);
    throw new Error(error.error || "Request failed");
  }

  return response.json();
};
