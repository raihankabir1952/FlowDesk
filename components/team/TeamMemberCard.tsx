import { Mail } from "lucide-react";
import { TeamMember } from "@/types/team";

interface TeamMemberCardProps {
  member: TeamMember;
  onViewDetails: (member: TeamMember) => void;
}

export default function TeamMemberCard({
  member,
  onViewDetails,
}: TeamMemberCardProps) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
            {member.avatar}
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              {member.name}
            </h3>

            <p className="mt-0.5 text-sm text-gray-500">
              {member.role}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
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

      <div className="mt-5 flex items-center gap-2 border-t pt-4 text-sm text-gray-500">
        <Mail size={16} />

        <span className="truncate">
          {member.email}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onViewDetails(member)}
        className="mt-4 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-gray-900"
      >
        View Details
      </button>
    </div>
  );
}