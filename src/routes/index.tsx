import { createFileRoute } from "@tanstack/react-router";
import { StatsCards } from "@/components/StatsCards";
import { CameraGrid } from "@/components/CameraGrid";
import { EventLog } from "@/components/EventLog";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-bold text-foreground">Dashboard</h1>
        <p className="text-xs text-muted-foreground">Real-time surveillance overview</p>
      </div>

      <StatsCards />

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <CameraGrid />
        <EventLog />
      </div>
    </div>
  );
}
