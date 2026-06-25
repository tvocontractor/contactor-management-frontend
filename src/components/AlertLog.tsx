// src/components/AlertLog.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "../api/alerts";
import { filterByQuery, paginate } from "../utils/pagination";

const AlertLog: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Search & pagination state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get<Alert[]>("http://127.0.0.1:8000/alerts");
        setAlerts(response.data);
      } catch (err) {
        setError("Failed to load alerts");
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  // Derived data
  const filtered = filterByQuery(alerts, searchQuery, ['message']);
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = paginate(filtered, currentPage, itemsPerPage);

  const goPrev = () => setCurrentPage(p => Math.max(p - 1, 1));
  const goNext = () => setCurrentPage(p => Math.min(p + 1, totalPages));

  // Reset page when query changes
  useEffect(() => { setCurrentPage(1); }, [searchQuery]);
  if (loading) return <p>Loading alerts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search alerts..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="p-2 mb-4 w-full rounded bg-gray-800 text-white placeholder-gray-400"
      />
      {paginated.length === 0 ? (
        <p>No alerts match your search.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {paginated.map((alert) => (
            <li key={alert.id} className="card" style={{ marginBottom: "1rem" }}>
              <strong>{alert.message}</strong>
              <br />
              <small>{new Date(alert.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={goPrev}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-600 rounded disabled:opacity-50"
        >Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={goNext}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-600 rounded disabled:opacity-50"
        >Next</button>
      </div>
    </div>
  );
};
export default AlertLog;
