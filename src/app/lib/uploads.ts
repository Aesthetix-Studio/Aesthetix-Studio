import { getAccessToken } from "./session";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export type UploadedFile = {
  name: string;
  key: string;
  updatedAt: string | null;
  size: number | null;
  url: string;
};

export async function fetchUploads() {
  const token = getAccessToken();
  const response = await fetch(`${API_BASE}/api/uploads`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error((data as { error?: string }).error ?? "Failed to fetch uploads");
  }

  return (data as { ok: true; files: UploadedFile[] }).files;
}

