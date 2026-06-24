// app.js – React entry for Contactor Management Dashboard
// This script mounts a simple React app that implements Settings, Alert Log, and Profile.

const { useState, useEffect } = React;

const API_BASE = "http://localhost:8000"; // adjust if backend runs elsewhere

function Settings({ onIntervalChange }) {
  const [interval, setInterval] = useState(30);
  const saveSettings = async () => {
    if (interval < 5 || interval > 300) {
      alert("Refresh interval must be between 5 and 300 seconds.");
      return;
    }
    try {
      const resp = await fetch(`${API_BASE}/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_interval: interval })
      });
      if (!resp.ok) throw new Error(resp.status);
      alert("Settings saved");
      onIntervalChange(interval);
    } catch (e) {
      alert("Error saving settings: " + e);
    }
  };
  return (
    React.createElement("section", { className: "card", id: "settings" },
      React.createElement("h2", null, "Settings"),
      React.createElement("div", { className: "card-content" },
        React.createElement("label", null,
          React.createElement("span", null, "Refresh Interval (seconds)"),
          React.createElement("input", {
            type: "number",
            min: 5,
            max: 300,
            value: interval,
            onChange: e => setInterval(Number(e.target.value))
          })
        ),
        React.createElement("button", { className: "btn-primary", onClick: saveSettings }, "Save Settings")
      )
    )
  );
}

function AlertLog({ refreshInterval }) {
  const [alerts, setAlerts] = useState([]);
  const loadAlerts = async () => {
    try {
      const res = await fetch(`${API_BASE}/alerts`);
      if (!res.ok) throw new Error(res.status);
      const data = await res.json();
      setAlerts(data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    loadAlerts();
    const timer = setInterval(loadAlerts, refreshInterval * 1000);
    return () => clearInterval(timer);
  }, [refreshInterval]);
  return (
    React.createElement("section", { className: "card", id: "alert-log" },
      React.createElement("h2", null, "Alert Log"),
      React.createElement("ul", { className: "alert-list", id: "alert-list" },
        alerts.map((a, i) =>
          React.createElement("li", { key: i }, `${a.timestamp}: ${a.message}`)
        )
      )
    )
  );
}

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const loadProfile = async () => {
    try {
      const res = await fetch(`${API_BASE}/profile`);
      if (!res.ok) throw new Error(res.status);
      const data = await res.json();
      setName(data.name || "");
      setEmail(data.email || "");
    } catch (e) { console.error(e); }
  };
  useEffect(() => { loadProfile(); }, []);
  const updateProfile = async () => {
    try {
      const resp = await fetch(`${API_BASE}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
      });
      if (!resp.ok) throw new Error(resp.status);
      alert("Profile updated");
    } catch (e) { alert("Failed to update profile: " + e); }
  };
  return (
    React.createElement("section", { className: "card", id: "profile" },
      React.createElement("h2", null, "Profile"),
      React.createElement("div", { className: "card-content" },
        React.createElement("label", null,
          React.createElement("span", null, "Name"),
          React.createElement("input", { type: "text", value: name, onChange: e => setName(e.target.value) })
        ),
        React.createElement("label", null,
          React.createElement("span", null, "Email"),
          React.createElement("input", { type: "email", value: email, onChange: e => setEmail(e.target.value) })
        ),
        React.createElement("button", { className: "btn-primary", onClick: updateProfile }, "Update Profile")
      )
    )
  );
}

function Dashboard() {
  const [refreshInterval, setRefreshInterval] = useState(30);
  return (
    React.createElement(React.Fragment, null,
      React.createElement("header", { className: "header" },
        React.createElement("h1", null, "Contactor Management")
      ),
      React.createElement("main", { className: "main" },
        React.createElement(Settings, { onIntervalChange: setRefreshInterval }),
        React.createElement(AlertLog, { refreshInterval }),
        React.createElement(Profile, null)
      ),
      React.createElement("footer", { className: "footer" },
        React.createElement("p", null, "© 2026 Contactor Management System")
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(Dashboard));
