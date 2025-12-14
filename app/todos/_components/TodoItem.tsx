"use client";

import type { TodoModel } from "@/app/generated/prisma/models/Todo";

interface TodoItemProps {
  todo: TodoModel;
}

export function TodoItem({ todo }: TodoItemProps) {
  const handleDelete = () => {
    // Empty handler
  };

  const handleEdit = () => {
    // Empty handler
  };

  const isCompleted = todo.status === "completed";

  return (
    <div className="flex items-start gap-4 rounded-md border border-black/[.08] bg-white p-4 dark:border-white/[.145] dark:bg-black">
      <input
        type="checkbox"
        checked={isCompleted}
        className="mt-1 h-5 w-5 rounded border-black/[.08] text-foreground focus:ring-2 focus:ring-foreground dark:border-white/[.145]"
        readOnly
      />
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
          {todo.title}
        </h3>
        {todo.description && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {todo.description}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleEdit}
          className="rounded-md border border-black/[.08] bg-white px-3 py-1.5 text-sm font-medium text-black transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:bg-black dark:text-zinc-50 dark:hover:bg-[#1a1a1a]"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="rounded-md border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-900/30 dark:bg-black dark:text-red-400 dark:hover:bg-red-900/20"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
