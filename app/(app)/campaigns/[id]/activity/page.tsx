"use client";
import { useEffect, useState, use } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Event { id: string; type: string; createdAt: string }

export default function ActivityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [selected, setSelected] = useState(new Date());
  const [month, setMonth] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch(`/api/campaigns/${id}/events?date=${selected.toISOString()}`)
      .then(r => r.json()).then(setEvents);
  }, [id, selected]);

  const days = eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) });
  const firstDay = (startOfMonth(month).getDay() + 6) % 7;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="rounded-xl border p-5" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setMonth(m => new Date(m.getFullYear(), m.getMonth() - 1, 1))}>
            <ChevronLeft size={16} style={{ color: "var(--text-muted)" }} />
          </button>
          <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{format(month, "MMMM yyyy")}</p>
          <button onClick={() => setMonth(m => new Date(m.getFullYear(), m.getMonth() + 1, 1))}>
            <ChevronRight size={16} style={{ color: "var(--text-muted)" }} />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-xs text-center mb-1">
          {["Mo","Tu","We","Th","Fr","Sa","Su"].map(d => <span key={d} style={{ color: "var(--text-muted)" }}>{d}</span>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
          {days.map(day => {
            const isSelected = isSameDay(day, selected);
            const isToday = isSameDay(day, new Date());
            return (
              <button key={day.toISOString()} onClick={() => setSelected(day)}
                className="h-8 w-full rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: isSelected ? "var(--accent)" : isToday ? "rgba(224,120,48,0.1)" : "transparent",
                  color: isSelected ? "#fff" : isToday ? "var(--accent)" : "var(--text-primary)",
                }}>
                {format(day, "d")}
              </button>
            );
          })}
        </div>
      </div>
      <div className="rounded-xl border p-5" style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
        <p className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{format(selected, "EEE, MMM d")}</p>
        <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>{events.length} events</p>
        {events.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>No events on this day.</p>
        ) : (
          <ul className="space-y-2">
            {events.map(ev => (
              <li key={ev.id} className="flex items-center gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--accent)" }} />
                <span style={{ color: "var(--text-primary)" }}>{ev.type.replace(/_/g, " ").toLowerCase()}</span>
                <span className="ml-auto text-xs" style={{ color: "var(--text-muted)" }}>{format(new Date(ev.createdAt), "HH:mm")}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
