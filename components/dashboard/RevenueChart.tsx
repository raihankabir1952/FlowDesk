"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5800 },
  { month: "Mar", revenue: 5100 },
  { month: "Apr", revenue: 7200 },
  { month: "May", revenue: 6800 },
  { month: "Jun", revenue: 8400 },
  { month: "Jul", revenue: 9200 },
  { month: "Aug", revenue: 10800 },
  { month: "Sep", revenue: 12400 },
  { month: "Oct", revenue: 11800 },
  { month: "Nov", revenue: 13600 },
  { month: "Dec", revenue: 14800 },
];

export default function RevenueChart() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-gray-900">
            Revenue Overview
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Monthly revenue performance
          </p>
        </div>

        <select
          aria-label="Select revenue year"
          className="w-fit cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 outline-none transition-all duration-200 hover:border-gray-300 hover:bg-white focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
        >
          <option>2026</option>
          <option>2025</option>
          <option>2024</option>
        </select>
      </div>

      {/* Chart */}
      <div className="mt-6 h-[280px] w-full sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={revenueData}
            margin={{
              top: 10,
              right: 8,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopOpacity={0.2} />
                <stop offset="100%" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              dy={8}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
              width={45}
            />

            <Tooltip
              formatter={(value) => [`$${value}`, "Revenue"]}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}