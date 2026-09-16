import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  positive?: boolean;
}

export default function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  positive = true,
}: StatsCardProps) {
  return (
    <div className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
            {value}
          </h3>
        </div>

        <div className="shrink-0 rounded-xl bg-gray-100 p-3 transition-colors duration-200 group-hover:bg-gray-900">
          <Icon
            size={20}
            className="text-gray-700 transition-colors duration-200 group-hover:text-white"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span
          className={`text-sm font-semibold ${
            positive ? "text-green-600" : "text-red-600"
          }`}
        >
          {change}
        </span>

        <span className="text-xs text-gray-400">
          from last period
        </span>
      </div>
    </div>
  );
}