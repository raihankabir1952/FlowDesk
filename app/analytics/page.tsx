"use client";

import { useState } from "react";
import {
  FolderKanban,
  ListChecks,
  TrendingUp,
  Wallet,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import RevenueChart from "@/components/analytics/RevenueChart";
import ProjectCompletionChart from "@/components/analytics/ProjectCompletionChart";
import TaskStatusChart from "@/components/analytics/TaskStatusChart";

import { analyticsData } from "@/data/analytics";

type TimeRange =
  | "3-months"
  | "6-months"
  | "this-year";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] =
    useState<TimeRange>("this-year");

  const totalRevenue = analyticsData.revenue.reduce(
    (total, item) => total + item.revenue,
    0
  );

  const totalProjects = analyticsData.projects.length;

  const completedTasks =
    analyticsData.tasks.find(
      (task) => task.status === "Completed"
    )?.count ?? 0;

  const averageCompletion =
    analyticsData.projects.reduce((total, project) => {
      return (
        total +
        (project.completed / project.total) * 100
      );
    }, 0) / analyticsData.projects.length;

  const filteredRevenue =
    timeRange === "3-months"
      ? analyticsData.revenue.slice(-3)
      : timeRange === "6-months"
        ? analyticsData.revenue.slice(-6)
        : analyticsData.revenue;

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: Wallet,
      description: "Revenue generated this year",
    },
    {
      title: "Total Projects",
      value: totalProjects.toString(),
      icon: FolderKanban,
      description: "Projects currently tracked",
    },
    {
      title: "Completed Tasks",
      value: completedTasks.toString(),
      icon: ListChecks,
      description: "Tasks completed",
    },
    {
      title: "Avg. Completion",
      value: `${Math.round(averageCompletion)}%`,
      icon: TrendingUp,
      description: "Average project progress",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />
        <MobileNav />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Analytics
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Track your projects, tasks, revenue, and overall
                performance.
              </p>
            </div>

            {/* Time Range Filter */}
            <select
              value={timeRange}
              onChange={(event) =>
                setTimeRange(
                  event.target.value as TimeRange
                )
              }
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100 sm:w-auto"
            >
              <option value="3-months">
                Last 3 Months
              </option>

              <option value="6-months">
                Last 6 Months
              </option>

              <option value="this-year">
                This Year
              </option>
            </select>
          </div>

          {/* Summary Cards */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-xl border bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {stat.title}
                      </p>

                      <h3 className="mt-2 text-2xl font-bold text-gray-900">
                        {stat.value}
                      </h3>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                      <Icon
                        size={20}
                        className="text-gray-700"
                      />
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-gray-500">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Revenue Chart */}
          <div className="mt-6">
            <RevenueChart data={filteredRevenue} />
          </div>

          {/* Additional Analytics */}
          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <ProjectCompletionChart />
            <TaskStatusChart />
          </div>
        </main>
      </div>
    </div>
  );
}