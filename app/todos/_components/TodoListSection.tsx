"use client";

import { useEffect, useState } from "react";
import { TodoItem } from "./TodoItem";
import { useQuery } from "@tanstack/react-query";
import { fetchTodoList } from "@/lib/todos/fetchTodoList/fetchTodoList";
import { EmptyTodoList } from "@/app/todos/_components/EmptyTodoList";
import { TodoStatsBar } from "@/app/todos/_components/TodoStatsBar";
import { TodoListSkeleton } from "./TodoListSkeleton";
import { TodoListError } from "./TodoListError";
import { TodoFilters } from "./TodoFilters";
import { TodoStatusFilter } from "@/lib/todos/types";
import { TODO_QUERY } from "@/lib/http/queries";
import { useDebounceValue } from "@/lib/hooks/useDebounceValue";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { parseStatusFilter } from "@/lib/todos/parseStatusFilter";

const TODO_SEARCH_DEBOUNCE_MS = 500;

const TITLE_QUERY_PARAM = "title";
const STATUS_QUERY_PARAM = "status";

export function TodoListSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [statusFilter, setStatusFilter] = useState<TodoStatusFilter>(
    parseStatusFilter(searchParams.get(STATUS_QUERY_PARAM) ?? "")
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get(TITLE_QUERY_PARAM) || ""
  );
  const debouncedSearchQuery = useDebounceValue(
    searchQuery,
    TODO_SEARCH_DEBOUNCE_MS
  );

  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [TODO_QUERY, statusFilter, debouncedSearchQuery],
    queryFn: () => fetchTodoList(statusFilter, debouncedSearchQuery),
  });

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (statusFilter === TodoStatusFilter.ALL) {
      newSearchParams.delete("status");
    } else {
      newSearchParams.set("status", statusFilter);
    }

    if (debouncedSearchQuery === "") {
      newSearchParams.delete("title");
    } else {
      newSearchParams.set("title", debouncedSearchQuery);
    }

    let newSearchParamsString = newSearchParams.toString();

    if (newSearchParamsString) {
      newSearchParamsString = `?${newSearchParamsString}`;
    }

    router.replace(pathname + newSearchParamsString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, debouncedSearchQuery]);

  const handleFilterChange = (filter: TodoStatusFilter) => {
    setStatusFilter(filter);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const isEmptyList = data.length === 0;
  const showError = isError;
  const showEmptyList = !isLoading && !isError && isEmptyList;
  const showSkeleton = isLoading && !isError;
  const showList = !isLoading && !isError && !isEmptyList;

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
          Todos
        </h2>
        <TodoStatsBar todos={data} />
      </div>
      <TodoFilters
        statusFilter={statusFilter}
        searchQuery={searchQuery}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />
      <div className="flex flex-col gap-3">
        {showError && (
          <TodoListError error={error as Error} onRetry={refetch} />
        )}
        {showEmptyList && <EmptyTodoList />}
        {showSkeleton && <TodoListSkeleton rowCount={3} />}
        {showList && data.map(todo => <TodoItem key={todo.id} todo={todo} />)}
      </div>
    </section>
  );
}
