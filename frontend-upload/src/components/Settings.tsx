// src/components/Settings.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Setting } from "../api/settings";

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get<Setting[]>("http://127.0.0.1:8000/settings");
        setSettings(response.data);
      } catch (err) {
        setError("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  if (loading) return <p>Loading settings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {settings.length === 0 ? (
        <p>No settings available.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {settings.map((setting) => (
            <li key={setting.key} className="card" style={{ marginBottom: "1rem" }}>
              <strong>{setting.key}:</strong> {setting.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Settings;
