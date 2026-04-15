import { X, Video, VideoOff, Camera as CameraIcon, Move } from "lucide-react";
import type { Camera } from "@/stores/camera-store";
import { useCameraStore } from "@/stores/camera-store";
import { CameraFeed } from "./CameraFeed";
import { useEffect } from "react";

interface FullscreenCameraProps {
  camera: Camera;
  onClose: () => void;
}

export function FullscreenCamera({ camera, onClose }: FullscreenCameraProps) {
  const { toggleRecording } = useCameraStore();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="flex items-center gap-3">
          <div
            className={`status-dot ${
              camera.status === "online" ? "status-dot-online" : "status-dot-offline"
            }`}
          />
          <span className="text-sm font-semibold text-foreground">{camera.name}</span>
          <span className="text-xs text-muted-foreground">{camera.location}</span>
          {camera.isRecording && <span className="rec-badge"><span className="inline-block h-1.5 w-1.5 rounded-full bg-alert-foreground" style={{ animation: "rec-blink 1s infinite" }} />REC</span>}
          {camera.motionDetected && <span className="motion-badge">Motion</span>}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleRecording(camera.id)}
            className="rounded-md bg-secondary p-2 text-foreground transition-colors hover:bg-accent"
          >
            {camera.isRecording ? <VideoOff className="h-4 w-4 text-alert" /> : <Video className="h-4 w-4" />}
          </button>
          <button className="rounded-md bg-secondary p-2 text-foreground transition-colors hover:bg-accent">
            <CameraIcon className="h-4 w-4" />
          </button>
          {camera.ptzSupported && (
            <button className="rounded-md bg-secondary p-2 text-foreground transition-colors hover:bg-accent">
              <Move className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-md bg-secondary p-2 text-foreground transition-colors hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1">
        <CameraFeed camera={camera} className="h-full w-full" />
      </div>
    </div>
  );
}
