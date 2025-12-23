import { CollapsibleCreateForm } from "@/app/todos/_components/CollapsibleCreateForm";
import { TodoListSection } from "@/app/todos/_components/TodoListSection";
import { BackButton } from "@/lib/components/BackButton";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchTodoList } from "@/lib/todos/fetchTodoList";
import { TODO_QUERY } from "@/lib/http/queries";
import { TodoStatusFilter } from "@/lib/todos/types";
import { getQueryClient } from "@/lib/providers/getQueryClient";

export default async function TodosPage() {
  const queryClient = getQueryClient();

  // TODO: get selected filters from URL in the future
  await queryClient.prefetchQuery({
    queryKey: [TODO_QUERY, TodoStatusFilter.ALL, ""],
    queryFn: async () => await fetchTodoList(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
    </HydrationBoundary>
  );
}
