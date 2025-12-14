const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiRequest = async (url: string, options: ResponseInit = {}) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = await fetch(API_URL + url, {
    ...options,
    headers,
  });

  return response.json();
};
