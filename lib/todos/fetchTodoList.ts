import { apiRequest } from "@/lib/http/apiRequest";
import { Todo } from "@/app/generated/prisma/client";

export const fetchTodoList = async (): Promise<Todo[]> => {
  return apiRequest("/todos");
};
