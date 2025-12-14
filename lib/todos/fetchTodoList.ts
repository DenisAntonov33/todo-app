import { apiRequest } from "@/lib/http/apiRequest";
import { Todo } from "@/app/generated/prisma/client";
import { TODO_ENDPOINT } from "@/lib/http/endpoints";

export const fetchTodoList = async (): Promise<Todo[]> => {
  return apiRequest(TODO_ENDPOINT);
};
