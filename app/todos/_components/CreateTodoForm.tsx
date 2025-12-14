"use client";

export function CreateTodoForm() {
  const isSubmitting = false;
  const errorMessage = null;

  return (
    <form className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="title"
          className="text-sm font-medium text-black dark:text-zinc-50"
        >
          Title
        </label>
        <input
          id="title"
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
          disabled={isSubmitting}
          className="flex h-12 flex-1 items-center justify-center rounded-full bg-foreground px-6 text-background transition-colors hover:bg-[#383838] disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-[#ccc]"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          disabled={isSubmitting}
          className="flex h-12 flex-1 items-center justify-center rounded-full border border-solid border-black/[.08] px-6 transition-colors hover:border-transparent hover:bg-black/[.04] disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
