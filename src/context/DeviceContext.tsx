// src/context/DeviceContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Device, devices as initialDevices } from "../data/devices";

type DeviceContextType = {
  devices: Device[];
  addDevice: (device: Omit<Device, "id">) => void;
  // Fixed: added missing closing “>” for the generic type
  updateDevice: (id: string, updates: Partial<Omit<Device, "id">>) => void;
  removeDevice: (id: string) => void;
};

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const useDeviceContext = () => {
  const ctx = useContext(DeviceContext);
  if (!ctx) {
    throw new Error(
      "useDeviceContext must be used within DeviceProvider"
    );
  }
  return ctx;
};

export const DeviceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [devices, setDevices] = useState<Device[]>(() => {
    const stored = localStorage.getItem("contactorDevices");
    return stored ? JSON.parse(stored) : initialDevices;
  });

  // Persist devices to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("contactorDevices", JSON.stringify(devices));
  }, [devices]);

  // Simple incremental ID generator based on the highest numeric ID
  const generateId = (): string => {
    const maxId = devices.reduce(
      (max, d) => Math.max(max, parseInt(d.id, 10) || 0),
      0
    );
    return String(maxId + 1);
  };

  const addDevice = (device: Omit<Device, "id">) => {
    const newDevice: Device = { ...device, id: generateId() };
    setDevices((prev) => [...prev, newDevice]);
  };

  const updateDevice = (id: string, updates: Partial<Omit<Device, "id">>) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates } : d))
    );
  };

  const removeDevice = (id: string) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <DeviceContext.Provider
      value={{ devices, addDevice, updateDevice, removeDevice }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
