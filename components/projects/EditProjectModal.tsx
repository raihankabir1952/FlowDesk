"use client";

import { FormEvent, useState } from "react";
import { X } from "lucide-react";
import { Project } from "@/types/project";

interface EditProjectModalProps {
  isOpen: boolean;
  project: Project | null;
  onClose: () => void;
  onSave: (updatedProject: Project) => void;
}

export default function EditProjectModal({
  isOpen,
  project,
  onClose,
  onSave,
}: EditProjectModalProps) {
  const [name, setName] = useState(project?.name ?? "");
  const [client, setClient] = useState(project?.client ?? "");
  const [status, setStatus] = useState<Project["status"]>(
    project?.status ?? "Active"
  );
  const [priority, setPriority] =
    useState<Project["priority"]>(
      project?.priority ?? "Medium"
    );
  const [progress, setProgress] = useState(
    project?.progress ?? 0
  );
  const [dueDate, setDueDate] = useState(
    project?.dueDate ?? ""
  );
  const [teamSize, setTeamSize] = useState(
    project?.teamSize ?? 1
  );

  if (!isOpen || !project) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSave({
      id: project.id,
      name,
      client,
      status,
      priority,
      progress,
      dueDate,
      teamSize,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Edit Project
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update project information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {/* Project Name */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Project Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:border-gray-400"
            />
          </div>

          {/* Client */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Client Name
            </label>

            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              required
              className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:border-gray-400"
            />
          </div>

          {/* Status + Priority */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as Project["status"]
                  )
                }
                className="w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-gray-400"
              >
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(
                    e.target.value as Project["priority"]
                  )
                }
                className="w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-gray-400"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          {/* Progress + Team Size */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Progress (%)
              </label>

              <input
                type="number"
                min="0"
                max="100"
                value={progress}
                onChange={(e) =>
                  setProgress(Number(e.target.value))
                }
                className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:border-gray-400"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Team Size
              </label>

              <input
                type="number"
                min="1"
                value={teamSize}
                onChange={(e) =>
                  setTeamSize(Number(e.target.value))
                }
                className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:border-gray-400"
              />
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:border-gray-400"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}