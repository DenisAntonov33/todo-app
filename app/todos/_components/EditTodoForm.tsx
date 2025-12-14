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
    <form
      onSubmit={handleSubmit}
      className="rounded-md border-2 border-foreground/20 bg-zinc-50/50 p-3 dark:border-foreground/30 dark:bg-zinc-900/50"
    >
      <div className="mb-2 flex items-center gap-2">
        <svg
          className="h-4 w-4 text-foreground/60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        <span className="text-xs font-medium text-foreground/60">Editing</span>
      </div>

      <div className="flex flex-col gap-2">
        <input
          id="title"
          value={title}
          onChange={handleTitleChange}
          type="text"
          disabled={isSubmitting}
          className="rounded border border-black/[.15] bg-white px-2 py-1 text-base font-semibold text-black transition-colors focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[.25] dark:bg-black dark:text-zinc-50"
          placeholder="Todo title"
        />

        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          disabled={isSubmitting}
          rows={2}
          className="rounded border border-black/[.15] bg-white px-2 py-1 text-sm text-zinc-600 transition-colors focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[.25] dark:bg-black dark:text-zinc-400"
          placeholder="Description (optional)"
        />
      </div>

      {errorMessage && (
        <div className="mt-2 rounded bg-red-50 px-2 py-1 text-xs text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {errorMessage}
        </div>
      )}

      <div className="mt-3 flex justify-end gap-2">
        {!!onCancel && (
          <button
            onClick={onCancel}
            type="button"
            disabled={isSubmitting}
            className="cursor-pointer rounded px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-black/[.04] disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-400 dark:hover:bg-[#1a1a1a]"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="cursor-pointer rounded bg-foreground px-3 py-1.5 text-sm font-medium text-background transition-colors hover:bg-[#383838] disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-[#ccc]"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
