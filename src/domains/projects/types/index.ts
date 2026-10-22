import type { AppUser } from "@/domains/auth/types";

export interface Project {
  id: string;
  created_at: string;
  title: string;
  description: string;
  budget: string;
  timeline: string;
  status: "open" | "in_progress" | "completed" | "cancelled";
  skills: string[];
  owner_id: string;
  type: string;
  visibility: "public" | "private";
  deliverables?: string[];
  milestones?: { id: string; title: string; completed: boolean }[];
  category?: string;
  owner?: AppUser;
}

export interface ProjectApplication {
  id: string;
  created_at: string;
  project_id: string;
  applicant_id: string;
  status: "pending" | "accepted" | "rejected";
  pitch: string;
  proposed_budget?: string;
  proposed_timeline?: string;
  applicant?: AppUser;
  project?: Project;
}
