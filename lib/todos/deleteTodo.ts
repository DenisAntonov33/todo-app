import { apiRequest } from "@/lib/http/apiRequest";
import { TODO_ENDPOINT } from "@/lib/http/endpoints";
import { Todo } from "@/app/generated/prisma/browser";

export const deleteTodo = (id: string): Promise<Todo> => {
  return apiRequest(`${TODO_ENDPOINT}/${id}`, {
    method: "DELETE",
  });
};
