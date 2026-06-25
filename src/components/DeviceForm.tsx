// src/components/DeviceForm.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeviceContext } from "../context/DeviceContext";
import { Device } from "../data/devices";
import ConfirmModal from "./ConfirmModal";
import { useToast } from "../context/ToastContext";

const statusOptions = ["online", "offline", "maintenance"] as const;

type FormMode = "add" | "edit";

const DeviceForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const mode: FormMode = id ? "edit" : "add";
  const { devices, addDevice, updateDevice, removeDevice } = useDeviceContext();

  const existing = devices.find((d) => d.id === id);

  const [name, setName] = useState(existing?.name || "");
  const [status, setStatus] = useState<Device["status"]>(existing?.status || "online");
  const [voltage, setVoltage] = useState(existing?.voltage.toString() || "");
  const [current, setCurrent] = useState(existing?.current.toString() || "");
  const [showConfirm, setShowConfirm] = useState(false);
  const showToast = useToast();

  useEffect(() => {
    if (mode === "edit" && !existing) {
      // If device not found, go back to list
      navigate("/devices");
    }
  }, [mode, existing, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = parseFloat(voltage);
    const c = parseFloat(current);
    if (!name || isNaN(v) || isNaN(c)) {
      alert("Please fill all fields with valid numbers.");
      return;
    }
    const payload = { name, status, voltage: v, current: c } as Omit<Device, "id">;
    if (mode === "add") {
      addDevice(payload);
      showToast('Device added', 'success');
    } else if (id) {
      updateDevice(id, payload);
      showToast('Device updated', 'success');
    }
    navigate("/devices");
  };

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (id) {
      removeDevice(id);
      showToast('Device deleted', 'success');
      navigate("/devices");
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-black bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        {mode === "add" ? "Add New Device" : "Edit Device"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            className="w-full px-2 py-1 rounded bg-gray-800 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Status</label>
          <select
            className="w-full px-2 py-1 rounded bg-gray-800 text-white"
            value={status}
            onChange={(e) => setStatus(e.target.value as Device["status"])}
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Voltage (V)</label>
          <input
            type="number"
            className="w-full px-2 py-1 rounded bg-gray-800 text-white"
            value={voltage}
            onChange={(e) => setVoltage(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Current (A)</label>
          <input
            type="number"
            className="w-full px-2 py-1 rounded bg-gray-800 text-white"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            required
          />
        </div>
        <div className="flex space-x-4">
          <button type="submit" className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500 transition">
            {mode === "add" ? "Create" : "Save"}
          </button>
          {mode === "edit" && (
            <button type="button" onClick={handleDelete} className="px-4 py-2 bg-red-600 rounded hover:bg-red-500 transition">
              Delete
            </button>
          )}
          <button type="button" onClick={() => navigate("/devices")} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition">
            Cancel
          </button>
        </div>
      </form>
      <ConfirmModal
        isOpen={showConfirm}
        message="Delete this device? This cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default DeviceForm;
