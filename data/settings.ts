import {
  AppearanceSettings,
  NotificationSettings,
  UserProfile,
} from "@/types/settings";

export const userProfile: UserProfile = {
  name: "Raihan Kabir",
  email: "raihan@example.com",
  role: "Administrator",
  bio: "Frontend developer focused on building clean and user-friendly web applications.",
};

export const notificationSettings: NotificationSettings = {
  emailNotifications: true,
  taskUpdates: true,
  projectUpdates: true,
  teamMessages: false,
};

export const appearanceSettings: AppearanceSettings = {
  theme: "Light",
};