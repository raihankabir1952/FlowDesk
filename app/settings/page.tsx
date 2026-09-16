"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";

import ProfileSettings from "@/components/settings/ProfileSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";

import {
  appearanceSettings as initialAppearanceSettings,
  notificationSettings as initialNotificationSettings,
  userProfile as initialUserProfile,
} from "@/data/settings";

import {
  AppearanceSettings as AppearanceSettingsType,
  NotificationSettings as NotificationSettingsType,
  UserProfile,
} from "@/types/settings";

const PROFILE_STORAGE_KEY = "flowdesk-profile";
const NOTIFICATION_STORAGE_KEY = "flowdesk-notifications";
const APPEARANCE_STORAGE_KEY = "flowdesk-appearance";

export default function SettingsPage() {
  const [profile, setProfile] =
    useState<UserProfile>(initialUserProfile);

  const [notifications, setNotifications] =
    useState<NotificationSettingsType>(
      initialNotificationSettings
    );

  const [appearance, setAppearance] =
    useState<AppearanceSettingsType>(
      initialAppearanceSettings
    );

  useEffect(() => {
    const savedProfile =
      localStorage.getItem(PROFILE_STORAGE_KEY);

    const savedNotifications =
      localStorage.getItem(NOTIFICATION_STORAGE_KEY);

    const savedAppearance =
      localStorage.getItem(APPEARANCE_STORAGE_KEY);

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }

    if (savedAppearance) {
      setAppearance(JSON.parse(savedAppearance));
    }
  }, []);

  const handleSaveChanges = () => {
    localStorage.setItem(
      PROFILE_STORAGE_KEY,
      JSON.stringify(profile)
    );

    localStorage.setItem(
      NOTIFICATION_STORAGE_KEY,
      JSON.stringify(notifications)
    );

    localStorage.setItem(
      APPEARANCE_STORAGE_KEY,
      JSON.stringify(appearance)
    );

    toast.success("Settings saved successfully");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />
        <MobileNav />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Settings
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage your profile, notifications, and preferences.
            </p>
          </div>

          <div className="mt-6 space-y-6">
            <ProfileSettings
              profile={profile}
              onChange={setProfile}
            />

            <NotificationSettings
              settings={notifications}
              onChange={setNotifications}
            />

            <AppearanceSettings
              settings={appearance}
              onChange={setAppearance}
            />

            <div className="flex justify-end border-t pt-6">
              <button
                type="button"
                onClick={handleSaveChanges}
                className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Save Changes
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}