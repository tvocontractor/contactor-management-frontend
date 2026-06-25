// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import DeviceList from "./components/DeviceList";
import DeviceDetail from "./components/DeviceDetail";
import MaintenanceLog from "./components/MaintenanceLog";
import Reports from "./components/Reports";
import Settings from "./components/Settings";
import AlertLog from "./components/AlertLog";
import Profile from "./components/Profile";
import DeviceForm from "./components/DeviceForm";
import { DeviceProvider } from "./context/DeviceContext";
import { ToastProvider } from "./context/ToastContext";
import { ThemeProvider } from "./context/ThemeContext";
import ToastContainer from "./components/ToastContainer";
import { AuthProvider } from "./context/AuthContext";
import ThemeToggle from "./components/ThemeToggle";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ToastProvider>
          <DeviceProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 text-white">
                <nav className="bg-black bg-opacity-30 backdrop-blur-md p-4 flex flex-wrap gap-4 justify-center">
                  <NavLink to="/" end className={({ isActive }) => isActive ? "text-indigo-300 font-semibold" : "hover:text-indigo-200"}>Dashboard</NavLink>
                  <NavLink to="/devices" className={({ isActive }) => isActive ? "text-indigo-300 font-semibold" : "hover:text-indigo-200"}>Devices</NavLink>
                  <NavLink to="/devices/new" className={({ isActive }) => isActive ? "text-indigo-300 font-semibold" : "hover:text-indigo-200"}>Add Device</NavLink>
                  <NavLink to="/maintenance" className={({ isActive }) => isActive ? "text-indigo-300 font-semibold" : "hover:text-indigo-200"}>Maintenance</NavLink>
                  <NavLink to="/reports" className={({ isActive }) => isActive ? "text-indigo-300 font-semibold" : "hover:text-indigo-200"}>Reports</NavLink>
                  <NavLink to="/settings" className={({ isActive }) => isActive ? "text-indigo-300 font-semibold" : "hover:text-indigo-200"}>Settings</NavLink>
                  <NavLink to="/alerts" className={({ isActive }) => isActive ? "text-indigo-300 font-semibold" : "hover:text-indigo-200"}>Alert Log</NavLink>
                  {/* Theme toggle สามารถวางไว้ตรงนี้หรือใส่เป็น NavLink แยกก็ได้ */}
                  <ThemeToggle />
                </nav>
                <main className="p-6">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/devices" element={<DeviceList />} />
                    <Route path="/devices/new" element={<DeviceForm />} />
                    <Route path="/devices/:id/edit" element={<DeviceForm />} />
                    <Route path="/devices/:id" element={<DeviceDetail />} />
                    <Route path="/maintenance" element={<MaintenanceLog />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/alerts" element={<AlertLog />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </main>
              </div>
              <ToastContainer />
            </BrowserRouter>
          </DeviceProvider>
        </ToastProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
