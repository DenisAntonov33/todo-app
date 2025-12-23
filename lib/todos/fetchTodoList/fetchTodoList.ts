import { apiRequest } from "@/lib/http/apiRequest";
import { Todo } from "@/app/generated/prisma/client";
import { TodoStatusFilter } from "@/lib/todos/types";
import { buildTodoSearchUrl } from "@/lib/todos/fetchTodoList/buildTodoSearchUrl";

export const fetchTodoList = async (
  status = TodoStatusFilter.ALL,
  titleQuery = ""
): Promise<Todo[]> => {
  const url = buildTodoSearchUrl(status, titleQuery);

  return apiRequest(url);
};
