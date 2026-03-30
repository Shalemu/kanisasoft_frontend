'use client';

import { useState } from 'react';
import {
  FaListAlt,
  FaCalendarAlt,
  FaChartLine,
  FaBars,
} from 'react-icons/fa';

import KalendaTab from './components/KalendaTab';
import RipotiTab from './components/RipotiTab';
import OrodhaYaMatukio from './components/OrodhaYaMatukio';

export default function MatukioTab() {
  const [activeTab, setActiveTab] = useState<
    'kalenda' | 'orodha' | 'ripoti'
  >('orodha');

  const menuItems = [
    {
      key: 'orodha',
      label: 'Orodha ya Matukio',
      icon: <FaListAlt />,
    },
    {
      key: 'kalenda',
      label: 'Kalenda',
      icon: <FaCalendarAlt />,
    },
    {
      key: 'ripoti',
      label: 'Ripoti',
      icon: <FaChartLine />,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-white shadow-lg border-r border-slate-200">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <FaBars className="text-indigo-600 text-xl" />
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Dashboard
              </h2>
              <p className="text-xs text-slate-500 uppercase tracking-widest">
                Matukio
              </p>
            </div>
          </div>

          {/* Menu */}
          <nav className="space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() =>
                  setActiveTab(
                    item.key as 'kalenda' | 'orodha' | 'ripoti'
                  )
                }
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                  activeTab === item.key
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="bg-white rounded-2xl shadow-md min-h-[calc(100vh-4rem)] p-6">
          {activeTab === 'kalenda' && <KalendaTab />}
          {activeTab === 'orodha' && <OrodhaYaMatukio />}
          {activeTab === 'ripoti' && <RipotiTab />}
        </div>
      </main>
    </div>
  );
}