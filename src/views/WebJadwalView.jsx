import React, { useState } from 'react';
import {
  IconSearch,
  IconSun,
  IconBook,
  IconActivity,
  IconMoon,
  IconPlus,
  IconCheck,
  IconClock
} from '../components/Icons';
import { Toggle } from '../components/Toggle';
import { useApp } from '../context/AppContext';

export const WebJadwalView = ({ onOpenAddModal, onOpenDetail, onTabChange }) => {
  const {
    schedules,
    toggleScheduleStatus,
    setSelectedScheduleId
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('Semua');

  const filteredSchedules = schedules.filter(sch => {
    const matchesSearch = sch.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'Semua' ? true : sch.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getIconInfo = (iconName) => {
    switch (iconName) {
      case 'sun':
        return { Icon: IconSun, bg: 'bg-[#FFF4E5]', color: '#B86A13' };
      case 'book':
        return { Icon: IconBook, bg: 'bg-[#EFF6FF]', color: '#3B82F6' };
      case 'activity':
        return { Icon: IconActivity, bg: 'bg-[#EAF8F1]', color: '#168567' };
      case 'moon':
        return { Icon: IconMoon, bg: 'bg-[#F2F0FF]', color: '#8060C2' };
      default:
        return { Icon: IconSun, bg: 'bg-[#EFF6FF]', color: '#3B82F6' };
    }
  };

  const handleStartSession = (id) => {
    setSelectedScheduleId(id);
    onTabChange('sesi');
  };

  return (
    <div className="flex flex-col gap-6 pb-12 font-sans select-none">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-[#E7EDF4] shadow-card">
        <div>
          <h1 className="text-2xl font-bold text-[#172B4D] tracking-tight">
            Jadwal & Rutinitas
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Kelola kebiasaan harian, waktu pelaksanaan, dan program aktivitasmu.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="flex items-center w-64 h-10 px-3 bg-[#F8FAFC] border border-[#E7EDF4] rounded-xl gap-2 focus-within:border-[#3B82F6] focus-within:bg-white transition-all">
            <IconSearch className="w-4 h-4 text-[#64748B] shrink-0" color="#64748B" />
            <input
              type="text"
              placeholder="Cari jadwal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-[#172B4D] placeholder-[#94A3B8] focus:outline-none"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center bg-[#F8FAFC] p-1 rounded-xl border border-[#E7EDF4]">
            {['Semua', 'Aktif', 'Nonaktif'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === f
                    ? 'bg-white text-[#3B82F6] shadow-sm'
                    : 'text-[#64748B] hover:text-[#172B4D]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Add Button */}
          <button
            onClick={onOpenAddModal}
            className="h-10 px-4 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <IconPlus className="w-4 h-4" color="#FFFFFF" />
            <span>Tambah Jadwal</span>
          </button>
        </div>
      </div>

      {/* 2. Schedule Cards Grid (3 Columns on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchedules.map((sch) => {
          const { Icon, bg, color } = getIconInfo(sch.icon);
          const isAktif = sch.status === 'Aktif';
          const completedCount = sch.programs.filter(p => p.completed).length;

          return (
            <div
              key={sch.id}
              className={`bg-white rounded-3xl p-6 border shadow-card flex flex-col justify-between gap-5 transition-all duration-200 hover:shadow-lg ${
                isAktif ? 'border-[#E7EDF4] hover:border-[#3B82F6]' : 'border-slate-200 opacity-80'
              }`}
            >
              {/* Card Header: Icon, Name, and Toggle */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center shrink-0 shadow-sm`}>
                    <Icon className="w-6 h-6" color={color} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#172B4D] leading-tight">
                      {sch.name}
                    </h3>
                    <span className="text-xs text-[#64748B] flex items-center gap-1 mt-0.5">
                      <IconClock className="w-3.5 h-3.5" color="#64748B" />
                      {sch.days}
                    </span>
                  </div>
                </div>

                {/* Inline Active Toggle Switch */}
                <div className="flex items-center gap-2">
                  <Toggle
                    checked={isAktif}
                    onChange={() => toggleScheduleStatus(sch.id)}
                  />
                </div>
              </div>

              {/* Big Time and Streak Badge */}
              <div className="flex items-baseline justify-between py-1 border-y border-[#F1F5F9]">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-[#172B4D] tracking-tight">
                    {sch.time}{sch.end_time ? ` – ${sch.end_time}` : ''}
                  </span>
                  <span className="text-xs font-semibold text-[#64748B]">WIB</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${
                    isAktif ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {sch.status}
                  </span>
                  {sch.streak > 0 && (
                    <span className="text-[11px] font-semibold bg-[#FFF4E5] text-[#B86A13] px-2.5 py-1 rounded-lg">
                      🔥 {sch.streak} hari
                    </span>
                  )}
                </div>
              </div>

              {/* Programs List Preview */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-[#64748B]">
                  <span className="font-semibold text-[#172B4D]">
                    Program ({sch.programs.length})
                  </span>
                  <span>{completedCount}/{sch.programs.length} selesai</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  {sch.programs.slice(0, 3).map((prog) => (
                    <div
                      key={prog.id}
                      className="px-3 py-2 rounded-xl bg-[#F8FAFC] flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className={`w-2 h-2 rounded-full ${prog.completed ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                        <span className={`truncate ${prog.completed ? 'line-through text-[#94A3B8]' : 'text-[#172B4D]'}`}>
                          {prog.title}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#64748B] shrink-0 font-medium">
                        {prog.duration}
                      </span>
                    </div>
                  ))}
                  {sch.programs.length > 3 && (
                    <span className="text-[11px] text-[#3B82F6] font-medium text-center">
                      +{sch.programs.length - 3} program lainnya
                    </span>
                  )}
                </div>
              </div>

              {/* Card Actions */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => onOpenDetail(sch.id)}
                  className="h-10 rounded-xl bg-white border border-[#E7EDF4] hover:bg-slate-50 text-xs font-semibold text-[#172B4D] transition-colors"
                >
                  Detail Jadwal
                </button>
                <button
                  onClick={() => handleStartSession(sch.id)}
                  className="h-10 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold transition-colors shadow-sm"
                >
                  Mulai Sesi
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
