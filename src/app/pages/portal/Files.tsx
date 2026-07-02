import { useEffect, useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import { fetchUploads, type UploadedFile } from "../../lib/uploads";

const guessFolder = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes("brand") || lower.includes("logo") || lower.includes("typography") || lower.includes("color")) return "Brand Identity";
  if (lower.includes("home") || lower.includes("fig") || lower.includes("web")) return "Web Design";
  if (lower.includes("social") || lower.includes("campaign") || lower.includes("marketing")) return "Marketing";
  return "All";
};

const guessIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.endsWith(".zip")) return "📦";
  if (lower.endsWith(".fig") || lower.endsWith(".ase")) return "🎨";
  return "📄";
};

export default function PortalFiles() {
  const [search, setSearch] = useState("");
  const [activeFolder, setActiveFolder] = useState("All");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchUploads();
        if (!active) return;
        setFiles(result);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load files");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  const folders = useMemo(() => ["All", ...Array.from(new Set(files.map((f) => guessFolder(f.name))))], [files]);
  const filtered = files.filter((f) => {
    const folder = guessFolder(f.name);
    const matchFolder = activeFolder === "All" || folder === activeFolder;
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchFolder && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground" style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em" }}>Files</h1>
        <p className="text-muted-foreground mt-1" style={{ fontSize: "14px" }}>All deliverables and assets shared with you.</p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search files…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30"
            style={{ fontSize: "13px" }}
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {folders.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFolder(f)}
              className="px-3 py-1.5 rounded-lg transition-all"
              style={{
                fontSize: "12px",
                fontWeight: 500,
                background: activeFolder === f ? "var(--foreground)" : "var(--secondary)",
                color: activeFolder === f ? "var(--background)" : "var(--muted-foreground)",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: "var(--secondary)" }}>
              <th className="text-left px-4 py-3 text-muted-foreground" style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Name</th>
              <th className="text-left px-4 py-3 text-muted-foreground hidden md:table-cell" style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Folder</th>
              <th className="text-left px-4 py-3 text-muted-foreground hidden sm:table-cell" style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Size</th>
              <th className="text-left px-4 py-3 text-muted-foreground hidden sm:table-cell" style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground" style={{ fontSize: "13px" }}>
                  Loading files...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground" style={{ fontSize: "13px" }}>
                  {error}
                </td>
              </tr>
            ) : filtered.map((f, i) => {
              const folder = guessFolder(f.name);
              return (
                <tr
                  key={f.key}
                  className="border-t hover:bg-secondary/50 transition-colors"
                  style={{ borderColor: "var(--border)", background: i % 2 === 0 ? "var(--card)" : undefined }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span style={{ fontSize: "18px" }}>{guessIcon(f.name)}</span>
                      <span className="text-foreground" style={{ fontSize: "13px", fontWeight: 500 }}>{f.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-muted-foreground" style={{ fontSize: "13px" }}>{folder}</span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-muted-foreground" style={{ fontSize: "13px" }}>
                      {typeof f.size === "number" ? `${(f.size / 1024 / 1024).toFixed(1)} MB` : "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-muted-foreground" style={{ fontSize: "13px" }}>
                      {f.updatedAt ? new Date(f.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <a
                      href={f.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors ml-auto px-2.5 py-1.5 rounded-lg hover:bg-secondary"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span style={{ fontSize: "12px" }}>Download</span>
                    </a>
                  </td>
                </tr>
              );
            })}
            {!loading && !error && filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground" style={{ fontSize: "13px" }}>
                  No files match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
