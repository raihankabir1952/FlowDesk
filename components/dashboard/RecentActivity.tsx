const activities = [
  {
    user: "Raihan Kabir",
    action: "completed a task",
    target: "Finish landing page",
    time: "10 min ago",
  },
  {
    user: "Sarah Ahmed",
    action: "created a new project",
    target: "Mobile App",
    time: "1 hour ago",
  },
  {
    user: "John Doe",
    action: "updated project progress",
    target: "CRM Dashboard",
    time: "2 hours ago",
  },
  {
    user: "Raihan Kabir",
    action: "added a new task",
    target: "Review marketing content",
    time: "4 hours ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold tracking-tight text-gray-900">
            Recent Activity
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Latest activity from your workspace
          </p>
        </div>

        <button
          type="button"
          className="shrink-0 rounded-md px-2 py-1 text-sm font-medium text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          View all
        </button>
      </div>

      {/* Activities */}
      <div className="mt-6 divide-y divide-gray-100">
        {activities.map((activity, index) => (
          <div
            key={`${activity.user}-${activity.target}-${index}`}
            className="flex gap-3 py-4 first:pt-0 last:pb-0"
          >
            {/* Avatar */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white transition-transform duration-200 hover:scale-105">
              {activity.user
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </div>

            {/* Activity Details */}
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-5 text-gray-600">
                <span className="font-semibold text-gray-900">
                  {activity.user}
                </span>{" "}
                {activity.action}{" "}
                <span className="font-medium text-gray-900">
                  {activity.target}
                </span>
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}