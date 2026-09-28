import { z } from "zod";

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
  tag?: string;
}

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  category: z.enum(["general", "bug", "feature", "feedback"], {
    message: "Please select a category",
  }),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message cannot exceed 500 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
