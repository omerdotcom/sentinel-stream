import { useState } from "react";
import { X } from "lucide-react";
import { useCameraStore } from "@/stores/camera-store";
import type { Camera } from "@/stores/camera-store";

interface AddCameraDialogProps {
  onClose: () => void;
  editCamera?: Camera;
}

export function AddCameraDialog({ onClose, editCamera }: AddCameraDialogProps) {
  const { addCamera, updateCamera } = useCameraStore();
  const [name, setName] = useState(editCamera?.name ?? "");
  const [location, setLocation] = useState(editCamera?.location ?? "");
  const [group, setGroup] = useState(editCamera?.group ?? "");
  const [streamUrl, setStreamUrl] = useState(editCamera?.streamUrl ?? "");
  const [streamType, setStreamType] = useState<Camera["streamType"]>(
    editCamera?.streamType ?? "mp4"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editCamera) {
      updateCamera(editCamera.id, { name, location, group, streamUrl, streamType });
    } else {
      addCamera({
        name,
        location,
        group,
        streamUrl,
        streamType,
        status: streamUrl ? "online" : "offline",
        ptzSupported: false,
      });
    }
    onClose();
  };

  const inputClass =
    "w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            {editCamera ? "Edit Camera" : "Add New Camera"}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Camera Name
            </label>
            <input
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Front Door"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Location
            </label>
            <input
              className={inputClass}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Building A - Ground Floor"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Group
            </label>
            <input
              className={inputClass}
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              placeholder="e.g. Entrances"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Stream URL
            </label>
            <input
              className={inputClass}
              value={streamUrl}
              onChange={(e) => setStreamUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Stream Type
            </label>
            <select
              className={inputClass}
              value={streamType}
              onChange={(e) => setStreamType(e.target.value as Camera["streamType"])}
            >
              <option value="hls">HLS</option>
              <option value="webrtc">WebRTC</option>
              <option value="rtsp">RTSP</option>
              <option value="rtmp">RTMP</option>
              <option value="mp4">MP4 / File</option>
              <option value="mock">Mock / Test</option>
            </select>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-md border border-border bg-secondary py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {editCamera ? "Save Changes" : "Add Camera"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
