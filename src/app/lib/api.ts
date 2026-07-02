import { getAccessToken, getSupabaseEnv } from "./session";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

async function postJson(path: string, payload: Record<string, unknown>) {
  const token = getAccessToken();
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error((data as { error?: string }).error ?? "Request failed");
  }

  return data as { ok: true; id: string };
}

export async function submitContact(payload: {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
}) {
  return postJson("/api/contact", {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    company: payload.company,
    service: payload.service,
    budget: payload.budget,
    message: payload.message ?? "",
  });
}

export async function submitDiscoveryCall(payload: {
  name: string;
  email: string;
  day: string;
  time: string;
}) {
  return postJson("/api/discovery-calls", payload);
}

export async function submitInquiry(payload: {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  service?: string;
  projectSummary: string;
  budget?: string;
}) {
  return postJson("/api/inquiries", payload);
}

export async function uploadAsset(file: File, objectKey?: string) {
  const token = getAccessToken();
  const response = await fetch(`${API_BASE}/api/uploads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      "X-File-Name": file.name,
      ...(objectKey ? { "X-Object-Key": objectKey } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: await file.arrayBuffer(),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error((data as { error?: string }).error ?? "Upload failed");
  }

  return data as { ok: true; key: string };
}

export function buildSupabaseStorageUrl(params: {
  supabaseUrl: string;
  bucket: string;
  path: string;
}) {
  const base = params.supabaseUrl.replace(/\/$/, "");
  return `${base}/storage/v1/object/public/${params.bucket}/${params.path}`;
}

export async function signInWithPassword(email: string, password: string) {
  const { url, publishableKey } = getSupabaseEnv();
  const response = await fetch(`${url.replace(/\/$/, "")}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error((data as { error_description?: string; msg?: string }).error_description ?? (data as { msg?: string }).msg ?? "Sign in failed");
  }

  return data as {
    access_token: string;
    refresh_token?: string;
    user?: {
      email?: string;
      app_metadata?: { role?: string };
      user_metadata?: { full_name?: string; name?: string };
    };
  };
}

export async function signUpWithPassword(email: string, password: string) {
  const { url, publishableKey } = getSupabaseEnv();
  const response = await fetch(`${url.replace(/\/$/, "")}/auth/v1/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error((data as { msg?: string }).msg ?? "Sign up failed");
  }

  return data as {
    access_token?: string;
    refresh_token?: string;
    user?: {
      email?: string;
      app_metadata?: { role?: string };
      user_metadata?: { full_name?: string; name?: string };
    };
  };
}

