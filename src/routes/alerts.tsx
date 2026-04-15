import { createFileRoute } from "@tanstack/react-router";
import { EventLog } from "@/components/EventLog";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts — Sentinel Surveillance" },
      { name: "description", content: "View surveillance alerts and motion detection events" },
    ],
  }),
  component: AlertsPage,
});

function AlertsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-bold text-foreground">Alerts</h1>
        <p className="text-xs text-muted-foreground">Motion detection and system alerts</p>
      </div>
      <div className="max-w-2xl">
        <EventLog />
      </div>
    </div>
  );
}
