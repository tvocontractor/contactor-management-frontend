// src/components/StatusChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { devices } from "../data/devices";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatusChart: React.FC = () => {
  const statusCounts = devices.reduce((acc, d) => {
    acc[d.status] = (acc[d.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Device Status Count",
        data: Object.values(statusCounts),
        backgroundColor: ["#34d399", "#ef4444", "#fbbf24"], // green, red, yellow
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Device Status Overview" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="p-4 bg-black bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default StatusChart;
