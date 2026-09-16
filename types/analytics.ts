export interface RevenueData {
  month: string;
  revenue: number;
}

export interface ProjectStats {
  name: string;
  completed: number;
  total: number;
}

export interface TaskStats {
  status: string;
  count: number;
}

export interface AnalyticsData {
  revenue: RevenueData[];
  projects: ProjectStats[];
  tasks: TaskStats[];
}