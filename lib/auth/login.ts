import { apiRequest } from "@/lib/http/apiRequest";

interface LoginInput {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  user: {
    id: string;
    email: string;
  };
}

export const login = async (input: LoginInput): Promise<LoginResponse> => {
  return await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
};
