import { createFileRoute } from "@tanstack/react-router";
import { CameraGrid } from "@/components/CameraGrid";

export const Route = createFileRoute("/cameras")({
  head: () => ({
    meta: [
      { title: "Cameras — Sentinel Surveillance" },
      { name: "description", content: "Manage and monitor all surveillance cameras" },
    ],
  }),
  component: CamerasPage,
});

function CamerasPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-bold text-foreground">Cameras</h1>
        <p className="text-xs text-muted-foreground">Manage and monitor all cameras</p>
      </div>
      <CameraGrid />
    </div>
  );
}
