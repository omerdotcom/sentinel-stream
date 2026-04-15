import { create } from "zustand";

export interface Camera {
  id: string;
  name: string;
  location: string;
  group: string;
  streamUrl: string;
  streamType: "hls" | "webrtc" | "rtsp" | "rtmp" | "mock";
  status: "online" | "offline";
  isRecording: boolean;
  motionDetected: boolean;
  lastMotion: string | null;
  ptzSupported: boolean;
}

export interface AlertEvent {
  id: string;
  cameraId: string;
  cameraName: string;
  type: "motion" | "offline" | "online" | "recording";
  message: string;
  timestamp: string;
}

export type GridLayout = "1x1" | "2x2" | "4x4";

interface CameraStore {
  cameras: Camera[];
  alerts: AlertEvent[];
  gridLayout: GridLayout;
  selectedCameraId: string | null;
  setGridLayout: (layout: GridLayout) => void;
  setSelectedCamera: (id: string | null) => void;
  addCamera: (camera: Omit<Camera, "id" | "isRecording" | "motionDetected" | "lastMotion">) => void;
  updateCamera: (id: string, updates: Partial<Camera>) => void;
  deleteCamera: (id: string) => void;
  toggleRecording: (id: string) => void;
  addAlert: (alert: Omit<AlertEvent, "id" | "timestamp">) => void;
  simulateMotion: (id: string) => void;
}

const sampleCameras: Camera[] = [
  {
    id: "cam-1",
    name: "Main Entrance",
    location: "Building A - Ground Floor",
    group: "Entrances",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    streamType: "hls",
    status: "online",
    isRecording: true,
    motionDetected: false,
    lastMotion: null,
    ptzSupported: true,
  },
  {
    id: "cam-2",
    name: "Parking Lot",
    location: "Building A - Exterior",
    group: "Exterior",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    streamType: "hls",
    status: "online",
    isRecording: true,
    motionDetected: true,
    lastMotion: new Date().toISOString(),
    ptzSupported: true,
  },
  {
    id: "cam-3",
    name: "Lobby",
    location: "Building A - Ground Floor",
    group: "Interior",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    streamType: "hls",
    status: "online",
    isRecording: false,
    motionDetected: false,
    lastMotion: null,
    ptzSupported: false,
  },
  {
    id: "cam-4",
    name: "Backyard",
    location: "Building A - Exterior",
    group: "Exterior",
    streamUrl: "",
    streamType: "mock",
    status: "offline",
    isRecording: false,
    motionDetected: false,
    lastMotion: null,
    ptzSupported: false,
  },
  {
    id: "cam-5",
    name: "Server Room",
    location: "Building B - Basement",
    group: "Restricted",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    streamType: "hls",
    status: "online",
    isRecording: true,
    motionDetected: false,
    lastMotion: null,
    ptzSupported: false,
  },
  {
    id: "cam-6",
    name: "Warehouse",
    location: "Building C",
    group: "Storage",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    streamType: "hls",
    status: "online",
    isRecording: false,
    motionDetected: false,
    lastMotion: null,
    ptzSupported: true,
  },
];

const sampleAlerts: AlertEvent[] = [
  {
    id: "alert-1",
    cameraId: "cam-2",
    cameraName: "Parking Lot",
    type: "motion",
    message: "Motion detected in Parking Lot area",
    timestamp: new Date(Date.now() - 120000).toISOString(),
  },
  {
    id: "alert-2",
    cameraId: "cam-4",
    cameraName: "Backyard",
    type: "offline",
    message: "Camera went offline",
    timestamp: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: "alert-3",
    cameraId: "cam-1",
    cameraName: "Main Entrance",
    type: "recording",
    message: "Recording started",
    timestamp: new Date(Date.now() - 600000).toISOString(),
  },
];

export const useCameraStore = create<CameraStore>((set) => ({
  cameras: sampleCameras,
  alerts: sampleAlerts,
  gridLayout: "2x2",
  selectedCameraId: null,

  setGridLayout: (layout) => set({ gridLayout: layout }),
  setSelectedCamera: (id) => set({ selectedCameraId: id }),

  addCamera: (camera) =>
    set((state) => ({
      cameras: [
        ...state.cameras,
        {
          ...camera,
          id: `cam-${Date.now()}`,
          isRecording: false,
          motionDetected: false,
          lastMotion: null,
        },
      ],
    })),

  updateCamera: (id, updates) =>
    set((state) => ({
      cameras: state.cameras.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    })),

  deleteCamera: (id) =>
    set((state) => ({
      cameras: state.cameras.filter((c) => c.id !== id),
    })),

  toggleRecording: (id) =>
    set((state) => ({
      cameras: state.cameras.map((c) =>
        c.id === id ? { ...c, isRecording: !c.isRecording } : c
      ),
    })),

  addAlert: (alert) =>
    set((state) => ({
      alerts: [
        {
          ...alert,
          id: `alert-${Date.now()}`,
          timestamp: new Date().toISOString(),
        },
        ...state.alerts,
      ].slice(0, 50),
    })),

  simulateMotion: (id) =>
    set((state) => {
      const camera = state.cameras.find((c) => c.id === id);
      if (!camera) return state;
      return {
        cameras: state.cameras.map((c) =>
          c.id === id
            ? { ...c, motionDetected: true, lastMotion: new Date().toISOString() }
            : c
        ),
        alerts: [
          {
            id: `alert-${Date.now()}`,
            cameraId: id,
            cameraName: camera.name,
            type: "motion" as const,
            message: `Motion detected at ${camera.name}`,
            timestamp: new Date().toISOString(),
          },
          ...state.alerts,
        ].slice(0, 50),
      };
    }),
}));
