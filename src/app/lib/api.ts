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

export async function subscribeNewsletter(email: string) {
  return postJson("/api/newsletter", { email });
}

export async function fetchTeam() {
  const token = getAccessToken();
  const response = await fetch(`${API_BASE}/api/team`, {
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error((data as { error?: string }).error ?? "Failed to fetch team");
  return data as { ok: true; team: { id: string; name: string; role: string; email: string; avatar: string; color: string; status: string }[] };
}

export async function fetchClients() {
  const token = getAccessToken();
  const response = await fetch(`${API_BASE}/api/clients`, {
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error((data as { error?: string }).error ?? "Failed to fetch clients");
  return data as { ok: true; clients: { id: string; name: string; contact: string; email: string; phone: string; plan: string; status: string; joined: string; projects: number; spend: string }[] };
}

export async function fetchProjects() {
  const token = getAccessToken();
  const response = await fetch(`${API_BASE}/api/projects`, {
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error((data as { error?: string }).error ?? "Failed to fetch projects");
  return data as { ok: true; projects: { id: string; name: string; client: string; status: string; progress: number; dueDate: string; type: string; budget: string; priority: string }[] };
}

export async function fetchTasks() {
  const token = getAccessToken();
  const response = await fetch(`${API_BASE}/api/tasks`, {
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error((data as { error?: string }).error ?? "Failed to fetch tasks");
  return data as { ok: true; tasks: { id: string; title: string; project: string; assignee: string; due: string; priority: string; status: string }[] };
}

export async function fetchMessages() {
  const token = getAccessToken();
  const response = await fetch(`${API_BASE}/api/messages`, {
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error((data as { error?: string }).error ?? "Failed to fetch messages");
  return data as { ok: true; messages: { id: string; from: string; avatar: string; color: string; project: string; preview: string; time: string; unread: boolean }[] };
}

export async function sendMessage(payload: { to_name: string; project: string; text: string }) {
  return postJson("/api/messages", payload);
}

export async function fetchSettings() {
  const token = getAccessToken();
  const response = await fetch(`${API_BASE}/api/settings`, {
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error((data as { error?: string }).error ?? "Failed to fetch settings");
  return data as { ok: true; settings: Record<string, unknown> };
}

export async function saveSettings(settings: Record<string, unknown>) {
  const token = getAccessToken();
  const response = await fetch(`${API_BASE}/api/settings`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(settings),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error((data as { error?: string }).error ?? "Failed to save settings");
  return data as { ok: true };
}

export type BlogPostRow = {
  id: string; slug: string; title: string; excerpt: string; content?: string;
  category: string; author: string; read_time: string; gradient: string; created_at: string;
};

export async function fetchBlogPosts() {
  const response = await fetch(`${API_BASE}/api/blog`);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error((data as { error?: string }).error ?? "Failed to fetch posts");
  return data as { ok: true; posts: BlogPostRow[] };
}

export async function fetchBlogPost(slug: string) {
  const response = await fetch(`${API_BASE}/api/blog/${slug}`);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error((data as { error?: string }).error ?? "Post not found");
  return data as { ok: true; post: BlogPostRow };
}

export async function createBlogPost(post: { slug: string; title: string; excerpt: string; content: string; category?: string; author?: string }) {
  return postJson("/api/blog", post);
}

export async function updateBlogPost(slug: string, updates: { title?: string; excerpt?: string; content?: string; category?: string; author?: string }) {
  const token = getAccessToken();
  const response = await fetch(`${API_BASE}/api/blog/${slug}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(updates),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error((data as { error?: string }).error ?? "Failed to update post");
  return data as { ok: true };
}

export async function deleteBlogPost(slug: string) {
  const token = getAccessToken();
  const response = await fetch(`${API_BASE}/api/blog/${slug}`, {
    method: "DELETE",
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error((data as { error?: string }).error ?? "Failed to delete post");
  return data as { ok: true };
}

export async function fetchNotifications() {
  const token = getAccessToken();
  const response = await fetch(`${API_BASE}/api/notifications`, {
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error((data as { error?: string }).error ?? "Failed to fetch notifications");
  return data as { ok: true; notifications: { id: string; type: string; recipient: string; subject: string; body: string; status: string; created_at: string }[] };
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

