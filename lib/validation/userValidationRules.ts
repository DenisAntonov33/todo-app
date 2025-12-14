import { z } from "zod";

export const userEmailRule = () => z.email("Invalid email address");

export const userPasswordRule = () =>
  z.string().min(6, "Password must be at least 6 characters");
