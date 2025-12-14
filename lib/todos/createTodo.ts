import { apiRequest } from "@/lib/http/apiRequest";
import { TODO_ENDPOINT } from "@/lib/http/endpoints";
import { Todo } from "@/app/generated/prisma/browser";
import { CreateTodoInput } from "@/lib/todos/types";

export const createTodo = (todo: CreateTodoInput): Promise<Todo> => {
  return apiRequest(TODO_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(todo),
  });
};
