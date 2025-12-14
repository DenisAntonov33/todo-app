export interface CreateTodoInput {
  title: string;
  description?: string;
}

export enum TodoStatusFilter {
  ALL = "all",
  COMPLETED = "completed",
  PENDING = "pending",
}
