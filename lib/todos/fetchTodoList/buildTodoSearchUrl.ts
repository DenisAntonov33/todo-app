import { TodoStatusFilter } from "@/lib/todos/types";
import { TODO_ENDPOINT } from "@/lib/http/endpoints";

export const buildTodoSearchUrl = (
  status = TodoStatusFilter.ALL,
  titleQuery = ""
): string => {
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

  return url;
};
