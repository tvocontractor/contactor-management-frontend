// src/components/Dashboard.tsx
import React from "react";
import StatusChart from "./StatusChart";
import DeviceList from "./DeviceList";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Status Overview Chart */}
      <StatusChart />
      {/* Device List */}
      <DeviceList />
    </div>
  );
};

export default Dashboard;
