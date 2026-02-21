// app/[lang]/dashboard/page.tsx
'use client';
import { useEffect, useState } from 'react';
import AddRecordForm from '@/components/AddRecordForm';

export type RecordType = {
  id: string;
  date: string;
  hospital: string;
  diagnosis: string;
  prescription: string;
};

const API_BASE = 'http://localhost:4000';

export default function Dashboard() {
  const [records, setRecords] = useState<RecordType[]>([]);
  const [showForm, setShowForm] = useState(false);

  // load from backend
  useEffect(() => {
    fetch(`${API_BASE}/api/records`)
      .then((r) => r.json())
      .then((data) => setRecords(data))
      .catch(console.error);
  }, []);

  const handleSaved = async (record: Omit<RecordType, 'id'>) => {
    const res = await fetch(`${API_BASE}/api/records`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    });
    const created = await res.json();
    setRecords((prev) => [created, ...prev]);
  };

  return (
    <div className="container mx-auto p-6 space-y-4">
      {/* header, emergency card etc. */}
      <button onClick={() => setShowForm(true)} className="btn-primary">
        + Add Record
      </button>

      {showForm && (
        <AddRecordForm
          onClose={() => setShowForm(false)}
          onSaved={handleSaved}
        />
      )}

      <table className="health-table min-w-full text-sm mt-4">
        <thead>...</thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td className="px-3 py-2">{r.date}</td>
              <td className="px-3 py-2">{r.hospital}</td>
              <td className="px-3 py-2">{r.diagnosis}</td>
              <td className="px-3 py-2">{r.prescription}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
