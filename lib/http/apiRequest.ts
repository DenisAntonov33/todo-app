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
    const error = await response
      .json()
      .catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || "Request failed");
  }

  return response.json();
};
