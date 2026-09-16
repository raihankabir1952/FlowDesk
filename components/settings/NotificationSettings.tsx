"use client";

import { NotificationSettings as NotificationSettingsType } from "@/types/settings";

interface NotificationSettingsProps {
  settings: NotificationSettingsType;
  onChange: (
    settings: NotificationSettingsType
  ) => void;
}

const notificationOptions = [
  {
    key: "emailNotifications",
    title: "Email Notifications",
    description:
      "Receive important updates and notifications by email.",
  },
  {
    key: "taskUpdates",
    title: "Task Updates",
    description:
      "Get notified when tasks are assigned or updated.",
  },
  {
    key: "projectUpdates",
    title: "Project Updates",
    description:
      "Receive updates about your projects and progress.",
  },
  {
    key: "teamMessages",
    title: "Team Messages",
    description:
      "Get notified when someone sends you a message.",
  },
] as const;

export default function NotificationSettings({
  settings,
  onChange,
}: NotificationSettingsProps) {
  const handleToggle = (
    key: keyof NotificationSettingsType
  ) => {
    onChange({
      ...settings,
      [key]: !settings[key],
    });
  };

  return (
    <section className="rounded-xl border bg-white shadow-sm">
      {/* Header */}
      <div className="border-b px-5 py-5">
        <h3 className="text-lg font-semibold text-gray-900">
          Notifications
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Choose which notifications you want to receive.
        </p>
      </div>

      {/* Options */}
      <div className="divide-y">
        {notificationOptions.map((option) => {
          const enabled = settings[option.key];

          return (
            <div
              key={option.key}
              className="flex items-center justify-between gap-4 px-5 py-5"
            >
              <div className="min-w-0">
                <h4 className="text-sm font-medium text-gray-900">
                  {option.title}
                </h4>

                <p className="mt-1 text-sm text-gray-500">
                  {option.description}
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={enabled}
                onClick={() => handleToggle(option.key)}
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
                  enabled
                    ? "bg-gray-900"
                    : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition ${
                    enabled
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}