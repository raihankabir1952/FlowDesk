"use client";

import { useState } from "react";
import { Pencil, Search, SearchX, Trash2 } from "lucide-react";
import { Task } from "@/types/task";

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (task: Task, status: Task["status"]) => void;
}

export default function TaskTable({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.project.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.title.localeCompare(b.title);

      case "name-desc":
        return b.title.localeCompare(a.title);

      case "due-earliest":
        return (
          new Date(a.dueDate).getTime() -
          new Date(b.dueDate).getTime()
        );

      case "due-latest":
        return (
          new Date(b.dueDate).getTime() -
          new Date(a.dueDate).getTime()
        );

      case "priority-high":
        return getPriorityValue(b.priority) - getPriorityValue(a.priority);

      case "priority-low":
        return getPriorityValue(a.priority) - getPriorityValue(b.priority);

      default:
        return 0;
    }
  });

  const hasActiveFilters =
    searchTerm !== "" ||
    statusFilter !== "All" ||
    priorityFilter !== "All" ||
    sortBy !== "default";

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setSortBy("default");
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search tasks or projects..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          >
            <option value="All">All Status</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          >
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Sorting */}
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          >
            <option value="default">Sort By</option>
            <option value="name-asc">Task Name (A-Z)</option>
            <option value="name-desc">Task Name (Z-A)</option>
            <option value="due-earliest">Due Date (Earliest)</option>
            <option value="due-latest">Due Date (Latest)</option>
            <option value="priority-high">Priority (High-Low)</option>
            <option value="priority-low">Priority (Low-High)</option>
          </select>

          {/* Clear */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
            >
              Clear
            </button>
          )}
        </div>

        <p className="mt-3 text-sm text-gray-500">
          Showing {sortedTasks.length}{" "}
          {sortedTasks.length === 1 ? "task" : "tasks"}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Task
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Project
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Priority
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Due Date
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Assignee
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {sortedTasks.map((task) => (
                <tr
                  key={task.id}
                  className="transition hover:bg-gray-50"
                >
                  {/* Task */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900">
                      {task.title}
                    </p>
                  </td>

                  {/* Project */}
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">
                      {task.project}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <select
                      value={task.status}
                      onChange={(event) =>
                        onStatusChange(
                          task,
                          event.target.value as Task["status"]
                        )
                      }
                      className={`rounded-full border-0 px-3 py-1.5 text-xs font-medium outline-none cursor-pointer ${
                        task.status === "Todo"
                          ? "bg-gray-100 text-gray-700"
                          : task.status === "In Progress"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-green-50 text-green-700"
                      }`}
                    >
                      <option value="Todo">Todo</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>

                  {/* Priority */}
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-medium ${
                        task.priority === "High"
                          ? "text-red-600"
                          : task.priority === "Medium"
                            ? "text-yellow-600"
                            : "text-gray-600"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>

                  {/* Due Date */}
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">
                      {task.dueDate}
                    </p>
                  </td>

                  {/* Assignee */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white">
                        {task.assignee
                          .split(" ")
                          .map((name) => name[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <span className="text-sm text-gray-600">
                        {task.assignee}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => onEdit(task)}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-gray-900"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => onDelete(task)}
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Empty State */}
              {sortedTasks.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-14 text-center"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                        <SearchX
                          size={22}
                          className="text-gray-500"
                        />
                      </div>

                      <h3 className="text-sm font-semibold text-gray-900">
                        No tasks found
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Try adjusting your search or filters.
                      </p>

                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={handleClearFilters}
                          className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                          Clear Filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function getPriorityValue(priority: Task["priority"]) {
  switch (priority) {
    case "High":
      return 3;

    case "Medium":
      return 2;

    case "Low":
      return 1;

    default:
      return 0;
  }
}