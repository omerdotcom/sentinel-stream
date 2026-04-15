import { Camera, Wifi, WifiOff, Clock, User } from "lucide-react";
import { useCameraStore } from "@/stores/camera-store";
import { useEffect, useState } from "react";

export function TopBar() {
  const cameras = useCameraStore((s) => s.cameras);
  const online = cameras.filter((c) => c.status === "online").length;
  const offline = cameras.filter((c) => c.status === "offline").length;
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm">
          <Camera className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Total:</span>
          <span className="font-semibold text-foreground">{cameras.length}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Wifi className="h-4 w-4 text-success" />
          <span className="text-success">{online} Online</span>
        </div>
        {offline > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <WifiOff className="h-4 w-4 text-alert" />
            <span className="text-alert">{offline} Offline</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span className="font-mono text-xs">
            {time
              ? `${time.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} ${time.toLocaleTimeString("en-US", { hour12: false })}`
              : "\u00A0"}
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-accent px-3 py-1.5">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">Admin</span>
        </div>
      </div>
    </header>
  );
}
