"use client";

import { useState } from "react";
import { Search, SearchX } from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import TeamMemberCard from "@/components/team/TeamMemberCard";
import TeamMemberModal from "@/components/team/TeamMemberModal";

import { teamMembers } from "@/data/team";
import { TeamMember, TeamStatus } from "@/types/team";

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "All" | TeamStatus
  >("All");

  const [selectedMember, setSelectedMember] =
    useState<TeamMember | null>(null);

  const filteredMembers = teamMembers.filter((member) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      member.name.toLowerCase().includes(search) ||
      member.role.toLowerCase().includes(search) ||
      member.email.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" ||
      member.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const hasActiveFilters =
    searchTerm !== "" || statusFilter !== "All";

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />
        <MobileNav />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Team
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage your team members and view their current status.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="mt-6 rounded-xl border bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value as "All" | TeamStatus
                  )
                }
                className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Away">Away</option>
                <option value="Offline">Offline</option>
              </select>

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
              Showing {filteredMembers.length}{" "}
              {filteredMembers.length === 1
                ? "member"
                : "members"}
            </p>
          </div>

          {/* Team Members */}
          {filteredMembers.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredMembers.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  onViewDetails={setSelectedMember}
                />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-xl border bg-white px-6 py-14 shadow-sm">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <SearchX
                    size={22}
                    className="text-gray-500"
                  />
                </div>

                <h3 className="text-sm font-semibold text-gray-900">
                  No team members found
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or status filter.
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
            </div>
          )}

          {/* Member Details Modal */}
          <TeamMemberModal
            isOpen={selectedMember !== null}
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        </main>
      </div>
    </div>
  );
}