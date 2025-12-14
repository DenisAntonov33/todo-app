import { apiRequest } from "@/lib/http/apiRequest";
import { Todo } from "@/app/generated/prisma/client";
import { TODO_ENDPOINT } from "@/lib/http/endpoints";
import { TodoStatusFilter } from "@/lib/todos/types";

export const fetchTodoList = async (
  status = TodoStatusFilter.ALL,
  titleQuery = ""
): Promise<Todo[]> => {
  const queryParams = new URLSearchParams();

  if (status !== TodoStatusFilter.ALL) {
    queryParams.set("status", status);
  }

  if (titleQuery !== "") {
    queryParams.set("title", titleQuery);
  }

  const queryString = queryParams.toString();
  let url = TODO_ENDPOINT;

  if (queryString) {
    url = `${TODO_ENDPOINT}?${queryString}`;
  }

  return apiRequest(url);
};
