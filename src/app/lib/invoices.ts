import { getAccessToken } from "./session";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export type InvoiceRow = {
  id: string;
  client: string;
  project: string;
  amountCents: number;
  amount: string;
  status: string;
  issued: string;
  due: string;
};

export type InvoiceSummary = {
  total: string;
  paid: string;
  outstanding: string;
};

export async function fetchInvoices() {
  const token = getAccessToken();
  const response = await fetch(`${API_BASE}/api/invoices`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error((data as { error?: string }).error ?? "Failed to fetch invoices");
  }

  return data as { ok: true; invoices: InvoiceRow[]; summary: InvoiceSummary };
}

export async function payInvoice(id: string) {
  const token = getAccessToken();
  const response = await fetch(`${API_BASE}/api/invoices/${id}/pay`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error((data as { error?: string }).error ?? "Failed to process payment");
  }

  return data as { ok: true; message: string };
}


