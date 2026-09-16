const teamMembers = [
  {
    name: "Raihan Kabir",
    role: "Project Manager",
    status: "Online",
  },
  {
    name: "Sarah Ahmed",
    role: "UI/UX Designer",
    status: "Online",
  },
  {
    name: "John Doe",
    role: "Frontend Developer",
    status: "Away",
  },
  {
    name: "Michael Smith",
    role: "Backend Developer",
    status: "Offline",
  },
];

export default function TeamOverview() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold tracking-tight text-gray-900">
            Team Overview
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Current members of your workspace
          </p>
        </div>

        <button
          type="button"
          className="shrink-0 rounded-md px-2 py-1 text-sm font-medium text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          View all
        </button>
      </div>

      {/* Team Members */}
      <div className="mt-6 divide-y divide-gray-100">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
          >
            <div className="flex min-w-0 items-center gap-3">
              {/* Avatar */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-900 hover:text-white">
                {member.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </div>

              {/* Member Info */}
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {member.name}
                </p>

                <p className="truncate text-xs text-gray-500">
                  {member.role}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="flex shrink-0 items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  member.status === "Online"
                    ? "bg-green-500"
                    : member.status === "Away"
                      ? "bg-yellow-500"
                      : "bg-gray-400"
                }`}
              />

              <span className="text-xs font-medium text-gray-500">
                {member.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}