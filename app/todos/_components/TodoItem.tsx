"use client";

import type { TodoModel } from "@/app/generated/prisma/models/Todo";
import { useState } from "react";
import { EditTodoForm } from "@/app/todos/_components/EditTodoForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "@/lib/todos/updateTodo";
import { TODO_QUERY } from "@/lib/http/queries";

interface TodoItemProps {
  todo: TodoModel;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleDelete = () => {
    // Empty handler
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: async () => {
      await updateTodo({ ...todo, title, description });
    },
    onSuccess: async () => {
      setIsEditing(false);
      await queryClient.invalidateQueries({ queryKey: [TODO_QUERY] });
    },
  });

  const isCompleted = todo.status === "completed";

  if (isEditing) {
    return (
      <EditTodoForm
        onSave={updateMutation.mutate}
        onCancel={handleCancel}
        title={title}
        description={description ?? ""}
        isSubmitting={updateMutation.isPending}
        errorMessage={updateMutation.error?.message}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
      />
    );
  }

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
