"use client";

import type { TodoModel } from "@/app/generated/prisma/models/Todo";
import { useState } from "react";
import { EditTodoForm } from "@/app/todos/_components/EditTodoForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "@/lib/todos/updateTodo";
import { TODO_QUERY } from "@/lib/http/queries";
import { deleteTodo } from "@/lib/todos/deleteTodo";
import { TodoStatus } from "@/app/generated/prisma/enums";
import { Todo } from "@/app/generated/prisma/browser";

interface TodoItemProps {
  todo: TodoModel;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const queryClient = useQueryClient();
  const updateTodoTextMutation = useMutation({
    mutationFn: async () => {
      await updateTodo({ ...todo, title, description });
    },
    onSuccess: async () => {
      setIsEditing(false);
      await queryClient.invalidateQueries({ queryKey: [TODO_QUERY] });
    },
  });

  const updateTodoStatusMutation = useMutation({
    mutationFn: async (todo: Todo) => {
      const newStatus = isCompleted ? TodoStatus.pending : TodoStatus.completed;
      await updateTodo({ ...todo, status: newStatus });
    },
    onMutate: async newTodo => {
      await queryClient.cancelQueries({ queryKey: [TODO_QUERY] });

      const previousTodoList = queryClient.getQueryData([TODO_QUERY]);

      queryClient.setQueryData<Todo[]>([TODO_QUERY], oldData => {
        if (!oldData) return oldData;
        return oldData.map(todoItem =>
          todoItem.id === newTodo.id ? newTodo : todoItem
        );
      });

      return { previousTodoList };
    },
    onError: (_err, _todo, context) => {
      if (context?.previousTodoList) {
        queryClient.setQueryData([TODO_QUERY], context.previousTodoList);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [TODO_QUERY] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await deleteTodo(todo.id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [TODO_QUERY] });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const handleToggleStatus = () => {
    const newStatus = isCompleted ? TodoStatus.pending : TodoStatus.completed;
    const newTodo = { ...todo, status: newStatus };

    updateTodoStatusMutation.mutate(newTodo);
  };

  const isCompleted = todo.status === "completed";

  if (isEditing) {
    return (
      <EditTodoForm
        onSave={updateTodoTextMutation.mutate}
        onCancel={handleCancel}
        title={title}
        description={description ?? ""}
        isSubmitting={updateTodoTextMutation.isPending}
        errorMessage={updateTodoTextMutation.error?.message}
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
        onChange={handleToggleStatus}
        className="cursor-pointer mt-1 h-5 w-5 rounded border-black/[.08] text-foreground focus:ring-2 focus:ring-foreground dark:border-white/[.145]"
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
          className="cursor-pointer rounded-md border border-black/[.08] bg-white px-3 py-1.5 text-sm font-medium text-black transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:bg-black dark:text-zinc-50 dark:hover:bg-[#1a1a1a]"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="cursor-pointer rounded-md border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-900/30 dark:bg-black dark:text-red-400 dark:hover:bg-red-900/20"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
