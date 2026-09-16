import { AnalyticsData } from "@/types/analytics";

export const analyticsData: AnalyticsData = {
  revenue: [
    { month: "Jan", revenue: 4200 },
    { month: "Feb", revenue: 5800 },
    { month: "Mar", revenue: 4900 },
    { month: "Apr", revenue: 7200 },
    { month: "May", revenue: 6800 },
    { month: "Jun", revenue: 8100 },
    { month: "Jul", revenue: 7600 },
    { month: "Aug", revenue: 9200 },
    { month: "Sep", revenue: 8700 },
  ],

  projects: [
    {
      name: "Website Redesign",
      completed: 18,
      total: 24,
    },
    {
      name: "Mobile App Development",
      completed: 12,
      total: 20,
    },
    {
      name: "CRM Dashboard",
      completed: 16,
      total: 18,
    },
    {
      name: "Marketing Website",
      completed: 9,
      total: 15,
    },
    {
      name: "E-commerce Platform",
      completed: 21,
      total: 25,
    },
  ],

  tasks: [
    {
      status: "Todo",
      count: 18,
    },
    {
      status: "In Progress",
      count: 12,
    },
    {
      status: "Completed",
      count: 42,
    },
  ],
};