"use client";

import { Monitor, Moon, Sun } from "lucide-react";

import {
  AppearanceSettings as AppearanceSettingsType,
} from "@/types/settings";

interface AppearanceSettingsProps {
  settings: AppearanceSettingsType;
  onChange: (
    settings: AppearanceSettingsType
  ) => void;
}

const themeOptions = [
  {
    value: "Light",
    label: "Light",
    description: "Use the light appearance.",
    icon: Sun,
  },
  {
    value: "Dark",
    label: "Dark",
    description: "Use the dark appearance.",
    icon: Moon,
  },
  {
    value: "System",
    label: "System",
    description: "Follow your device settings.",
    icon: Monitor,
  },
] as const;

export default function AppearanceSettings({
  settings,
  onChange,
}: AppearanceSettingsProps) {
  const handleThemeChange = (
    theme: AppearanceSettingsType["theme"]
  ) => {
    onChange({
      ...settings,
      theme,
    });

    if (theme === "Dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "Light") {
      document.documentElement.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      document.documentElement.classList.toggle(
        "dark",
        prefersDark
      );
    }
  };

  return (
    <section className="rounded-xl border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="border-b px-5 py-5 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Appearance
        </h3>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Customize how FlowDesk looks on your device.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-3">
        {themeOptions.map((option) => {
          const Icon = option.icon;

          const isSelected =
            settings.theme === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                handleThemeChange(option.value)
              }
              className={`rounded-xl border p-4 text-left transition ${
                isSelected
                  ? "border-gray-900 bg-gray-50 ring-1 ring-gray-900 dark:border-white dark:bg-gray-700 dark:ring-white"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-600">
                  <Icon
                    size={18}
                    className="text-gray-700 dark:text-gray-200"
                  />
                </div>

                {isSelected && (
                  <span className="rounded-full bg-gray-900 px-2 py-1 text-[10px] font-semibold text-white dark:bg-white dark:text-gray-900">
                    Selected
                  </span>
                )}
              </div>

              <h4 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
                {option.label}
              </h4>

              <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                {option.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}