"use client";

import { TodoStatusFilter } from "@/lib/todos/types";

interface TodoFiltersProps {
  statusFilter: TodoStatusFilter;
  searchQuery: string;
  onFilterChange: (filter: TodoStatusFilter) => void;
  onSearchChange: (query: string) => void;
}

export function TodoFilters({
  statusFilter,
  searchQuery,
  onFilterChange,
  onSearchChange,
}: TodoFiltersProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search todos by title..."
          className="w-full rounded-md border border-black/[.08] bg-white px-4 py-2 text-sm text-black transition-colors focus:border-foreground focus:outline-none dark:border-white/[.145] dark:bg-black dark:text-zinc-50"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onFilterChange(TodoStatusFilter.ALL)}
          className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            statusFilter === "all"
              ? "bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc]"
              : "border border-black/[.08] bg-white text-black hover:bg-black/[.04] dark:border-white/[.145] dark:bg-black dark:text-zinc-50 dark:hover:bg-[#1a1a1a]"
          }`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => onFilterChange(TodoStatusFilter.PENDING)}
          className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            statusFilter === "pending"
              ? "bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc]"
              : "border border-black/[.08] bg-white text-black hover:bg-black/[.04] dark:border-white/[.145] dark:bg-black dark:text-zinc-50 dark:hover:bg-[#1a1a1a]"
          }`}
        >
          Pending
        </button>
        <button
          type="button"
          onClick={() => onFilterChange(TodoStatusFilter.COMPLETED)}
          className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            statusFilter === "completed"
              ? "bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc]"
              : "border border-black/[.08] bg-white text-black hover:bg-black/[.04] dark:border-white/[.145] dark:bg-black dark:text-zinc-50 dark:hover:bg-[#1a1a1a]"
          }`}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
