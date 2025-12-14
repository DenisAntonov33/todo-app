"use client";

import { useState } from "react";
import { TodoItem } from "./TodoItem";
import { useQuery } from "@tanstack/react-query";
import { fetchTodoList } from "@/lib/todos/fetchTodoList";
import { EmptyTodoList } from "@/app/todos/_components/EmptyTodoList";
import { TodoStatsBar } from "@/app/todos/_components/TodoStatsBar";
import { TodoListSkeleton } from "./TodoListSkeleton";
import { TodoListError } from "./TodoListError";
import { TodoFilters } from "./TodoFilters";
import { TodoStatusFilter } from "@/lib/todos/types";
import { TODO_QUERY } from "@/lib/http/queries";

export function TodoListSection() {
  const [statusFilter, setStatusFilter] = useState<TodoStatusFilter>(
    TodoStatusFilter.ALL
  );
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [TODO_QUERY, statusFilter, searchQuery],
    queryFn: () => fetchTodoList(statusFilter, searchQuery),
  });

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
