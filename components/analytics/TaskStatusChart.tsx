"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { analyticsData } from "@/data/analytics";

const statusColors = {
  Todo: "#9ca3af",
  "In Progress": "#f59e0b",
  Completed: "#22c55e",
};

export default function TaskStatusChart() {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Task Status
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Distribution of tasks by their current status.
        </p>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={analyticsData.tasks}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              innerRadius={75}
              outerRadius={110}
              paddingAngle={3}
            >
              {analyticsData.tasks.map((entry) => (
                <Cell
                  key={entry.status}
                  fill={
                    statusColors[
                      entry.status as keyof typeof statusColors
                    ]
                  }
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [
                `${value} tasks`,
                "Count",
              ]}
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-2 flex flex-wrap justify-center gap-5">
        {analyticsData.tasks.map((task) => (
          <div
            key={task.status}
            className="flex items-center gap-2"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor:
                  statusColors[
                    task.status as keyof typeof statusColors
                  ],
              }}
            />

            <span className="text-sm text-gray-600">
              {task.status}
            </span>

            <span className="text-sm font-semibold text-gray-900">
              {task.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}