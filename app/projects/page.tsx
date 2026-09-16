"use client";

import { useSyncExternalStore, useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";

import ProjectTable from "@/components/projects/ProjectTable";

import AddProjectModal from "@/components/projects/AddProjectModal";
import EditProjectModal from "@/components/projects/EditProjectModal";
import DeleteProjectModal from "@/components/projects/DeleteProjectModal";

import { projects as initialProjects } from "@/data/projects";
import { Project } from "@/types/project";

const STORAGE_KEY = "flowdesk-projects";

let listeners: (() => void)[] = [];

const subscribe = (listener: () => void) => {
  listeners.push(listener);

  return () => {
    listeners = listeners.filter(
      (currentListener) => currentListener !== listener
    );
  };
};

const getSnapshot = () => {
  if (typeof window === "undefined") {
    return JSON.stringify(initialProjects);
  }

  return (
    localStorage.getItem(STORAGE_KEY) ??
    JSON.stringify(initialProjects)
  );
};

const getServerSnapshot = () => {
  return JSON.stringify(initialProjects);
};

const saveProjects = (projects: Project[]) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(projects)
  );

  listeners.forEach((listener) => listener());
};

export default function ProjectsPage() {
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingProject, setEditingProject] =
    useState<Project | null>(null);

  const [deletingProject, setDeletingProject] =
    useState<Project | null>(null);

  const projectsSnapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const projectList: Project[] =
    JSON.parse(projectsSnapshot);

  // Add Project
  const handleAddProject = (
    newProject: Omit<Project, "id">
  ) => {
    const project: Project = {
      id: Date.now(),
      ...newProject,
    };

    saveProjects([
      project,
      ...projectList,
    ]);

    setIsModalOpen(false);

    toast.success("Project added successfully");
  };

  // Edit Project
  const handleEditProject = (
    project: Project
  ) => {
    setEditingProject(project);
  };

  const handleSaveProject = (
    updatedProject: Project
  ) => {
    const updatedProjects = projectList.map(
      (project) =>
        project.id === updatedProject.id
          ? updatedProject
          : project
    );

    saveProjects(updatedProjects);

    setEditingProject(null);

    toast.success(
      "Project updated successfully"
    );
  };

  // Delete Project
  const handleDeleteProject = (
    project: Project
  ) => {
    setDeletingProject(project);
  };

  const handleConfirmDelete = () => {
    if (!deletingProject) return;

    const updatedProjects = projectList.filter(
      (project) =>
        project.id !== deletingProject.id
    );

    saveProjects(updatedProjects);

    setDeletingProject(null);

    toast.success(
      "Project deleted successfully"
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />
        <MobileNav />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Workspace
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Projects
              </h2>

              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-gray-500">
                Manage and track all your projects in one place.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              <Plus
                size={17}
                strokeWidth={2.5}
              />

              New Project
            </button>
          </div>

          {/* Project Table */}
          <div className="mt-7">
            <ProjectTable
              projects={projectList}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
            />
          </div>
        </main>
      </div>

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddProject}
      />

      {/* Edit Project Modal */}
      <EditProjectModal
        key={editingProject?.id ?? "edit-project"}
        isOpen={editingProject !== null}
        project={editingProject}
        onClose={() =>
          setEditingProject(null)
        }
        onSave={handleSaveProject}
      />

      {/* Delete Project Modal */}
      <DeleteProjectModal
        isOpen={deletingProject !== null}
        project={deletingProject}
        onClose={() =>
          setDeletingProject(null)
        }
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}