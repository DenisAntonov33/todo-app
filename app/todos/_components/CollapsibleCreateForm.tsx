"use client";

import { useState } from "react";
import { CreateTodoForm } from "./CreateTodoForm";

export function CollapsibleCreateForm() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
          Create New Todo
        </h2>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="cursor-pointer flex items-center gap-2 rounded-md border border-black/[.08] bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:bg-black dark:text-zinc-50 dark:hover:bg-[#1a1a1a]"
        >
          {isExpanded ? (
            <>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              Collapse
            </>
          ) : (
            <>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Todo
            </>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="transition-all duration-200 ease-in-out">
          <CreateTodoForm />
        </div>
      )}
    </div>
  );
}
