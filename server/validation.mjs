import { z } from "zod";

const optionalString = z.string().trim().min(1).optional().or(z.literal(""));

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  company: optionalString,
  service: optionalString,
  budget: optionalString,
  message: z.string().trim().min(1, "Message is required"),
});

export const discoveryCallSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  day: z.string().trim().min(1, "Select a day"),
  time: z.string().trim().min(1, "Select a time"),
});

export const inquirySchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  company: optionalString,
  service: optionalString,
  budget: optionalString,
  projectSummary: z.string().trim().min(1, "Project summary is required"),
  inspiration: optionalString,
  startDate: optionalString,
});
