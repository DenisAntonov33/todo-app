"use client";

import type { TodoModel } from "@/app/generated/prisma/models/Todo";
import { TodoStatus } from "@/app/generated/prisma/enums";
import { useMemo } from "react";

interface TodoStatsBarProps {
  todos: TodoModel[];
}

export function TodoStatsBar({ todos }: TodoStatsBarProps) {
  const totalTodos = todos.length;
  const completedTodos = useMemo(() => {
    return todos.filter(todo => todo.status === TodoStatus.completed).length;
  }, [todos]);

  return (
    <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
      <span>{totalTodos} todos</span>
      <span>•</span>
      <span>{completedTodos} completed</span>
    </div>
  );
}
