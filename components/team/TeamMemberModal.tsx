"use client";

import { Mail, X } from "lucide-react";
import { TeamMember } from "@/types/team";

interface TeamMemberModalProps {
  isOpen: boolean;
  member: TeamMember | null;
  onClose: () => void;
}

export default function TeamMemberModal({
  isOpen,
  member,
  onClose,
}: TeamMemberModalProps) {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Member Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              View team member information.
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

        {/* Content */}
        <div className="px-6 py-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-900 text-lg font-semibold text-white">
              {member.avatar}
            </div>

            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              {member.name}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {member.role}
            </p>

            <span
              className={`mt-3 rounded-full px-3 py-1 text-xs font-medium ${
                member.status === "Active"
                  ? "bg-green-50 text-green-700"
                  : member.status === "Away"
                    ? "bg-yellow-50 text-yellow-700"
                    : "bg-gray-100 text-gray-600"
              }`}
            >
              {member.status}
            </span>
          </div>

          <div className="mt-6 space-y-4 border-t pt-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                <Mail size={17} className="text-gray-600" />
              </div>

              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium text-gray-900">
                  {member.email}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500">Member ID</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                #{member.id}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}