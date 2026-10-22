import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title is too long"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  budget: z.string().min(1, "Budget is required"),
  timeline: z.string().min(1, "Timeline is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  type: z.string().min(1, "Project type is required"),
  visibility: z.enum(["public", "private"]).default("public"),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
