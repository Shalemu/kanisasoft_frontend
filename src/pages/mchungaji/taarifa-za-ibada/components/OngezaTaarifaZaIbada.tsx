'use client';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { apiFetch } from '@/lib/api';

export default function OngezaTaarifaZaIbada() {
  const [formData, setFormData] = useState({
    date: '',
    service_name: '',
    preacher: '',
    preacher_description: '',
    message: '',
    attendance_children: 0,
    attendance_women: 0,
    attendance_men: 0,
    total_attendance: 0,
    total_offerings: 0,
    leaders_on_duty: '',
  });

  // Auto-calculate total attendance
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      total_attendance:
        Number(prev.attendance_children) +
        Number(prev.attendance_women) +
        Number(prev.attendance_men),
    }));
  }, [
    formData.attendance_children,
    formData.attendance_women,
    formData.attendance_men,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { total_attendance, ...body } = formData;

      const res = await apiFetch('/service-events', {
        method: 'POST',
        body,
      });

      if (res.status === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Imefanikiwa',
          text: 'Taarifa imeongezwa kwa mafanikio!',
        });

        setFormData({
          date: '',
          service_name: '',
          preacher: '',
          preacher_description: '',
          message: '',
          attendance_children: 0,
          attendance_women: 0,
          attendance_men: 0,
          total_attendance: 0,
          total_offerings: 0,
          leaders_on_duty: '',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Hitilafu',
          text: res.message || 'Imeshindikana kuongeza taarifa.',
        });
      }
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Hitilafu',
        text: err.message || 'Tatizo la mtandao. Jaribu tena.',
      });
    }
  };

  return (
    <div className="bg-white p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Ongeza Taarifa za Ibada
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* DATE */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Tarehe</label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={e =>
              setFormData({ ...formData, date: e.target.value })
            }
            className="border border-gray-300 px-4 py-3 rounded-md"
          />
        </div>

        {/* AINA YA IBADA (INPUT NOT SELECT) */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">
            Aina ya Ibada
          </label>
          <input
            type="text"
            required
            placeholder="Ingiza aina ya ibada"
            value={formData.service_name}
            onChange={e =>
              setFormData({ ...formData, service_name: e.target.value })
            }
            className="border border-gray-300 px-4 py-3 rounded-md"
          />
        </div>

        {/* PREACHER */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Mhubiri</label>
          <input
            type="text"
            required
            placeholder="Ingiza jina la mhubiri"
            value={formData.preacher}
            onChange={e =>
              setFormData({ ...formData, preacher: e.target.value })
            }
            className="border border-gray-300 px-4 py-3 rounded-md"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">
            Mahubiri / Somo
          </label>
          <input
            type="text"
            placeholder="Maelezo mafupi ya ujumbe"
            value={formData.preacher_description}
            onChange={e =>
              setFormData({
                ...formData,
                preacher_description: e.target.value,
              })
            }
            className="border border-gray-300 px-4 py-3 rounded-md"
          />
        </div>

        {/* LEADERS */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">
            Kiongozi wa Ibada
          </label>
          <input
            type="text"
            placeholder="Ingiza jina la kiongozi"
            value={formData.leaders_on_duty}
            onChange={e =>
              setFormData({
                ...formData,
                leaders_on_duty: e.target.value,
              })
            }
            className="border border-gray-300 px-4 py-3 rounded-md"
          />
        </div>

        {/* CHILDREN */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Watoto</label>
          <input
            type="number"
            min={0}
            placeholder="Idadi ya watoto"
            value={formData.attendance_children || ''}
            onChange={e =>
              setFormData({
                ...formData,
                attendance_children: Number(e.target.value),
              })
            }
            className="border border-gray-300 px-4 py-3 rounded-md"
          />
        </div>

        {/* WOMEN */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Wanawake</label>
          <input
            type="number"
            min={0}
            placeholder="Idadi ya wanawake"
            value={formData.attendance_women || ''}
            onChange={e =>
              setFormData({
                ...formData,
                attendance_women: Number(e.target.value),
              })
            }
            className="border border-gray-300 px-4 py-3 rounded-md"
          />
        </div>

        {/* MEN */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Wanaume</label>
          <input
            type="number"
            min={0}
            placeholder="Idadi ya wanaume"
            value={formData.attendance_men || ''}
            onChange={e =>
              setFormData({
                ...formData,
                attendance_men: Number(e.target.value),
              })
            }
            className="border border-gray-300 px-4 py-3 rounded-md"
          />
        </div>

        {/* TOTAL */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-1 font-medium text-gray-700">
            Jumla ya Mahudhurio
          </label>
          <input
            type="number"
            readOnly
            value={formData.total_attendance}
            className="border border-gray-300 px-4 py-3 rounded-md bg-gray-100"
          />
        </div>

        {/* OFFERINGS */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">
            Sadaka (TZS)
          </label>

          <input
            type="text"
            inputMode="numeric"
            placeholder="Ingiza kiasi cha sadaka"
            value={
              formData.total_offerings === 0 || formData.total_offerings === null
                ? ''
                : Number(formData.total_offerings).toLocaleString()
            }
            onChange={e => {
              const raw = e.target.value.replace(/,/g, '');
              const numberValue = raw === '' ? 0 : Number(raw);

              setFormData({
                ...formData,
                total_offerings: numberValue,
              });
            }}
            className="border border-gray-300 px-4 py-3 rounded-md"
          />
        </div>
        {/* MESSAGE */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-1 font-medium text-gray-700">
            Ujumbe / Maelezo
          </label>
          <textarea
            placeholder="Andika maelezo yoyote ya ziada..."
            value={formData.message}
            onChange={e =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="border border-gray-300 px-4 py-3 rounded-md"
          />
        </div>

        {/* SUBMIT */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-[#1e293b] text-white px-6 py-3 font-semibold rounded-md hover:bg-[#0f172a]"
          >
            Ongeza Taarifa
          </button>
        </div>
      </form>
    </div>
  );
}