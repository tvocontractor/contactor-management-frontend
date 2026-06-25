// src/data/devices.ts
export interface Device {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  voltage: number; // volts
  current: number; // amps
}

export const devices: Device[] = [
  { id: '1', name: 'Contactor A', status: 'online', voltage: 220, current: 10 },
  { id: '2', name: 'Contactor B', status: 'offline', voltage: 0, current: 0 },
  { id: '3', name: 'Contactor C', status: 'maintenance', voltage: 110, current: 5 },
  { id: '4', name: 'Contactor D', status: 'online', voltage: 220, current: 12 },
];
