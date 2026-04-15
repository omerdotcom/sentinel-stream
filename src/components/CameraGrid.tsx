import { useCameraStore } from "@/stores/camera-store";
import { CameraCard } from "./CameraCard";
import { Grid2x2, Grid3x3, Square, Plus, Search } from "lucide-react";
import { useState } from "react";
import { AddCameraDialog } from "./AddCameraDialog";
import { FullscreenCamera } from "./FullscreenCamera";

export function CameraGrid() {
  const { cameras, gridLayout, setGridLayout } = useCameraStore();
  const [search, setSearch] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [fullscreenCamId, setFullscreenCamId] = useState<string | null>(null);

  const filtered = cameras.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.group.toLowerCase().includes(search.toLowerCase())
  );

  const gridCols = {
    "1x1": "grid-cols-1",
    "2x2": "grid-cols-1 sm:grid-cols-2",
    "4x4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  const fullscreenCam = cameras.find((c) => c.id === fullscreenCamId);

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search cameras..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 rounded-md border border-input bg-secondary pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Grid layout buttons */}
          <div className="flex items-center rounded-md border border-border">
            <button
              onClick={() => setGridLayout("1x1")}
              className={`p-1.5 ${
                gridLayout === "1x1"
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="1x1 Grid"
            >
              <Square className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setGridLayout("2x2")}
              className={`border-x border-border p-1.5 ${
                gridLayout === "2x2"
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="2x2 Grid"
            >
              <Grid2x2 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setGridLayout("4x4")}
              className={`p-1.5 ${
                gridLayout === "4x4"
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="4x4 Grid"
            >
              <Grid3x3 className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            onClick={() => setShowAddDialog(true)}
            className="flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Camera
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className={`grid gap-3 ${gridCols[gridLayout]}`}>
        {filtered.map((camera) => (
          <CameraCard
            key={camera.id}
            camera={camera}
            onFullscreen={() => setFullscreenCamId(camera.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-1 items-center justify-center py-20">
          <p className="text-sm text-muted-foreground">No cameras found</p>
        </div>
      )}

      {showAddDialog && (
        <AddCameraDialog onClose={() => setShowAddDialog(false)} />
      )}

      {fullscreenCam && (
        <FullscreenCamera
          camera={fullscreenCam}
          onClose={() => setFullscreenCamId(null)}
        />
      )}
    </div>
  );
}
