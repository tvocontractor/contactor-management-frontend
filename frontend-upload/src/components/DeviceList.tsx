// src/components/DeviceList.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { useDeviceContext } from "../context/DeviceContext";

const statusColors: Record<string, string> = {
  online: "bg-green-500",
  offline: "bg-red-500",
  maintenance: "bg-yellow-500",
};

const DeviceList: React.FC = () => {
  const { devices } = useDeviceContext();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const [sortKey, setSortKey] = React.useState<'id' | 'name' | 'status' | 'voltage' | 'current'>('id');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');
  const [filterStatus, setFilterStatus] = React.useState('');

  const handleSort = (key: typeof sortKey) => {
    if (sortKey === key) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const filtered = devices.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.id.includes(searchQuery);
    const matchesStatus = filterStatus ? d.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  const sorted = React.useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      let comp = 0;
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        comp = aVal.localeCompare(bVal);
      } else {
        comp = (aVal as number) - (bVal as number);
      }
      return sortOrder === 'asc' ? comp : -comp;
    });
    return copy;
  }, [filtered, sortKey, sortOrder]);

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goPrev = () => setCurrentPage(p => Math.max(p - 1, 1));
  const goNext = () => setCurrentPage(p => Math.min(p + 1, totalPages));

  // Reset page when search changes or sorting changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortKey, sortOrder]);

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Status', 'Voltage', 'Current'];
    const rows = paginated.map(d => [d.id, d.name, d.status, d.voltage, d.current]);
    const csvContent = [headers, ...rows]
      .map(e => e.join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'devices_page_' + currentPage + '.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 bg-black bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Device List</h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Search by name or ID"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="flex-1 px-2 py-1 rounded bg-gray-800 text-white"
        />
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="px-2 py-1 rounded bg-gray-800 text-white"
        >
          <option value="">All Statuses</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <button onClick={exportCSV} className="px-3 py-1 bg-indigo-600 rounded hover:bg-indigo-500 transition">Export CSV</button>
      </div>
      <table className="w-full text-left table-auto">
        <thead className="border-b border-white/20">
          <tr>
            <th className="px-2 py-1 cursor-pointer" onClick={() => handleSort('id')}>ID {sortKey === 'id' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
            <th className="px-2 py-1 cursor-pointer" onClick={() => handleSort('name')}>Name {sortKey === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
            <th className="px-2 py-1 cursor-pointer" onClick={() => handleSort('status')}>Status {sortKey === 'status' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
            <th className="px-2 py-1 cursor-pointer" onClick={() => handleSort('voltage')}>Voltage (V) {sortKey === 'voltage' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
            <th className="px-2 py-1 cursor-pointer" onClick={() => handleSort('current')}>Current (A) {sortKey === 'current' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((d) => (
            <tr key={d.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
              <td className="px-2 py-1">{d.id}</td>
              <td className="px-2 py-1">
                <NavLink to={`/devices/${d.id}`} className="text-indigo-300 hover:underline">{d.name}</NavLink>
              </td>
              <td className="px-2 py-1">
                <span className={`inline-block px-2 py-0.5 rounded ${statusColors[d.status]} text-xs font-medium`}> {d.status} </span>
              </td>
              <td className="px-2 py-1">{d.voltage}</td>
              <td className="px-2 py-1">{d.current}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button onClick={goPrev} disabled={currentPage===1} className="px-3 py-1 bg-gray-600 rounded disabled:opacity-50">Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={goNext} disabled={currentPage===totalPages || totalPages===0} className="px-3 py-1 bg-gray-600 rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
};

export default DeviceList;
