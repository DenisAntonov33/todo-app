import { CreateTodoForm } from "@/app/todos/_components/CreateTodoForm";
import { TodoListSection } from "@/app/todos/_components/TodoListSection";

export default function TodosPage() {
  return (
    <div>
      <CreateTodoForm />
      <TodoListSection />
    </div>
  );
}
