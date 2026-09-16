"use client";

import {
  Pencil,
  Trash2,
  Search,
  SearchX,
} from "lucide-react";
import { useState } from "react";

import { Project } from "@/types/project";

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export default function ProjectTable({
  projects,
  onEdit,
  onDelete,
}: ProjectTableProps) {
  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("default");

  const [visibleCount, setVisibleCount] =
    useState(5);

  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch =
        `${project.name} ${project.client}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        project.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        project.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);

        case "name-desc":
          return b.name.localeCompare(a.name);

        case "progress-low":
          return a.progress - b.progress;

        case "progress-high":
          return b.progress - a.progress;

        case "date-earliest":
          return (
            new Date(a.dueDate).getTime() -
            new Date(b.dueDate).getTime()
          );

        case "date-latest":
          return (
            new Date(b.dueDate).getTime() -
            new Date(a.dueDate).getTime()
          );

        default:
          return 0;
      }
    });

  const visibleProjects =
    filteredProjects.slice(0, visibleCount);

  const hasMoreProjects =
    visibleCount < filteredProjects.length;

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
    setVisibleCount(5);
  };

  return (
    <div className="space-y-4">
      {/* Project Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {filteredProjects.length}
          </span>{" "}
          {filteredProjects.length === 1
            ? "project"
            : "projects"}
        </p>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="rounded-md px-2 py-1 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {/* Search */}
        <div className="relative w-full sm:max-w-sm">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setVisibleCount(5);
            }}
            placeholder="Search projects..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          />
        </div>

        {/* Status */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setVisibleCount(5);
          }}
          className="cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 outline-none transition-all duration-200 hover:border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
        >
          <option value="All">
            All Status
          </option>
          <option value="Active">
            Active
          </option>
          <option value="Completed">
            Completed
          </option>
          <option value="On Hold">
            On Hold
          </option>
        </select>

        {/* Priority */}
        <select
          value={priorityFilter}
          onChange={(e) => {
            setPriorityFilter(e.target.value);
            setVisibleCount(5);
          }}
          className="cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 outline-none transition-all duration-200 hover:border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
        >
          <option value="All">
            All Priority
          </option>
          <option value="High">
            High
          </option>
          <option value="Medium">
            Medium
          </option>
          <option value="Low">
            Low
          </option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setVisibleCount(5);
          }}
          className="cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 outline-none transition-all duration-200 hover:border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
        >
          <option value="default">
            Sort By
          </option>

          <option value="name-asc">
            Name: A → Z
          </option>

          <option value="name-desc">
            Name: Z → A
          </option>

          <option value="progress-low">
            Progress: Low → High
          </option>

          <option value="progress-high">
            Progress: High → Low
          </option>

          <option value="date-earliest">
            Due Date: Earliest
          </option>

          <option value="date-latest">
            Due Date: Latest
          </option>
        </select>
      </div>

      {/* Project Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Project
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Client
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Priority
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Progress
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Due Date
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Team
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {visibleProjects.map((project) => (
                <tr
                  key={project.id}
                  className="transition-colors duration-150 hover:bg-gray-50"
                >
                  {/* Project */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900">
                      {project.name}
                    </p>
                  </td>

                  {/* Client */}
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">
                      {project.client}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        project.status ===
                        "Active"
                          ? "bg-green-50 text-green-700"
                          : project.status ===
                            "Completed"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>

                  {/* Priority */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        project.priority ===
                        "High"
                          ? "bg-red-50 text-red-700"
                          : project.priority ===
                            "Medium"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {project.priority}
                    </span>
                  </td>

                  {/* Progress */}
                  <td className="px-6 py-4">
                    <div className="flex min-w-[120px] items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-gray-900 transition-all duration-500"
                          style={{
                            width: `${project.progress}%`,
                          }}
                        />
                      </div>

                      <span className="text-xs font-semibold text-gray-600">
                        {project.progress}%
                      </span>
                    </div>
                  </td>

                  {/* Due Date */}
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">
                      {project.dueDate}
                    </p>
                  </td>

                  {/* Team */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {project.teamSize} members
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          onEdit(project)
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onDelete(project)
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Empty State */}
              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan={8}>
                    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                        <SearchX
                          size={22}
                          className="text-gray-500"
                        />
                      </div>

                      <h3 className="mt-4 text-sm font-semibold text-gray-900">
                        No projects found
                      </h3>

                      <p className="mt-1 max-w-sm text-sm leading-6 text-gray-500">
                        We could not find any projects
                        matching your current search or
                        filters.
                      </p>

                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={
                            handleClearFilters
                          }
                          className="mt-4 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
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

        {/* Load More */}
        {hasMoreProjects && (
          <div className="flex justify-center border-t border-gray-200 px-6 py-4">
            <button
              type="button"
              onClick={() =>
                setVisibleCount(
                  (prev) => prev + 5
                )
              }
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}