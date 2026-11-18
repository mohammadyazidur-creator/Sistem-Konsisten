import React, { useState } from 'react';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';
import {
  IconSearch,
  IconSun,
  IconBook,
  IconActivity,
  IconMoon,
  IconPlus
} from '../components/Icons';
import { useApp } from '../context/AppContext';

export const JadwalScreen = () => {
  const {
    schedules,
    setCurrentScreen,
    setSelectedScheduleId,
    setShowAddModal
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('Semua'); // 'Semua', 'Aktif', 'Nonaktif'

  const filteredSchedules = schedules.filter(sch => {
    const matchesSearch = sch.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'Semua' ? true : sch.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getIconComponent = (iconName) => {
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

  const handleCardClick = (id) => {
    setSelectedScheduleId(id);
    setCurrentScreen('detail');
  };

  return (
    <div className="w-[390px] h-[844px] bg-[#F8FAFC] flex flex-col justify-between overflow-hidden select-none font-sans relative">
      {/* iOS Status Bar */}
      <StatusBar time="9:41" />

      {/* Main Content Area */}
      <div className="flex-1 px-6 pt-2 pb-4 overflow-y-auto no-scrollbar flex flex-col gap-4">
        {/* Header Title */}
        <div className="flex flex-col gap-1">
          <h1 className="text-[28px] font-bold text-[#172B4D] tracking-tight leading-tight">
            Jadwal
          </h1>
          <p className="text-[13px] text-[#64748B]">
            Ruang untuk kebiasaan baikmu.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full h-[48px] bg-white rounded-2xl px-3.5 border border-[#E7EDF4] shadow-sm flex items-center gap-2.5">
          <IconSearch className="w-5 h-5 text-[#64748B] shrink-0" color="#64748B" />
          <input
            type="text"
            placeholder="Cari jadwal"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-[13px] text-[#172B4D] placeholder-[#64748B] focus:outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {['Semua', 'Aktif', 'Nonaktif'].map((f) => {
            const isSelected = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`h-[37px] px-4 rounded-xl text-[12px] font-medium transition-all duration-150 ${
                  isSelected
                    ? 'bg-[#3B82F6] text-white shadow-sm'
                    : 'bg-white border border-[#E7EDF4] text-[#64748B] hover:text-[#172B4D]'
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Schedule Count */}
        <div className="flex items-center justify-between pt-1">
          <h2 className="text-[15px] font-semibold text-[#172B4D]">
            Jadwal kamu
          </h2>
          <span className="text-[12px] text-[#64748B]">
            {filteredSchedules.length} jadwal
          </span>
        </div>

        {/* 2x2 Schedule Grid */}
        <div className="grid grid-cols-2 gap-3.5">
          {filteredSchedules.map((sch) => {
            const { Icon, bg, color } = getIconComponent(sch.icon);
            const isAktif = sch.status === 'Aktif';

            return (
              <div
                key={sch.id}
                onClick={() => handleCardClick(sch.id)}
                className="w-full h-[186px] bg-white rounded-2xl p-3 border border-[#E7EDF4] shadow-card flex flex-col justify-between cursor-pointer hover:border-[#3B82F6] transition-all group"
              >
                {/* Card Top: Icon & Status Badge */}
                <div className="flex items-center justify-between">
                  <div className={`w-[40px] h-[40px] rounded-xl ${bg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" color={color} />
                  </div>
                  <span
                    className={`text-[9px] font-medium px-2 py-0.5 rounded-md ${
                      isAktif
                        ? 'text-[#168567] bg-[#EAF8F1]'
                        : 'text-[#64748B] bg-[#F1F5F9]'
                    }`}
                  >
                    {sch.status}
                  </span>
                </div>

                {/* Card Middle: Title, Time, Days */}
                <div className="flex flex-col gap-0.5 my-auto">
                  <h3 className="text-[13px] font-semibold text-[#172B4D] group-hover:text-[#3B82F6] transition-colors truncate">
                    {sch.name}
                  </h3>
                  <span className="text-[24px] font-semibold text-[#172B4D] tracking-tight leading-none mt-1">
                    {sch.time}
                  </span>
                  <span className="text-[10px] text-[#64748B] mt-1">
                    {sch.days}
                  </span>
                </div>

                {/* Card Bottom: Divider & Program Count */}
                <div className="pt-2 border-t border-[#E7EDF4]">
                  <span className="text-[11px] font-medium text-[#64748B]">
                    {sch.programs.length} program
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Add Schedule Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="absolute bottom-[104px] right-6 w-[54px] h-[54px] rounded-2xl bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-float flex items-center justify-center active:scale-95 transition-all z-10"
        title="Tambah Jadwal"
      >
        <IconPlus className="w-6 h-6" color="#FFFFFF" />
      </button>

      {/* Bottom Navigation */}
      <BottomNav active="jadwal" />
    </div>
  );
};
