"use client";

import { useState } from "react";
import { EditTodoForm } from "@/app/todos/_components/EditTodoForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "@/lib/todos/createTodo";
import { TODO_QUERY } from "@/lib/http/queries";

export function CreateTodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const queryClient = useQueryClient();

  const resetForm = () => {
    setTitle("");
    setDescription("");
  };

  const createTodoMutation = useMutation({
    mutationFn: async () => {
      await createTodo({ title, description });
    },
    onSuccess: async () => {
      resetForm();
      await queryClient.invalidateQueries({ queryKey: [TODO_QUERY] });
    },
  });

  return (
    <EditTodoForm
      title={title}
      description={description}
      isSubmitting={createTodoMutation.isPending}
      errorMessage={createTodoMutation.error?.message}
      onTitleChange={setTitle}
      onDescriptionChange={setDescription}
      onSave={createTodoMutation.mutate}
    />
  );
}
