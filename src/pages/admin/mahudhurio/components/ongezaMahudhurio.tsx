'use client';

import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { apiFetch } from '@/lib/api';
import { toast } from 'react-toastify';

interface Props {
  onClose: () => void;
}

export default function OngezaMahudhurio({ onClose }: Props) {
  const [type, setType] = useState('Jumapili');
  const [date, setDate] = useState('');
  const [children, setChildren] = useState(0);
  const [women, setWomen] = useState(0);
  const [men, setMen] = useState(0);
  const [loading, setLoading] = useState(false);

  // OngezaMahudhurio.tsx
const handleSave = async () => {
  if (!date) return toast.error('Tafadhali chagua tarehe.');

  setLoading(true);
  try {
    // Step 1: Create Service
    const serviceRes = await apiFetch('/services', {
      method: 'POST',
      body: { type, date },
    });
    const serviceId = serviceRes.service.id;

    // Step 2: Create Attendance
    const attendanceRes = await apiFetch('/attendance', {
      method: 'POST',
      body: {
        service_id: serviceId,
        children,
        women,
        men,
        members: [],
      },
    });

    if (attendanceRes.status === 'success') {
      toast.success('Mahudhurio yameongezwa.');
      onClose();
    } else {
      toast.error(attendanceRes.message || 'Imeshindikana kuunda mahudhurio.');
    }
  } catch (err) {
    console.error(err);
    toast.error('Hitilafu ya mtandao.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Ongeza Mahudhurio</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium">Tarehe</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />

          <label className="text-sm font-medium">Aina ya Ibada</label>
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="Jumapili">Jumapili</option>
            <option value="Midweek">Katikati ya Wiki</option>
            <option value="Special">Maandalizi Maalum</option>
          </select>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-sm font-medium">Watoto</label>
              <input
                type="number"
                value={children}
                onChange={e => setChildren(parseInt(e.target.value))}
                className="border px-3 py-2 rounded w-full"
                min={0}
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Wanawake</label>
              <input
                type="number"
                value={women}
                onChange={e => setWomen(parseInt(e.target.value))}
                className="border px-3 py-2 rounded w-full"
                min={0}
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Wanaume</label>
              <input
                type="number"
                value={men}
                onChange={e => setMen(parseInt(e.target.value))}
                className="border px-3 py-2 rounded w-full"
                min={0}
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mt-3 w-full"
          >
            {loading ? 'Inapakia...' : 'Hifadhi Mahudhurio'}
          </button>
        </div>
      </div>
    </div>
  );
}