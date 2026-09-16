export type ProjectStatus = "Active" | "Completed" | "On Hold";

export type ProjectPriority = "High" | "Medium" | "Low";

export interface Project {
  id: number;
  name: string;
  client: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  dueDate: string;
  teamSize: number;
}