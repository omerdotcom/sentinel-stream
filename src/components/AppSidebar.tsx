import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Camera,
  Video,
  Bell,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useCameraStore } from "@/stores/camera-store";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/cameras", icon: Camera, label: "Cameras" },
  { to: "/recordings", icon: Video, label: "Recordings" },
  { to: "/alerts", icon: Bell, label: "Alerts" },
  { to: "/settings", icon: Settings, label: "Settings" },
] as const;

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const alerts = useCameraStore((s) => s.alerts);
  const unreadAlerts = alerts.filter(
    (a) => Date.now() - new Date(a.timestamp).getTime() < 3600000
  ).length;

  return (
    <aside
      className={`flex flex-col border-r border-border bg-sidebar transition-all duration-200 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-3">
        <Shield className="h-7 w-7 shrink-0 text-primary" />
        {!collapsed && (
          <span className="text-sm font-bold tracking-wide text-foreground">
            CYBER GUARD
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const isActive =
            item.to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.to);
          return (
            <Link key={item.to} to={item.to} className="block">
              <div className={`nav-item ${isActive ? "nav-item-active" : ""}`}>
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
                {!collapsed && item.label === "Alerts" && unreadAlerts > 0 && (
                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-alert px-1 text-[10px] font-bold text-alert-foreground">
                    {unreadAlerts}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-sidebar-border p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="nav-item w-full justify-center"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
