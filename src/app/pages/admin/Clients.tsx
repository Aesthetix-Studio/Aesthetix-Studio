import { useState } from "react";
import { Link } from "react-router";
import { mockClients, statusColors } from "../../lib/data";
import { Search } from "lucide-react";

const planColors: Record<string, string> = {
  Starter: "#3B82F6",
  Growth: "#6150F6",
  Enterprise: "#F59E0B",
};

export default function AdminClients() {
  const [search, setSearch] = useState("");

  const filtered = mockClients.filter((c) => {
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.contact.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Clients</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage your active and past client relationships.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-brand text-white hover:bg-brand/90 transition-all text-sm font-semibold">
          + New Client
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search clients…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-9 pl-9 pr-3 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30 text-[13px]"
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary/50">
              {["Client", "Contact", "Plan", "Status", "Projects", "Total Spend", ""].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-muted-foreground text-[11px] font-semibold uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((client, i) => {
              const sc = statusColors[client.status] ?? "#737370";
              const pc = planColors[client.plan] ?? "#737370";
              const initials = client.name.split(" ").map((w) => w[0]).join("").slice(0, 2);
              return (
                <tr
                  key={client.id}
                  className="border-t border-border hover:bg-secondary/30 transition-colors"
                  style={{ background: i % 2 === 0 ? "var(--card)" : undefined }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white text-[11px] font-bold"
                        style={{ background: pc }}
                      >
                        {initials}
                      </div>
                      <div>
                        <p className="text-foreground text-[13px] font-semibold">{client.name}</p>
                        <p className="text-muted-foreground text-[11px]">Joined {client.joined}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-foreground text-[13px]">{client.contact}</p>
                    <p className="text-muted-foreground text-[11px]">{client.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
                      style={{ background: `${pc}18`, color: pc }}
                    >
                      {client.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
                      style={{ background: `${sc}18`, color: sc }}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-foreground text-[13px] font-medium">{client.projects}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-foreground text-[13px] font-semibold">{client.spend}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/admin/clients/${client.id}`}
                      className="text-brand hover:underline no-underline text-xs font-medium"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
