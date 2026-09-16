const projects = [
  {
    name: "Website Redesign",
    progress: 75,
  },
  {
    name: "Mobile App",
    progress: 60,
  },
  {
    name: "CRM Dashboard",
    progress: 45,
  },
  {
    name: "Marketing Website",
    progress: 30,
  },
];

export default function ProjectProgress() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold tracking-tight text-gray-900">
          Project Progress
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Current progress of active projects
        </p>
      </div>

      {/* Projects */}
      <div className="mt-6 space-y-6">
        {projects.map((project) => (
          <div key={project.name}>
            <div className="mb-2.5 flex items-center justify-between gap-4">
              <p className="truncate text-sm font-medium text-gray-700">
                {project.name}
              </p>

              <span className="shrink-0 text-sm font-semibold text-gray-900">
                {project.progress}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gray-900 transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}