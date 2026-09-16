export type TeamStatus =
  | "Active"
  | "Away"
  | "Offline";

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  status: TeamStatus;
  avatar: string;
}