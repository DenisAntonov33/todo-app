"use client";

import { Todo } from "@/app/generated/prisma/browser";

interface EditTodoFormProps {
  onSave: () => void;
  title: string;
  description: string;
  onTitleChange?: (title: string) => void;
  onDescriptionChange?: (description: string) => void;
  onCancel?: () => void;
  todo?: Todo;
  errorMessage?: string;
  isSubmitting?: boolean;
}

export function EditTodoForm({
  onSave,
  onTitleChange,
  onDescriptionChange,
  onCancel,
  title,
  description,
  errorMessage,
  isSubmitting,
}: EditTodoFormProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange?.(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onDescriptionChange?.(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave();
  };

  const isSubmitDisabled = isSubmitting || !title;

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="title"
          className="text-sm font-medium text-black dark:text-zinc-50"
        >
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={handleTitleChange}
          type="text"
          disabled={isSubmitting}
          className="rounded-md border border-black/[.08] bg-white px-4 py-2 text-black transition-colors focus:border-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[.145] dark:bg-black dark:text-zinc-50"
          placeholder="Enter todo title"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="text-sm font-medium text-black dark:text-zinc-50"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          disabled={isSubmitting}
          rows={4}
          className="rounded-md border border-black/[.08] bg-white px-4 py-2 text-black transition-colors focus:border-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[.145] dark:bg-black dark:text-zinc-50"
          placeholder="Enter todo description"
        />
      </div>

      {errorMessage && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {errorMessage}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="cursor-pointer flex h-12 flex-1 items-center justify-center rounded-full bg-foreground px-6 text-background transition-colors hover:bg-[#383838] disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-[#ccc]"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
        {!!onCancel && (
          <button
            onClick={onCancel}
            type="button"
            disabled={isSubmitting}
            className="cursor-pointer flex h-12 flex-1 items-center justify-center rounded-full border border-solid border-black/[.08] px-6 transition-colors hover:border-transparent hover:bg-black/[.04] disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
