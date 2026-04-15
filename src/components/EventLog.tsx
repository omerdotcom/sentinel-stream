import { AlertTriangle, WifiOff, Wifi, Video } from "lucide-react";
import { useCameraStore } from "@/stores/camera-store";

const iconMap = {
  motion: AlertTriangle,
  offline: WifiOff,
  online: Wifi,
  recording: Video,
};

const colorMap = {
  motion: "text-alert",
  offline: "text-alert",
  online: "text-success",
  recording: "text-primary",
};

export function EventLog() {
  const alerts = useCameraStore((s) => s.alerts);

  function timeAgo(ts: string) {
    const diff = Date.now() - new Date(ts).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }

  return (
    <div className="stat-card">
      <h3 className="mb-3 text-sm font-semibold text-foreground">Recent Events</h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {alerts.slice(0, 10).map((alert) => {
          const Icon = iconMap[alert.type];
          return (
            <div
              key={alert.id}
              className="flex items-start gap-2 rounded-md bg-secondary/50 p-2"
            >
              <Icon className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${colorMap[alert.type]}`} />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-foreground">{alert.message}</p>
                <p className="text-[10px] text-muted-foreground">
                  {alert.cameraName} · {timeAgo(alert.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
        {alerts.length === 0 && (
          <p className="py-4 text-center text-xs text-muted-foreground">No events</p>
        )}
      </div>
    </div>
  );
}
