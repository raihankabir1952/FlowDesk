const tasks = [
  {
    title: "Finish landing page",
    project: "Website Redesign",
    due: "Today",
  },
  {
    title: "Fix authentication flow",
    project: "Mobile App",
    due: "Tomorrow",
  },
  {
    title: "Update dashboard UI",
    project: "CRM Dashboard",
    due: "Sep 18",
  },
  {
    title: "Review marketing content",
    project: "Marketing Website",
    due: "Sep 20",
  },
];

export default function UpcomingTasks() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold tracking-tight text-gray-900">
            Upcoming Tasks
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Tasks that need your attention
          </p>
        </div>

        <button
          type="button"
          className="shrink-0 rounded-md px-2 py-1 text-sm font-medium text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          View all
        </button>
      </div>

      {/* Tasks */}
      <div className="mt-6 divide-y divide-gray-100">
        {tasks.map((task) => (
          <div
            key={task.title}
            className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-900">
                {task.title}
              </p>

              <p className="mt-1 truncate text-xs text-gray-500">
                {task.project}
              </p>
            </div>

            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                task.due === "Today"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {task.due}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}