import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Sentinel Surveillance" },
      { name: "description", content: "Configure surveillance system settings" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-bold text-foreground">Settings</h1>
        <p className="text-xs text-muted-foreground">Configure system preferences</p>
      </div>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
          <SettingsIcon className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground">Settings</p>
        <p className="mt-1 text-xs text-muted-foreground">
          System configuration options coming soon.
        </p>
      </div>
    </div>
  );
}
