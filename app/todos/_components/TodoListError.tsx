interface TodoListErrorProps {
  error?: Error | null;
  onRetry?: () => void;
}

export function TodoListError({ error, onRetry }: TodoListErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-red-200 bg-red-50/50 p-12 text-center dark:border-red-900/30 dark:bg-red-900/10">
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/30">
          <svg
            className="h-8 w-8 text-red-600 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-red-900 dark:text-red-400">
            Failed to load todos
          </h3>
          {error && (
            <p className="text-sm text-red-700 dark:text-red-500">
              {error.message || "An error occurred while fetching your todos"}
            </p>
          )}
          {!error && (
            <p className="text-sm text-red-700 dark:text-red-500">
              An error occurred while fetching your todos
            </p>
          )}
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="cursor-pointer mt-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
