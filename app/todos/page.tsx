import Link from "next/link";
import { CreateTodoForm } from "@/app/todos/_components/CreateTodoForm";
import { TodoListSection } from "@/app/todos/_components/TodoListSection";

export default function TodosPage() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex h-10 items-center justify-center rounded-full border border-solid border-black/[.08] px-4 text-sm font-medium transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
        >
          ← Back
        </Link>
      </div>

      <header>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-black dark:text-zinc-50">
          My Todos
        </h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          Create and manage your tasks
        </p>
      </header>

      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
            Create New Todo
          </h2>
          <CreateTodoForm />
        </div>

        <TodoListSection />
      </div>
    </div>
  );
}
