// src/components/ToastContainer.tsx
import React from "react";
import { useToast } from "../context/ToastContext";

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-50">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-2 rounded shadow-lg backdrop-blur-md bg-black bg-opacity-40 text-white border-l-4 ${
            t.type === "success"
              ? "border-green-400"
              : t.type === "error"
              ? "border-red-400"
              : "border-blue-400"
          }`}
          onClick={() => removeToast(t.id)}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
