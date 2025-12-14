import { apiRequest } from "@/lib/http/apiRequest";

interface SignupInput {
  email: string;
  password: string;
}

interface SignupResponse {
  message: string;
  user: {
    id: string;
    email: string;
  };
}

export const signup = async (input: SignupInput): Promise<SignupResponse> => {
  return await apiRequest("/auth/signup", {
    method: "POST",
    body: JSON.stringify(input),
  });
};
