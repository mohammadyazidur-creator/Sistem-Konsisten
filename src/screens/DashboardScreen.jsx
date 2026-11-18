import React from 'react';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';
import { Button } from '../components/Button';
import {
  IconBell,
  IconFlame,
  IconSun,
  IconBook,
  IconActivity,
  IconMoon
} from '../components/Icons';
import { useApp } from '../context/AppContext';

export const DashboardScreen = () => {
  const {
    setCurrentScreen,
    setSelectedScheduleId,
    userStreak,
    userRecord,
    todayProgressPercent,
    completedProgramsCount,
    totalProgramsCount,
    schedules
  } = useApp();

  const handleOpenSchedule = (id) => {
    setSelectedScheduleId(id);
    setCurrentScreen('detail');
  };

  const handleStartSession = () => {
    // Choose the first schedule that has incomplete programs, default to rutinitas-pagi
    const target = schedules.find(s => s.programs.some(p => !p.completed)) || schedules[0];
    setSelectedScheduleId(target.id);
    setCurrentScreen('sesi');
  };

  const daysData = [
    { label: 'Sel', percent: 44 },
    { label: 'Rab', percent: 68 },
    { label: 'Kam', percent: 52 },
    { label: 'Jum', percent: 85 },
    { label: 'Sab', percent: 60 },
    { label: 'Min', percent: 100 },
    { label: 'Sen', percent: 60, isToday: true },
  ];

  // SVG Progress Ring calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (todayProgressPercent / 100) * circumference;

  return (
    <div className="w-[390px] h-[844px] bg-[#F8FAFC] flex flex-col justify-between overflow-hidden select-none font-sans relative">
      {/* iOS Status Bar */}
      <StatusBar time="9:41" />

      {/* Main Content Area */}
      <div className="flex-1 px-6 pt-2 pb-3 overflow-y-auto no-scrollbar flex flex-col gap-4">
        {/* Header Greeting */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-[12px] font-medium text-[#64748B]">
              Senin, 16 November 2026
            </span>
            <h1 className="text-[25px] font-bold text-[#172B4D] tracking-tight leading-tight">
              Pagi, Raka 👋
            </h1>
          </div>
          <button
            onClick={() => setCurrentScreen('notifikasi')}
            className="w-[42px] h-[42px] rounded-xl bg-white border border-[#E7EDF4] flex items-center justify-center relative shadow-sm hover:bg-slate-50 transition-colors"
            title="Lihat Notifikasi"
          >
            <IconBell className="w-[20px] h-[20px]" color="#172B4D" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
          </button>
        </div>

        {/* Motivation Subtext */}
        <p className="text-[13px] text-[#64748B] -mt-2">
          Langkah kecil, perubahan besar.
        </p>

        {/* Card: Progres Hari Ini */}
        <div className="w-full bg-white rounded-2xl p-[18px] border border-[#E7EDF4] shadow-card flex items-center justify-between">
          <div className="flex flex-col gap-1 pr-2">
            <span className="text-[10px] font-semibold text-[#3B82F6] tracking-wider uppercase">
              PROGRES HARI INI
            </span>
            <h3 className="text-[19px] font-semibold text-[#172B4D] leading-tight">
              Terus bertumbuh.
            </h3>
            <p className="text-[12px] text-[#64748B] mt-1">
              {completedProgramsCount} dari {totalProgramsCount} program selesai
            </p>
          </div>

          {/* Radial Progress Chart */}
          <div className="relative w-[86px] h-[86px] shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 90 90">
              <circle
                cx="45"
                cy="45"
                r={radius}
                className="stroke-[#EFF6FF]"
                strokeWidth="7"
                fill="none"
              />
              <circle
                cx="45"
                cy="45"
                r={radius}
                className="stroke-[#3B82F6] transition-all duration-700 ease-out"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span className="absolute text-[22px] font-bold text-[#172B4D] tracking-tight">
              {todayProgressPercent}%
            </span>
          </div>
        </div>

        {/* Card: Streak */}
        <div className="w-full bg-white rounded-2xl px-3.5 py-3 border border-[#E7EDF4] shadow-card flex items-center gap-2.5">
          <div className="w-[38px] h-[38px] rounded-xl bg-[#FFF4E5] flex items-center justify-center shrink-0">
            <IconFlame className="w-5 h-5" color="#B86A13" />
          </div>
          <div className="flex-1 flex flex-col min-w-0">
            <span className="text-[14px] font-semibold text-[#172B4D] leading-tight">
              {userStreak} hari berturut-turut
            </span>
            <span className="text-[11px] text-[#64748B] truncate mt-0.5">
              Kebiasaan baik mulai terbentuk!
            </span>
          </div>
          <span className="text-[11px] font-semibold text-[#B86A13] bg-[#FFF4E5] px-2.5 py-1 rounded-lg shrink-0">
            Rekor {userRecord}
          </span>
        </div>

        {/* Section: Jadwal Hari Ini */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold text-[#172B4D]">
              Jadwal hari ini
            </h2>
            <button
              onClick={() => setCurrentScreen('jadwal')}
              className="text-[12px] font-medium text-[#3B82F6] hover:underline"
            >
              Lihat semua
            </button>
          </div>

          {/* Rutinitas Pagi Item */}
          <div
            onClick={() => handleOpenSchedule('rutinitas-pagi')}
            className="w-full bg-white rounded-2xl p-3 border border-[#E7EDF4] shadow-card flex items-center gap-3 cursor-pointer hover:border-[#3B82F6] transition-all group"
          >
            <div className="w-[38px] h-[38px] rounded-xl bg-[#FFF4E5] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <IconSun className="w-5 h-5" color="#B86A13" />
            </div>
            <div className="flex-1 flex flex-col min-w-0">
              <h4 className="text-[14px] font-semibold text-[#172B4D] group-hover:text-[#3B82F6] transition-colors leading-snug">
                Rutinitas Pagi
              </h4>
              <span className="text-[12px] text-[#64748B] mt-0.5">
                3 program · 2 selesai
              </span>
            </div>
            <span className="text-[14px] font-semibold text-[#172B4D]">
              06.00
            </span>
          </div>

          {/* Belajar Mandiri Item */}
          <div
            onClick={() => handleOpenSchedule('belajar-mandiri')}
            className="w-full bg-white rounded-2xl p-3 border border-[#E7EDF4] shadow-card flex items-center gap-3 cursor-pointer hover:border-[#3B82F6] transition-all group"
          >
            <div className="w-[38px] h-[38px] rounded-xl bg-[#EFF6FF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <IconBook className="w-5 h-5" color="#3B82F6" />
            </div>
            <div className="flex-1 flex flex-col min-w-0">
              <h4 className="text-[14px] font-semibold text-[#172B4D] group-hover:text-[#3B82F6] transition-colors leading-snug">
                Belajar Mandiri
              </h4>
              <span className="text-[12px] text-[#64748B] mt-0.5">
                2 program · Belum dimulai
              </span>
            </div>
            <span className="text-[14px] font-semibold text-[#172B4D]">
              19.00
            </span>
          </div>
        </div>

        {/* Card: Weekly Chart */}
        <div className="w-full bg-white rounded-2xl p-3.5 border border-[#E7EDF4] shadow-card flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-semibold text-[#172B4D]">
              Konsistensi 7 hari
            </span>
            <span className="text-[11px] font-semibold text-[#168567] bg-[#EAF8F1] px-2 py-0.5 rounded-md">
              +20%
            </span>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end justify-between gap-2 pt-2 px-1">
            {daysData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-[20px] h-[58px] bg-[#F1F5F9] rounded-md relative flex items-end overflow-hidden">
                  <div
                    style={{ height: `${d.percent}%` }}
                    className={`w-full rounded-md transition-all duration-500 ${
                      d.isToday ? 'bg-[#3B82F6]' : 'bg-[#6BA1F9]'
                    }`}
                  />
                </div>
                <span className={`text-[11px] ${d.isToday ? 'font-semibold text-[#3B82F6]' : 'text-[#64748B]'}`}>
                  {d.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-1 pb-1">
          <Button
            variant="primary"
            size="md"
            onClick={handleStartSession}
          >
            Mulai Sekarang
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav active="dashboard" />
    </div>
  );
};
