"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink } from "lucide-react";

interface Conversation {
  id: string;
  lastMessageAt: string | null;
  lastMessagePreview: string | null;
  hasUnread: boolean;
  lead: {
    name: string; company: string | null; avatarUrl: string | null; icpScore: number | null;
    campaign: { id: string; name: string };
  };
}

interface ConversationDetail {
  id: string;
  lead: {
    name: string; headline: string | null; company: string | null; location: string | null;
    avatarUrl: string | null; profileUrl: string; icpScore: number | null;
    campaign: { id: string; name: string };
  };
  messages: Array<{ id: string; content: string; direction: string; sentAt: string }>;
}

export default function InboxPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<ConversationDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    fetch("/api/inbox").then(r => r.json()).then(setConversations);
  }, []);

  async function selectConversation(id: string) {
    setLoadingDetail(true);
    const res = await fetch(`/api/inbox/${id}`);
    if (res.ok) setSelected(await res.json());
    setLoadingDetail(false);
    setConversations(prev => prev.map(c => c.id === id ? { ...c, hasUnread: false } : c));
  }

  return (
    <div className="flex h-[calc(100vh-120px)] rounded-xl border overflow-hidden"
      style={{ borderColor: "var(--border)" }}>
      {/* Left: conversation list */}
      <div className="w-72 shrink-0 border-r flex flex-col"
        style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div className="px-4 py-3 border-b font-semibold text-sm"
          style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>
          Inbox
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 && (
            <p className="p-6 text-sm text-center" style={{ color: "var(--text-muted)" }}>
              No conversations yet. Start a campaign to receive replies.
            </p>
          )}
          {conversations.map(conv => (
            <button key={conv.id} onClick={() => selectConversation(conv.id)}
              className="w-full flex items-start gap-3 px-4 py-3 border-b text-left hover:bg-gray-50 transition-colors"
              style={{
                borderColor: "var(--border)",
                background: selected?.id === conv.id ? "rgba(224,120,48,0.06)" : undefined,
              }}>
              <div className="relative shrink-0">
                <Avatar className="w-9 h-9">
                  <AvatarImage src={conv.lead.avatarUrl ?? undefined} />
                  <AvatarFallback style={{ background: "var(--bg-subtle)", fontSize: 13 }}>
                    {conv.lead.name?.charAt(0) ?? "?"}
                  </AvatarFallback>
                </Avatar>
                {conv.hasUnread && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
                    style={{ background: "var(--accent)" }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                    {conv.lead.name}
                  </span>
                  {conv.lastMessageAt && (
                    <span className="text-xs shrink-0 ml-1" style={{ color: "var(--text-muted)" }}>
                      {formatDistanceToNow(new Date(conv.lastMessageAt), { addSuffix: false })}
                    </span>
                  )}
                </div>
                {conv.lead.company && (
                  <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{conv.lead.company}</p>
                )}
                {conv.lastMessagePreview && (
                  <p className="text-xs truncate mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {conv.lastMessagePreview}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right: thread + profile */}
      {selected ? (
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col">
            <div className="px-5 py-3 border-b flex items-center gap-3"
              style={{ borderColor: "var(--border)" }}>
              <Avatar className="w-8 h-8">
                <AvatarImage src={selected.lead.avatarUrl ?? undefined} />
                <AvatarFallback style={{ background: "var(--bg-subtle)", fontSize: 12 }}>
                  {selected.lead.name?.charAt(0) ?? "?"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{selected.lead.name}</p>
                {selected.lead.company && (
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{selected.lead.company}</p>
                )}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {selected.messages.map(msg => (
                <div key={msg.id}
                  className={`flex ${msg.direction === "OUTBOUND" ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-xs px-3 py-2 rounded-2xl text-sm"
                    style={{
                      background: msg.direction === "OUTBOUND" ? "var(--accent)" : "var(--bg-subtle)",
                      color: msg.direction === "OUTBOUND" ? "#fff" : "var(--text-primary)",
                    }}>
                    {msg.content}
                    <p className="text-xs mt-1 opacity-70">
                      {new Date(msg.sentAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-52 shrink-0 border-l p-4 space-y-3"
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}>
            <Avatar className="w-14 h-14 mx-auto">
              <AvatarImage src={selected.lead.avatarUrl ?? undefined} />
              <AvatarFallback style={{ background: "var(--bg-base)", fontSize: 18 }}>
                {selected.lead.name?.charAt(0) ?? "?"}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{selected.lead.name}</p>
              {selected.lead.headline && (
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{selected.lead.headline}</p>
              )}
            </div>
            {selected.lead.icpScore !== null && (
              <div className="text-center">
                <Badge style={{ background: "transparent", border: "1px solid var(--accent)", color: "var(--accent)" }}>
                  ICP {selected.lead.icpScore}
                </Badge>
              </div>
            )}
            <div className="space-y-1 text-xs" style={{ color: "var(--text-muted)" }}>
              {selected.lead.company && <p>🏢 {selected.lead.company}</p>}
              {selected.lead.location && <p>📍 {selected.lead.location}</p>}
              <p>📋 {selected.lead.campaign.name}</p>
            </div>
            <a href={selected.lead.profileUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs underline" style={{ color: "var(--accent)" }}>
              <ExternalLink size={11} />LinkedIn profile
            </a>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          {loadingDetail ? (
            <p style={{ color: "var(--text-muted)" }}>Loading…</p>
          ) : (
            <p style={{ color: "var(--text-muted)" }}>Select a conversation</p>
          )}
        </div>
      )}
    </div>
  );
}
