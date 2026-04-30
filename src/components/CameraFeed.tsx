import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import type { Camera } from "@/stores/camera-store";

interface CameraFeedProps {
  camera: Camera;
  className?: string;
}

export function CameraFeed({ camera, className = "" }: CameraFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || camera.status === "offline" || !camera.streamUrl) {
      setError(true);
      return;
    }

    setError(false);
    
    if (camera.streamType === "mp4"){
    	video.src = camera.streamUrl;
    	video.loop = true;
    	video.muted = true;
    	video.play().catch(() => {});
    }

    else if (camera.streamType === "hls" && Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: false,
        lowLatencyMode: true,
      });
      hls.loadSource(camera.streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.ERROR, () => setError(true));
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      return () => hls.destroy();
    } else if (
      camera.streamType === "hls" &&
      video.canPlayType("application/vnd.apple.mpegurl")
    ) {
      video.src = camera.streamUrl;
      video.play().catch(() => {});
    } else {
      setError(true);
    }
  }, [camera.streamUrl, camera.status, camera.streamType]);

  if (camera.status === "offline" || error) {
    return (
      <div
        className={`relative flex items-center justify-center bg-background ${className}`}
      >
        <div className="scanline" />
        <div className="text-center">
          <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
            <svg
              className="h-6 w-6 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>
          <p className="text-xs font-medium text-muted-foreground">
            {camera.status === "offline" ? "Camera Offline" : "No Signal"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-background ${className}`}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        muted
        playsInline
        autoPlay
      />
      <div className="scanline" />
    </div>
  );
}
