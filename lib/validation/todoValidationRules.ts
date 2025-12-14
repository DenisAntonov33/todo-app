import { z } from "zod";
import { TodoStatus } from "@/app/generated/prisma/enums";

export const todoTitleRule = () =>
  z.string().min(1, "Title is required").max(200, "Title is too long");

export const todoDescriptionRule = () =>
  z.string().max(1000, "Description is too long").optional();

export const todoStatusRule = () =>
  z.enum([TodoStatus.completed, TodoStatus.pending]);

export const todoOrderRule = () => z.string();
