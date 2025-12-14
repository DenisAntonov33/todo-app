import { CollapsibleCreateForm } from "@/app/todos/_components/CollapsibleCreateForm";
import { TodoListSection } from "@/app/todos/_components/TodoListSection";
import { BackButton } from "@/lib/components/BackButton";
import { QueryClient } from "@tanstack/react-query";
import { fetchTodoList } from "@/lib/todos/fetchTodoList";

export default async function TodosPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: fetchTodoList,
  });

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex items-center gap-4">
        <BackButton href="/" />
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
        <CollapsibleCreateForm />

        <TodoListSection />
      </div>
    </div>
  );
}
