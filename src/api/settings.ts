export interface Setting {
  key: string;
  value: string;
}

export const mockSettings: Setting[] = [
  { key: "DeviceName", value: "Contactor-01" },
  { key: "Location", value: "Plant A - Section 3" },
  { key: "TemperatureThreshold", value: "75°C" },
  { key: "VoltageThreshold", value: "220V" },
];
