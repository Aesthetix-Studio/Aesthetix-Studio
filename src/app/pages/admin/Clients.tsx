import { useState, useEffect } from "react";
import { Link } from "react-router";
import { fetchClients } from "../../lib/api";
import { Search, Loader2 } from "lucide-react";

type Client = { id: string; name: string; contact: string; email: string; phone: string; plan: string; status: string; joined: string; projects: number; spend: string };

const statusColors: Record<string, string> = {
  Active: "#16A34A", Paused: "#F59E0B", Completed: "#6150F6", Churned: "#DC2626", Prospect: "#3B82F6",
};

export default function AdminClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchClients().then((r) => setClients(r.clients)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = clients.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.contact.toLowerCase().includes(search.toLowerCase()) || c.plan.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Clients</h1>
        <p className="text-muted-foreground mt-1 text-sm">View and manage all clients.</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search clients..." className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-card text-foreground text-sm outline-none focus:border-brand transition-colors" />
        </div>
      </div>

      <div className="rounded-2xl border border-border overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-muted-foreground text-xs font-medium uppercase tracking-wider">Client</th>
                <th className="px-4 py-3 text-muted-foreground text-xs font-medium uppercase tracking-wider">Projects</th>
                <th className="px-4 py-3 text-muted-foreground text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-muted-foreground text-xs font-medium uppercase tracking-wider">Plan</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground text-sm">No clients found.</td></tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-secondary transition-colors">
                    <td className="px-4 py-3">
                      <Link to={`/admin/clients/${c.id}`} className="text-foreground no-underline hover:text-brand transition-colors font-semibold text-sm">{c.name}</Link>
                      <p className="text-muted-foreground text-xs">{c.contact}</p>
                    </td>
                    <td className="px-4 py-3 text-foreground text-sm">{c.projects}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ background: `${statusColors[c.status] ?? "#737370"}18`, color: statusColors[c.status] ?? "#737370" }}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-foreground text-sm">{c.plan}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
