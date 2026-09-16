export type TaskStatus =
  | "Todo"
  | "In Progress"
  | "Completed";

export type TaskPriority =
  | "High"
  | "Medium"
  | "Low";

export interface Task {
  id: number;
  title: string;
  project: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignee: string;
}