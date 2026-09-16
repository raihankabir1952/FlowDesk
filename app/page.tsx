"use client";

import { useState } from "react";
import {
  FolderKanban,
  CheckSquare,
  CircleCheck,
  DollarSign,
  Plus,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";

import StatsCard from "@/components/dashboard/StatsCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import ProjectProgress from "@/components/dashboard/ProjectProgress";
import UpcomingTasks from "@/components/dashboard/UpcomingTasks";
import RecentActivity from "@/components/dashboard/RecentActivity";
import TeamOverview from "@/components/dashboard/TeamOverview";

import AddProjectModal from "@/components/projects/AddProjectModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                Overview
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Dashboard
              </h2>

              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-gray-500">
                Welcome back, Raihan. Here&apos;s what&apos;s happening
                with your workspace.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              <Plus size={17} strokeWidth={2.5} />
              New Project
            </button>
          </div>

          {/* Stats */}
          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatsCard
              title="Total Projects"
              value="24"
              change="+12.5%"
              icon={FolderKanban}
            />

            <StatsCard
              title="Active Tasks"
              value="48"
              change="+8.2%"
              icon={CheckSquare}
            />

            <StatsCard
              title="Completed"
              value="18"
              change="+5.4%"
              icon={CircleCheck}
            />

            <StatsCard
              title="Revenue"
              value="$24,500"
              change="+14.8%"
              icon={DollarSign}
            />
          </div>

          {/* Revenue */}
          <div className="mt-6">
            <RevenueChart />
          </div>

          {/* Projects + Upcoming Tasks */}
          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <ProjectProgress />
            <UpcomingTasks />
          </div>

          {/* Activity + Team */}
          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <RecentActivity />
            <TeamOverview />
          </div>
        </main>
      </div>

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={() => {}}
      />
    </div>
  );
}