interface TodoListSkeletonProps {
  rowCount: number;
}

function TodoItemSkeleton() {
  return (
    <div className="flex items-start gap-4 rounded-md border border-black/[.08] bg-white p-4 dark:border-white/[.145] dark:bg-black">
      <div className="mt-1 h-5 w-5 rounded border border-black/[.08] bg-zinc-100 dark:border-white/[.145] dark:bg-zinc-900" />

      <div className="flex flex-1 flex-col gap-2">
        <div className="h-6 w-3/4 rounded bg-zinc-200 animate-pulse dark:bg-zinc-800" />
        <div className="h-4 w-full rounded bg-zinc-100 animate-pulse dark:bg-zinc-900" />
      </div>

      <div className="flex gap-2">
        <div className="h-8 w-20 rounded-md bg-zinc-100 animate-pulse dark:bg-zinc-900" />
        <div className="h-8 w-24 rounded-md bg-zinc-100 animate-pulse dark:bg-zinc-900" />
      </div>
    </div>
  );
}

export function TodoListSkeleton({ rowCount }: TodoListSkeletonProps) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: rowCount }).map((_, index) => (
        <TodoItemSkeleton key={index} />
      ))}
    </div>
  );
}
