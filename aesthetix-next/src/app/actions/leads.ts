"use server";

import { z } from "zod";
import { headers } from "next/headers";

const ipCache = new Map<string, { count: number; resetTime: number }>();
const LIMIT = 3;
const WINDOW = 60 * 60 * 1000; // 1 hour

const leadSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
  company: z.string().optional(),
  budget: z.string().optional(),
  project_details: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export async function submitLead(prevState: any, formData: FormData) {
  const email = formData.get("email");

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0] || headerList.get("x-real-ip") || "unknown";

  if (ip !== "unknown") {
    const now = Date.now();
    const rateData = ipCache.get(ip) || { count: 0, resetTime: now + WINDOW };

    if (now > rateData.resetTime) {
      rateData.count = 1;
      rateData.resetTime = now + WINDOW;
    } else {
      rateData.count += 1;
    }

    ipCache.set(ip, rateData);

    if (rateData.count > LIMIT) {
      const minutesLeft = Math.ceil((rateData.resetTime - now) / (60 * 1000));
      return {
        success: false,
        error: `Too many submissions. Please try again in ${minutesLeft} minutes.`,
      };
    }
  }

  const validated = leadSchema.safeParse({ email });
  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues[0].message,
    };
  }

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

  try {
    const response = await fetch(`${API}/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: validated.data.email,
        name: validated.data.name ?? validated.data.email.split("@")[0],
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: (errData as any).error || "Failed to submit lead.",
      };
    }

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: "Connection error. Please try again later.",
    };
  }
}
