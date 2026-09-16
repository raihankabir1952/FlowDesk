"use client";

import { UserProfile } from "@/types/settings";

interface ProfileSettingsProps {
  profile: UserProfile;
  onChange: (profile: UserProfile) => void;
}

export default function ProfileSettings({
  profile,
  onChange,
}: ProfileSettingsProps) {
  const handleChange = (
    field: keyof UserProfile,
    value: string
  ) => {
    onChange({
      ...profile,
      [field]: value,
    });
  };

  return (
    <section className="rounded-xl border bg-white shadow-sm">
      {/* Header */}
      <div className="border-b px-5 py-5">
        <h3 className="text-lg font-semibold text-gray-900">
          Profile
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Manage your personal information and profile details.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-5 p-5">
        {/* Name */}
        <div>
          <label
            htmlFor="profile-name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>

          <input
            id="profile-name"
            type="text"
            value={profile.name}
            onChange={(event) =>
              handleChange("name", event.target.value)
            }
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="profile-email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>

          <input
            id="profile-email"
            type="email"
            value={profile.email}
            onChange={(event) =>
              handleChange("email", event.target.value)
            }
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          />
        </div>

        {/* Role */}
        <div>
          <label
            htmlFor="profile-role"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Role
          </label>

          <input
            id="profile-role"
            type="text"
            value={profile.role}
            onChange={(event) =>
              handleChange("role", event.target.value)
            }
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          />
        </div>

        {/* Bio */}
        <div>
          <label
            htmlFor="profile-bio"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Bio
          </label>

          <textarea
            id="profile-bio"
            rows={4}
            value={profile.bio}
            onChange={(event) =>
              handleChange("bio", event.target.value)
            }
            className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          />
        </div>
      </div>
    </section>
  );
}