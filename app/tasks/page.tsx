"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";

import TaskTable from "@/components/tasks/TaskTable";

import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskModal from "@/components/tasks/EditTaskModal";
import DeleteTaskModal from "@/components/tasks/DeleteTaskModal";

import { tasks as initialTasks } from "@/data/tasks";
import { Task } from "@/types/task";

const TASKS_STORAGE_KEY = "flowdesk-tasks";

export default function TasksPage() {
  const [taskList, setTaskList] =
    useState<Task[]>(initialTasks);

  const [isHydrated, setIsHydrated] =
    useState(false);

  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState<Task | null>(null);

  const [deletingTask, setDeletingTask] =
    useState<Task | null>(null);

  // Load saved tasks after the component mounts
  useEffect(() => {
    const storedTasks =
      localStorage.getItem(TASKS_STORAGE_KEY);

    if (storedTasks) {
      try {
        const parsedTasks: Task[] =
          JSON.parse(storedTasks);

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTaskList(parsedTasks);
      } catch {
        console.error(
          "Failed to load tasks from localStorage"
        );
      }
    }

    setIsHydrated(true);
  }, []);

  // Save tasks whenever the task list changes
  useEffect(() => {
    if (!isHydrated) return;

    localStorage.setItem(
      TASKS_STORAGE_KEY,
      JSON.stringify(taskList)
    );
  }, [taskList, isHydrated]);

  // Add Task
  const handleAddTask = (
    newTask: Omit<Task, "id">
  ) => {
    const task: Task = {
      id: Date.now(),
      ...newTask,
    };

    setTaskList((currentTasks) => [
      task,
      ...currentTasks,
    ]);

    setIsAddModalOpen(false);

    toast.success("Task added successfully");
  };

  // Open Edit Modal
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  // Save Edited Task
  const handleSaveTask = (
    updatedTask: Task
  ) => {
    setTaskList((currentTasks) =>
      currentTasks.map((task) =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    );

    setEditingTask(null);

    toast.success("Task updated successfully");
  };

  // Open Delete Confirmation
  const handleDeleteTask = (task: Task) => {
    setDeletingTask(task);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!deletingTask) return;

    setTaskList((currentTasks) =>
      currentTasks.filter(
        (task) => task.id !== deletingTask.id
      )
    );

    setDeletingTask(null);

    toast.success("Task deleted successfully");
  };

  // Change Task Status
  const handleStatusChange = (
    task: Task,
    newStatus: Task["status"]
  ) => {
    setTaskList((currentTasks) =>
      currentTasks.map((currentTask) =>
        currentTask.id === task.id
          ? {
              ...currentTask,
              status: newStatus,
            }
          : currentTask
      )
    );

    toast.success(
      `Task moved to ${newStatus}`
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
                Tasks
              </h2>

              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-gray-500">
                Manage and track your team&apos;s tasks
                and progress.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setIsAddModalOpen(true)
              }
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              <Plus
                size={17}
                strokeWidth={2.5}
              />

              New Task
            </button>
          </div>

          {/* Task Table */}
          <div className="mt-7">
            <TaskTable
              tasks={taskList}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onStatusChange={
                handleStatusChange
              }
            />
          </div>
        </main>
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() =>
          setIsAddModalOpen(false)
        }
        onAdd={handleAddTask}
      />

      {/* Edit Task Modal */}
      <EditTaskModal
        key={editingTask?.id ?? "edit-task"}
        isOpen={editingTask !== null}
        task={editingTask}
        onClose={() =>
          setEditingTask(null)
        }
        onSave={handleSaveTask}
      />

      {/* Delete Task Modal */}
      <DeleteTaskModal
        isOpen={deletingTask !== null}
        task={deletingTask}
        onClose={() =>
          setDeletingTask(null)
        }
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}