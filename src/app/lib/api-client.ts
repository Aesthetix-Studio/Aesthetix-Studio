const BASE = import.meta.env.VITE_API_BASE_URL ?? "";

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = (() => {
    try {
      const raw = localStorage.getItem("aesthetix.supabase.session");
      return raw ? JSON.parse(raw).accessToken : null;
    } catch {
      return null;
    }
  })();

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as any).error ?? `Request failed (${res.status})`);
  }

  return res.json();
}

export interface ApiLead {
  id: string;
  source: string;
  firstName: string;
  lastName: string | null;
  email: string;
  company: string | null;
  service: string | null;
  budget: string | null;
  message: string | null;
  day: string | null;
  time: string | null;
  projectSummary: string | null;
  inspiration: string | null;
  startDate: string | null;
  createdAt: string;
}

export interface ApiInvoice {
  id: string;
  client: string;
  project: string;
  amountCents: number;
  amount: string;
  status: string;
  issued: string;
  due: string;
}

export interface ApiUser {
  id: string;
  email: string;
  role: string;
}

export const api = {
  me: () => apiFetch<{ ok: boolean; user: ApiUser }>("/api/auth/me"),
  leads: () => apiFetch<{ ok: boolean; leads: ApiLead[] }>("/api/leads"),
  lead: (id: string) => apiFetch<{ ok: boolean; lead: ApiLead }>(`/api/leads/${id}`),
  invoices: () => apiFetch<{ ok: boolean; invoices: ApiInvoice[] }>("/api/invoices"),
};
