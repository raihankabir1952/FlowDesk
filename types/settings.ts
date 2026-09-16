export interface UserProfile {
  name: string;
  email: string;
  role: string;
  bio: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  taskUpdates: boolean;
  projectUpdates: boolean;
  teamMessages: boolean;
}

export interface AppearanceSettings {
  theme: "Light" | "Dark" | "System";
}