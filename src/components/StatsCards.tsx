import { Camera, Wifi, WifiOff, Video, AlertTriangle } from "lucide-react";
import { useCameraStore } from "@/stores/camera-store";

export function StatsCards() {
  const cameras = useCameraStore((s) => s.cameras);
  const alerts = useCameraStore((s) => s.alerts);

  const online = cameras.filter((c) => c.status === "online").length;
  const offline = cameras.filter((c) => c.status === "offline").length;
  const recording = cameras.filter((c) => c.isRecording).length;
  const motionAlerts = alerts.filter((a) => a.type === "motion").length;

  const stats = [
    { label: "Total Cameras", value: cameras.length, icon: Camera, color: "text-foreground" },
    { label: "Online", value: online, icon: Wifi, color: "text-success" },
    { label: "Offline", value: offline, icon: WifiOff, color: "text-alert" },
    { label: "Recording", value: recording, icon: Video, color: "text-primary" },
    { label: "Motion Alerts", value: motionAlerts, icon: AlertTriangle, color: "text-warning" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-card">
          <div className="flex items-center gap-2">
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
            <span className="text-xs text-muted-foreground">{stat.label}</span>
          </div>
          <p className={`mt-1 text-2xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
