import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { fetchClients, fetchProjects } from "../../lib/api";
import { fetchInvoices } from "../../lib/invoices";
import { ArrowLeft, Mail, Phone, FolderOpen, Download, Loader2 } from "lucide-react";

type Client = { id: string; name: string; contact: string; email: string; phone: string; plan: string; status: string; joined: string; projects: number; spend: string };
type Project = { id: string; name: string; client: string; status: string; progress: number };
type Invoice = { id: string; client: string; project: string; amount: string; status: string; issued: string; due: string };

export default function AdminClientDetails() {
  const { id } = useParams();
  const [client, setClient] = useState<Client | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchClients().then((r) => r.clients.find((c) => c.id === id) ?? null).catch(() => null),
      fetchProjects().then((r) => r.projects.filter((p) => p.client === (client?.name ?? ""))).catch(() => []),
      fetchInvoices().then((r) => r.invoices.filter((inv) => inv.client === (client?.name ?? ""))).catch(() => []),
    ]).then(([c, p, inv]) => { setClient(c); setProjects(p); setInvoices(inv); }).finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="space-y-4">
        <Link to="/admin/clients" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors no-underline text-[13px]">
          <ArrowLeft className="w-4 h-4" /> Back to clients
        </Link>
        <p className="text-muted-foreground text-sm py-8 text-center">Client not found.</p>
      </div>
    );
  }

  const sc = client.status === "Active" ? "#16A34A" : client.status === "Paused" ? "#F59E0B" : client.status === "Completed" ? "#6150F6" : "#737370";
  const initials = client.name.split(" ").map((w) => w[0]).join("").slice(0, 2);

  return (
    <div className="space-y-6">
      <Link
        to="/admin/clients"
        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors no-underline text-[13px]"
      >
        <ArrowLeft className="w-4 h-4" /> Back to clients
      </Link>

      <div className="flex items-start gap-4 flex-wrap">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0 bg-brand text-base font-bold">
          {initials}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">{client.name}</h1>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: `${sc}18`, color: sc }}>
              {client.status}
            </span>
          </div>
          <p className="text-muted-foreground mt-0.5 text-sm">{client.plan} Plan · Joined {client.joined}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Projects", value: String(client.projects) },
          { label: "Total Spend", value: client.spend },
          { label: "Plan", value: client.plan },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-4 border border-border bg-card text-center">
            <p className="text-muted-foreground mb-1 text-xs">{s.label}</p>
            <p className="text-foreground text-xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-2xl p-5 border border-border bg-card">
            <h2 className="text-foreground mb-4 text-sm font-semibold">Projects</h2>
            {projects.length === 0 ? (
              <p className="text-muted-foreground text-[13px]">No projects found.</p>
            ) : (
              <div className="space-y-3">
                {projects.map((p) => {
                  const psc = p.status === "Completed" ? "#16A34A" : p.status === "In Progress" ? "#6150F6" : "#F59E0B";
                  return (
                    <div key={p.id} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${psc}18` }}>
                        <FolderOpen className="w-4 h-4" style={{ color: psc }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground text-[13px] font-medium">{p.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-secondary">
                            <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: psc }} />
                          </div>
                          <span className="text-muted-foreground shrink-0 text-[11px]">{p.progress}%</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full shrink-0 text-[11px] font-semibold" style={{ background: `${psc}18`, color: psc }}>{p.status}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="rounded-2xl p-5 border border-border bg-card">
            <h2 className="text-foreground mb-4 text-sm font-semibold">Invoices</h2>
            {invoices.length === 0 ? (
              <p className="text-muted-foreground text-[13px]">No invoices found.</p>
            ) : (
              <div className="space-y-3">
                {invoices.map((inv) => {
                  const isc = inv.status === "Paid" ? "#16A34A" : inv.status === "Pending" ? "#F59E0B" : "#EF4444";
                  return (
                    <div key={inv.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-foreground text-[13px] font-medium">{inv.id}</p>
                        <p className="text-muted-foreground text-[11px]">{inv.project} · Due {inv.due}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-foreground text-[13px] font-semibold">{inv.amount}</span>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: `${isc}18`, color: isc }}>{inv.status}</span>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl p-5 border border-border bg-card h-fit">
          <h2 className="text-foreground mb-4 text-sm font-semibold">Contact</h2>
          <div className="space-y-3">
            <div>
              <p className="text-muted-foreground text-[11px]">Primary Contact</p>
              <p className="text-foreground text-[13px] font-medium">{client.contact}</p>
            </div>
            <a
              href={`mailto:${client.email}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors no-underline text-[13px]"
            >
              <Mail className="w-4 h-4" /> {client.email}
            </a>
            <div className="flex items-center gap-2 text-muted-foreground text-[13px]">
              <Phone className="w-4 h-4" /> {client.phone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
