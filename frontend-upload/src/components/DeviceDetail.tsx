// src/components/DeviceDetail.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { useDeviceContext } from "../context/DeviceContext";

const DeviceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { devices } = useDeviceContext();
  const device = devices.find((d) => d.id === id);

  if (!device) {
    return (
      <div className="p-6 bg-black bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Device Not Found</h2>
        <p>No device matches the ID "{id}".</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-black bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Device Detail – {device.name}</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>ID:</strong> {device.id}</li>
        <li><strong>Status:</strong> {device.status}</li>
        <li><strong>Voltage:</strong> {device.voltage} V</li>
        <li><strong>Current:</strong> {device.current} A</li>
      </ul>
    </div>
  );
};

export default DeviceDetail;
