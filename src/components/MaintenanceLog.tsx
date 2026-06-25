// src/components/MaintenanceLog.tsx
import React, { useState, useEffect } from "react";
import { filterByQuery, paginate } from "../utils/pagination";

interface Maintenance {
  id: number;
  description: string;
  timestamp: string;
}

// Placeholder data – in real app replace with API call
const dummyData: Maintenance[] = Array.from({ length: 35 }, (_, i) => ({
  id: i + 1,
  description: `Maintenance task #${i + 1}`,
  timestamp: new Date(Date.now() - i * 86400000).toISOString(),
}));

const MaintenanceLog: React.FC = () => {
  const [items, setItems] = useState<Maintenance[]>(dummyData);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Derived data
  const filtered = filterByQuery(items, searchQuery, ["description"]);
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = paginate(filtered, currentPage, itemsPerPage);

  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  // Reset page when query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="p-6 bg-black bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Maintenance Log</h2>
      <input
        type="text"
        placeholder="Search maintenance..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 mb-4 w-full rounded bg-gray-800 text-white placeholder-gray-400"
      />
      {paginated.length === 0 ? (
        <p>No maintenance items match your search.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {paginated.map((item) => (
            <li key={item.id} className="card" style={{ marginBottom: "1rem" }}>
              <strong>{item.description}</strong>
              <br />
              <small>{new Date(item.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={goPrev}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-600 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goNext}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-600 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MaintenanceLog;
