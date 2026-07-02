const SESSION_KEY = "aesthetix.supabase.session";

export type SupabaseSession = {
  accessToken: string;
  refreshToken?: string;
  role?: string;
  email?: string;
  displayName?: string;
};

export function getSession(): SupabaseSession | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SupabaseSession;
  } catch {
    return null;
  }
}

export function setSession(session: SupabaseSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getAccessToken() {
  return getSession()?.accessToken ?? null;
}

export function getSupabaseEnv() {
  return {
    url: import.meta.env.VITE_SUPABASE_URL ?? "",
    publishableKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "",
  };
}

export async function refreshSession() {
  const session = getSession();
  if (!session?.accessToken) return null;

  const base = import.meta.env.VITE_API_BASE_URL ?? "";
  const response = await fetch(`${base}/api/auth/me`, {
    headers: { Authorization: `Bearer ${session.accessToken}` },
  });

  if (!response.ok) {
    clearSession();
    return null;
  }

  const data = await response.json();
  const nextSession: SupabaseSession = {
    ...session,
    email: data?.user?.email ?? session.email,
    role: data?.user?.role ?? session.role,
    displayName: data?.user?.displayName ?? session.displayName ?? data?.user?.email ?? session.email,
  };

  setSession(nextSession);
  return nextSession;
}
