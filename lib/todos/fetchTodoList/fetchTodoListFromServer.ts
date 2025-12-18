import { Todo } from "@/app/generated/prisma/client";
import { TodoStatusFilter } from "@/lib/todos/types";
import { apiRequestServer } from "@/lib/http/apiRequestServer";
import { buildTodoSearchUrl } from "@/lib/todos/fetchTodoList/buildTodoSearchUrl";

export const fetchTodoListFromServer = async (
  status = TodoStatusFilter.ALL,
  titleQuery = ""
): Promise<Todo[]> => {
  const url = buildTodoSearchUrl(status, titleQuery);

  return apiRequestServer(url);
};
