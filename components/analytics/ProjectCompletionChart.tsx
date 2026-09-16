"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { analyticsData } from "@/data/analytics";

export default function ProjectCompletionChart() {
  const chartData = analyticsData.projects.map((project) => ({
    name: project.name,
    completion: Math.round(
      (project.completed / project.total) * 100
    ),
  }));

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Project Completion
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Completion progress across your active projects.
        </p>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              top: 0,
              right: 20,
              left: 20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="#e5e7eb"
            />

            <XAxis
              type="number"
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: "#6b7280",
              }}
              tickFormatter={(value) => `${value}%`}
            />

            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              width={130}
              tick={{
                fontSize: 12,
                fill: "#6b7280",
              }}
            />

            <Tooltip
              formatter={(value) => [
                `${value}%`,
                "Completion",
              ]}
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />

            <Bar
              dataKey="completion"
              fill="#111827"
              radius={[0, 6, 6, 0]}
              barSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}