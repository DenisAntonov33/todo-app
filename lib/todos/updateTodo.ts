import { apiRequest } from "@/lib/http/apiRequest";
import { TODO_ENDPOINT } from "@/lib/http/endpoints";
import { Todo } from "@/app/generated/prisma/browser";

export const updateTodo = (todo: Todo): Promise<Todo> => {
  return apiRequest(`${TODO_ENDPOINT}/${todo.id}`, {
    method: "PUT",
    body: JSON.stringify(todo),
  });
};
