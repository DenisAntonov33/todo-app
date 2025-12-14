"use client";

import type { TodoModel } from "@/app/generated/prisma/models/Todo";
import { TodoItem } from "./TodoItem";
import { useQuery } from "@tanstack/react-query";
import { fetchTodoList } from "@/lib/todos/fetchTodoList";

// TODO delete it later
const mockTodos: TodoModel[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Write and submit the project proposal by end of week",
    status: "pending",
    order: "a0",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "user1",
  },
  {
    id: "2",
    title: "Review code changes",
    description: "Review pull requests and provide feedback",
    status: "completed",
    order: "a1",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "user1",
  },
  {
    id: "3",
    title: "Update documentation",
    description: "Update API documentation with new endpoints",
    status: "pending",
    order: "a2",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "user1",
  },
  {
    id: "4",
    title: "Team meeting",
    description: "Attend weekly team sync meeting",
    status: "pending",
    order: "a3",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "user1",
  },
  {
    id: "5",
    title: "Deploy to production",
    description: "Deploy latest changes to production environment",
    status: "completed",
    order: "a4",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "user1",
  },
];

export function TodoListSection() {
  const { data = [] } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodoList,
  });

  return (
    <section className="flex w-full flex-col gap-4">
      <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
        Todos
      </h2>
      <div className="flex flex-col gap-3">
        {data.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </section>
  );
}
