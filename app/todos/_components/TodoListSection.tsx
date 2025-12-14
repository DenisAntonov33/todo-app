"use client";

import { TodoItem } from "./TodoItem";
import { useQuery } from "@tanstack/react-query";
import { fetchTodoList } from "@/lib/todos/fetchTodoList";
import { EmptyTodoList } from "@/app/todos/_components/EmptyTodoList";
import { TodoStatsBar } from "@/app/todos/_components/TodoStatsBar";

export function TodoListSection() {
  const { data = [] } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodoList,
  });

  const isEmptyList = data.length === 0;

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
          Todos
        </h2>
        <TodoStatsBar todos={data} />
      </div>
      <div className="flex flex-col gap-3">
        {isEmptyList ? (
          <EmptyTodoList />
        ) : (
          data.map(todo => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>
    </section>
  );
}
