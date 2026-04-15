import { createFileRoute } from "@tanstack/react-router";
import { Video } from "lucide-react";

export const Route = createFileRoute("/recordings")({
  head: () => ({
    meta: [
      { title: "Recordings — Sentinel Surveillance" },
      { name: "description", content: "View and manage recorded surveillance footage" },
    ],
  }),
  component: RecordingsPage,
});

function RecordingsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-bold text-foreground">Recordings</h1>
        <p className="text-xs text-muted-foreground">View and manage recorded footage</p>
      </div>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
          <Video className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground">No Recordings Yet</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Start recording from any camera to see footage here.
        </p>
      </div>
    </div>
  );
}
