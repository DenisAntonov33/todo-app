"use client";

import type { TodoModel } from "@/app/generated/prisma/models/Todo";

interface TodoStatsBarProps {
  todos: TodoModel[];
}

export function TodoStatsBar({ todos }: TodoStatsBarProps) {
  const totalTodos = todos.length;

  return (
    <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
      <span>{totalTodos} todos</span>
    </div>
  );
}
