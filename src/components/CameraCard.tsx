import { useState, useEffect } from "react";
import {
  Maximize2,
  Circle,
  Video,
  VideoOff,
  MoreVertical,
  Trash2,
  Edit,
  Camera as CameraIcon,
  Move,
} from "lucide-react";
import type { Camera } from "@/stores/camera-store";
import { useCameraStore } from "@/stores/camera-store";
import { CameraFeed } from "./CameraFeed";

interface CameraCardProps {
  camera: Camera;
  onFullscreen?: () => void;
  onEdit?: () => void;
}

export function CameraCard({ camera, onFullscreen, onEdit }: CameraCardProps) {
  const { toggleRecording, deleteCamera, simulateMotion } = useCameraStore();
  const [showMenu, setShowMenu] = useState(false);
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`camera-tile group relative flex flex-col ${
        camera.motionDetected ? "camera-tile-alert" : ""
      }`}
    >
      {/* Feed area */}
      <div className="relative aspect-video">
        <CameraFeed camera={camera} className="h-full w-full" />

        {/* Overlay info */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-2">
          <div className="flex items-center gap-1.5">
            <div
              className={`status-dot ${
                camera.status === "online" ? "status-dot-online" : "status-dot-offline"
              }`}
            />
            {camera.isRecording && (
              <span className="rec-badge">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-alert-foreground"
                  style={{ animation: "rec-blink 1s infinite" }}
                />
                REC
              </span>
            )}
            {camera.motionDetected && <span className="motion-badge">Motion</span>}
          </div>
        </div>

        {/* Bottom overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-2">
          <p className="text-xs font-semibold text-foreground">{camera.name}</p>
          <p className="text-[10px] text-muted-foreground">{camera.location}</p>
        </div>

        {/* Hover controls */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/40 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={onFullscreen}
            className="rounded-md bg-card/80 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-accent"
            title="Fullscreen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => toggleRecording(camera.id)}
            className="rounded-md bg-card/80 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-accent"
            title={camera.isRecording ? "Stop Recording" : "Start Recording"}
          >
            {camera.isRecording ? (
              <VideoOff className="h-4 w-4 text-alert" />
            ) : (
              <Video className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => {/* snapshot placeholder */}}
            className="rounded-md bg-card/80 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-accent"
            title="Snapshot"
          >
            <CameraIcon className="h-4 w-4" />
          </button>
          {camera.ptzSupported && (
            <button
              className="rounded-md bg-card/80 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-accent"
              title="PTZ Control"
            >
              <Move className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between border-t border-border px-2 py-1.5">
        <span className="font-mono text-[10px] text-muted-foreground" suppressHydrationWarning>
          {time ? time.toLocaleTimeString("en-US", { hour12: false }) : "--:--:--"}
        </span>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <MoreVertical className="h-3.5 w-3.5" />
          </button>
          {showMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
              <div className="absolute bottom-full right-0 z-50 mb-1 w-36 rounded-md border border-border bg-popover py-1 shadow-lg">
                <button
                  onClick={() => {
                    onEdit?.();
                    setShowMenu(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-foreground hover:bg-accent"
                >
                  <Edit className="h-3 w-3" />
                  Edit Camera
                </button>
                <button
                  onClick={() => {
                    simulateMotion(camera.id);
                    setShowMenu(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-foreground hover:bg-accent"
                >
                  <Circle className="h-3 w-3" />
                  Simulate Motion
                </button>
                <button
                  onClick={() => {
                    deleteCamera(camera.id);
                    setShowMenu(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-alert hover:bg-accent"
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
