import { getAccessToken } from "./session";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export type LeadRow = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  status: string;
  source: string;
  date: string;
  notes: string;
};

export async function fetchLeads() {
  const token = getAccessToken();
  const response = await fetch(`${API_BASE}/api/leads`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error((data as { error?: string }).error ?? "Failed to fetch leads");
  }

  return (data as { ok: true; leads: LeadRow[] }).leads;
}

export async function fetchLead(id: string) {
  const token = getAccessToken();
  const response = await fetch(`${API_BASE}/api/leads/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error((data as { error?: string }).error ?? "Failed to fetch lead");
  }

  return (data as { ok: true; lead: LeadRow }).lead;
}

