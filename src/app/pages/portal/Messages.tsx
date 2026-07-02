import { useEffect, useState } from "react";
import { fetchMessages, sendMessage } from "../../lib/api";
import { Send, Loader2 } from "lucide-react";

type Message = { id: string; from: string; avatar: string; color: string; project: string; preview: string; time: string; unread: boolean };

export default function PortalMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchMessages()
      .then((r) => { setMessages(r.messages); if (r.messages.length > 0) setSelected(r.messages[0]); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selected) return;
    setSending(true);
    try {
      await sendMessage({ to_name: selected.from, project: selected.project, text: newMessage.trim() });
      setNewMessage("");
    } catch {} finally {
      setSending(false);
    }
  };

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
        <h1 className="text-foreground" style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em" }}>Messages</h1>
        <p className="text-muted-foreground mt-1" style={{ fontSize: "14px" }}>Communicate with your project team.</p>
      </div>

      <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)", height: "520px" }}>
        <div className="flex h-full">
          <div className="w-72 shrink-0 border-r overflow-y-auto" style={{ borderColor: "var(--border)" }}>
            {messages.length === 0 ? (
              <p className="text-muted-foreground text-sm p-4">No conversations yet.</p>
            ) : (
              messages.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelected(m)}
                  className="w-full text-left flex items-start gap-3 p-3 border-b transition-colors"
                  style={{ borderColor: "var(--border)", background: selected?.id === m.id ? "var(--secondary)" : "transparent" }}
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white" style={{ background: m.color, fontSize: "11px", fontWeight: 700 }}>
                    {m.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-foreground" style={{ fontSize: "13px", fontWeight: 600 }}>{m.from}</span>
                      <span className="text-muted-foreground shrink-0" style={{ fontSize: "11px" }}>{m.time}</span>
                    </div>
                    <p className="text-muted-foreground truncate" style={{ fontSize: "12px" }}>{m.preview}</p>
                  </div>
                  {m.unread && <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: "var(--brand)" }} />}
                </button>
              ))
            )}
          </div>

          <div className="flex-1 flex flex-col">
            {selected ? (
              <>
                <div className="p-4 border-b flex items-center gap-3" style={{ borderColor: "var(--border)" }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ background: selected.color, fontSize: "11px", fontWeight: 700 }}>
                    {selected.avatar}
                  </div>
                  <div>
                    <p className="text-foreground" style={{ fontSize: "14px", fontWeight: 600 }}>{selected.from}</p>
                    <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{selected.project}</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 flex items-end">
                  <div className="w-full max-w-md p-4 rounded-2xl" style={{ background: "var(--secondary)" }}>
                    <p className="text-foreground" style={{ fontSize: "13px" }}>{selected.preview}</p>
                    <p className="text-muted-foreground mt-2" style={{ fontSize: "11px" }}>{selected.time}</p>
                  </div>
                </div>

                <form onSubmit={handleSend} className="p-4 border-t flex items-center gap-3" style={{ borderColor: "var(--border)" }}>
                  <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2.5 rounded-xl border text-foreground text-sm"
                    style={{ background: "var(--secondary)", borderColor: "var(--border)", fontSize: "13px" }}
                  />
                  <button type="submit" disabled={sending || !newMessage.trim()} className="w-10 h-10 rounded-xl flex items-center justify-center text-white disabled:opacity-50" style={{ background: "var(--brand)" }}>
                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Select a conversation</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
