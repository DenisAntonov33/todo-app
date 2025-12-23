import { CollapsibleCreateForm } from "@/app/todos/_components/CollapsibleCreateForm";
import { TodoListSection } from "@/app/todos/_components/TodoListSection";
import { BackButton } from "@/lib/components/BackButton";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { TODO_QUERY } from "@/lib/http/queries";
import { getQueryClient } from "@/lib/providers/getQueryClient";
import { fetchTodoListFromServer } from "@/lib/todos/fetchTodoList/fetchTodoListFromServer";
import { parseStatusFilter } from "@/lib/todos/parseStatusFilter";

interface TodosPageProps {
  searchParams: Promise<{ status?: string; title?: string }>;
}

export default async function TodosPage({ searchParams }: TodosPageProps) {
  const awaitedSearchParams = await searchParams;
  const statusFilter = parseStatusFilter(awaitedSearchParams.status);
  const titleQuery = awaitedSearchParams.title || "";

  const queryClient = getQueryClient();

  // TODO: get selected filters from URL in the future
  await queryClient.prefetchQuery({
    queryKey: [TODO_QUERY, statusFilter, titleQuery],
    queryFn: async () =>
      await fetchTodoListFromServer(statusFilter, titleQuery),
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
