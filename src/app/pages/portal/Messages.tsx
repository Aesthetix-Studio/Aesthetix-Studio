import { useState } from "react";
import { mockMessages } from "../../lib/data";
import { Send } from "lucide-react";

const conversation = [
  { id: 1, mine: false, author: "Anna Reeves", text: "The latest design directions look amazing! Could we jump on a quick call to discuss the color palette choices? I have a few notes on the typography spacing too.", time: "2:14 PM" },
  { id: 2, mine: true, author: "You", text: "Absolutely, I'm free tomorrow at 10 AM or 2 PM. The typography spacing was intentional — let me share my rationale so you can weigh in before we finalize.", time: "2:28 PM" },
  { id: 3, mine: false, author: "Anna Reeves", text: "10 AM works perfectly. Can you also send over the Figma link so I can add comments directly before our call? That'll make the review more efficient.", time: "2:31 PM" },
];

export default function PortalMessages() {
  const [selected, setSelected] = useState(mockMessages[0]);
  const [reply, setReply] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setReply("");
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-foreground" style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em" }}>Messages</h1>
        <p className="text-muted-foreground mt-1" style={{ fontSize: "14px" }}>Stay in sync with your studio team.</p>
      </div>

      <div className="flex gap-4 h-[600px]" style={{ minHeight: "500px" }}>
        {/* Thread List */}
        <div
          className="w-72 shrink-0 rounded-2xl border flex flex-col overflow-hidden"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="p-3 border-b" style={{ borderColor: "var(--border)" }}>
            <p className="text-foreground" style={{ fontSize: "13px", fontWeight: 600 }}>Conversations</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockMessages.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelected(m)}
                className="w-full text-left p-3 flex items-start gap-3 border-b transition-colors hover:bg-secondary/50"
                style={{
                  borderColor: "var(--border)",
                  background: selected.id === m.id ? "var(--secondary)" : undefined,
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white"
                  style={{ background: m.color, fontSize: "11px", fontWeight: 700 }}
                >
                  {m.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-foreground truncate" style={{ fontSize: "12px", fontWeight: 600 }}>{m.from}</span>
                    <span className="text-muted-foreground shrink-0" style={{ fontSize: "10px" }}>{m.time}</span>
                  </div>
                  <p className="text-muted-foreground truncate" style={{ fontSize: "11px" }}>{m.project}</p>
                  <p className="text-muted-foreground truncate" style={{ fontSize: "11px" }}>{m.preview}</p>
                </div>
                {m.unread && (
                  <div className="w-2 h-2 rounded-full shrink-0 mt-1" style={{ background: "var(--brand)" }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Message View */}
        <div
          className="flex-1 rounded-2xl border flex flex-col overflow-hidden"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          {/* Header */}
          <div className="p-4 border-b flex items-center gap-3" style={{ borderColor: "var(--border)" }}>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white"
              style={{ background: selected.color, fontSize: "11px", fontWeight: 700 }}
            >
              {selected.avatar}
            </div>
            <div>
              <p className="text-foreground" style={{ fontSize: "13px", fontWeight: 600 }}>{selected.from}</p>
              <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{selected.project}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {conversation.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.mine ? "flex-row-reverse" : ""}`}>
                {!msg.mine && (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white"
                    style={{ background: selected.color, fontSize: "10px", fontWeight: 700 }}
                  >
                    {selected.avatar}
                  </div>
                )}
                <div className={`max-w-[70%] ${msg.mine ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <div
                    className="px-4 py-2.5 rounded-2xl"
                    style={{
                      background: msg.mine ? "var(--foreground)" : "var(--secondary)",
                      color: msg.mine ? "var(--background)" : "var(--foreground)",
                      fontSize: "13px",
                      lineHeight: 1.5,
                    }}
                  >
                    {msg.text}
                  </div>
                  <span className="text-muted-foreground" style={{ fontSize: "10px" }}>{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Reply Input */}
          <form onSubmit={handleSend} className="p-4 border-t flex gap-3" style={{ borderColor: "var(--border)" }}>
            <input
              type="text"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write a message…"
              className="flex-1 h-10 px-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/30"
              style={{ fontSize: "13px" }}
            />
            <button
              type="submit"
              disabled={!reply.trim()}
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-foreground text-background disabled:opacity-40 hover:bg-foreground/90 transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
