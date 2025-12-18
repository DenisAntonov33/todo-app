import { TodoStatusFilter } from "@/lib/todos/types";

export function parseStatusFilter(value: string | undefined): TodoStatusFilter {
  if (
    value === TodoStatusFilter.COMPLETED ||
    value === TodoStatusFilter.PENDING
  ) {
    return value;
  }
  return TodoStatusFilter.ALL;
}
