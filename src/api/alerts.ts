// src/api/alerts.ts
export interface Alert {
  id: number;
  message: string;
  timestamp: string; // ISO string
}

export const mockAlerts: Alert[] = [
  { id: 1, message: "Overheat detected on Contactor #3", timestamp: "2026-06-20T08:30:00Z" },
  { id: 2, message: "Voltage drop observed on Line A", timestamp: "2026-06-21T12:15:00Z" },
  { id: 3, message: "Routine inspection completed", timestamp: "2026-06-22T09:45:00Z" },
];
