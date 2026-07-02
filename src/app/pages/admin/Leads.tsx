import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Search } from "lucide-react";
import { fetchLeads, type LeadRow } from "../../lib/leads";

const statusColors: Record<string, string> = {
  "Hot": "#EF4444", "Warm": "#F59E0B", "Cold": "#737370",
};

const statuses = ["All", "Hot", "Warm", "Cold"];

export default function AdminLeads() {
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchLeads();
        if (mounted) setLeads(data);
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : "Failed to load leads");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = leads.filter((l) => {
    const matchStatus = activeStatus === "All" || l.status === activeStatus;
    const q = search.toLowerCase();
    const matchSearch = l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q) || l.service.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Leads</h1>
          <p className="text-muted-foreground mt-1 text-sm">Track and manage incoming project inquiries.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-brand text-white hover:bg-brand/90 transition-all text-sm font-semibold">
          + New Lead
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search leads…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30 text-[13px]"
          />
        </div>
        <div className="flex gap-1">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setActiveStatus(s)}
              className={`px-3 py-1.5 rounded-lg transition-all text-xs font-medium ${
                activeStatus === s
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {error && <p className="text-destructive text-[13px]">{error}</p>}
      <div className="rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary/50">
              {["Name", "Company", "Service", "Budget", "Status", "Source", "Date", ""].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-muted-foreground text-[11px] font-semibold uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-6 text-muted-foreground text-[13px]" colSpan={8}>Loading leads…</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-muted-foreground text-[13px]" colSpan={8}>No leads found.</td>
              </tr>
            ) : filtered.map((lead, i) => {
              const sc = statusColors[lead.status] ?? "#737370";
              const initials = lead.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
              return (
                <tr
                  key={lead.id}
                  className="border-t border-border hover:bg-secondary/30 transition-colors"
                  style={{ background: i % 2 === 0 ? "var(--card)" : undefined }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-[11px] font-bold"
                        style={{ background: sc }}
                      >
                        {initials}
                      </div>
                      <span className="text-foreground text-[13px] font-medium">{lead.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-muted-foreground text-[13px]">{lead.company}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-muted-foreground text-[13px]">{lead.service}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-foreground text-[13px] font-medium">{lead.budget}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
                      style={{ background: `${sc}18`, color: sc }}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-muted-foreground text-[13px]">{lead.source}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-muted-foreground text-[13px]">{lead.date}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/admin/leads/${lead.id}`}
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
