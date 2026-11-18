import React from 'react';
import {
  IconSun,
  IconBook,
  IconFlame,
  IconLeaf,
  IconActivity,
  IconClock,
  IconCheck,
  IconBell
} from '../components/Icons';
import { Checkbox } from '../components/Checkbox';
import { useApp } from '../context/AppContext';

export const WebDashboardView = ({ onTabChange, onOpenDetail }) => {
  const {
    schedules,
    todayProgressPercent,
    completedProgramsCount,
    totalProgramsCount,
    userStreak,
    userRecord,
    toggleProgram,
    setSelectedScheduleId
  } = useApp();

  const daysData = [
    { label: 'Sel', percent: 44, date: '10 Nov' },
    { label: 'Rab', percent: 68, date: '11 Nov' },
    { label: 'Kam', percent: 52, date: '12 Nov' },
    { label: 'Jum', percent: 85, date: '13 Nov' },
    { label: 'Sab', percent: 60, date: '14 Nov' },
    { label: 'Min', percent: 100, date: '15 Nov' },
    { label: 'Sen', percent: 60, date: '16 Nov', isToday: true },
  ];

  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (todayProgressPercent / 100) * circumference;

  const handleStartSession = (scheduleId) => {
    setSelectedScheduleId(scheduleId || 'rutinitas-pagi');
    onTabChange('sesi');
  };

  return (
    <div className="flex flex-col gap-8 pb-12 font-sans select-none">
      {/* 1. Welcome Greeting Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-medium text-blue-100 w-fit">
            <span>✨</span> Senin, 16 November 2026 · Hari ke-{userStreak} Konsisten
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
            Selamat Pagi, Raka! 👋
          </h1>
          <p className="text-blue-100 text-sm max-w-xl">
            "Langkah kecil, perubahan besar." Jadikan setiap rutinitas hari ini bermakna untuk masa depanmu.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10 shrink-0">
          <button
            onClick={() => handleStartSession('rutinitas-pagi')}
            className="h-12 px-6 rounded-2xl bg-white hover:bg-blue-50 text-blue-600 text-sm font-semibold shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <IconLeaf className="w-5 h-5" color="#2563EB" />
            <span>Mulai Sesi Sekarang</span>
          </button>
          <button
            onClick={() => onTabChange('jadwal')}
            className="h-12 px-5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium backdrop-blur-md transition-all"
          >
            Lihat Jadwal
          </button>
        </div>

        {/* Decorative background circles */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 pointer-events-none blur-2xl" />
        <div className="absolute right-48 -bottom-20 w-52 h-52 rounded-full bg-indigo-400/20 pointer-events-none blur-xl" />
      </div>

      {/* 2. Top Key Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Progres Hari Ini */}
        <div className="bg-white rounded-2xl p-5 border border-[#E7EDF4] shadow-card flex items-center justify-between hover:border-[#3B82F6] transition-all">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold tracking-wider text-[#3B82F6] uppercase">
              PROGRES HARI INI
            </span>
            <span className="text-2xl font-bold text-[#172B4D]">
              {todayProgressPercent}%
            </span>
            <span className="text-xs text-[#64748B]">
              {completedProgramsCount} dari {totalProgramsCount} program selesai
            </span>
          </div>
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-[#EFF6FF]"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-[#3B82F6] transition-all duration-700"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span className="absolute text-xs font-bold text-[#172B4D]">
              {todayProgressPercent}%
            </span>
          </div>
        </div>

        {/* Card 2: Streak Beruntun */}
        <div className="bg-white rounded-2xl p-5 border border-[#E7EDF4] shadow-card flex items-center gap-4 hover:border-[#F59E0B] transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF4E5] flex items-center justify-center shrink-0">
            <IconFlame className="w-6 h-6" color="#B86A13" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-semibold tracking-wider text-[#B86A13] uppercase">
              STREAK AKTIF
            </span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#172B4D]">
                {userStreak} Hari
              </span>
              <span className="text-[10px] font-semibold text-[#B86A13] bg-[#FFF4E5] px-2 py-0.5 rounded-md">
                Rekor {userRecord}
              </span>
            </div>
            <span className="text-xs text-[#64748B]">
              Kebiasaan baik mulai terbentuk!
            </span>
          </div>
        </div>

        {/* Card 3: Rutinitas Aktif */}
        <div className="bg-white rounded-2xl p-5 border border-[#E7EDF4] shadow-card flex items-center gap-4 hover:border-emerald-500 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF8F1] flex items-center justify-center shrink-0">
            <IconActivity className="w-6 h-6" color="#168567" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-semibold tracking-wider text-[#168567] uppercase">
              JADWAL AKTIF
            </span>
            <span className="text-2xl font-bold text-[#172B4D]">
              3 Jadwal
            </span>
            <span className="text-xs text-[#64748B]">
              1 nonaktif dari 4 jadwal
            </span>
          </div>
        </div>

        {/* Card 4: Tren Konsistensi */}
        <div className="bg-white rounded-2xl p-5 border border-[#E7EDF4] shadow-card flex items-center gap-4 hover:border-purple-500 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#F2F0FF] flex items-center justify-center shrink-0">
            <span className="text-xl">📈</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-semibold tracking-wider text-[#8060C2] uppercase">
              TREN KONSISTENSI
            </span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#172B4D]">
                +20%
              </span>
              <span className="text-[10px] font-semibold text-[#168567] bg-[#EAF8F1] px-2 py-0.5 rounded-md">
                Naik
              </span>
            </div>
            <span className="text-xs text-[#64748B]">
              Dibanding minggu lalu
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Content: 2 Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Jadwal Hari Ini & Grafik Konsistensi 7 Hari */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Section: Jadwal Hari Ini */}
          <div className="bg-white rounded-3xl p-6 border border-[#E7EDF4] shadow-card flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-[#E7EDF4] pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#172B4D]">
                  Jadwal & Program Hari Ini
                </h2>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Centang program yang sudah kamu selesaikan untuk memperbarui progres harian.
                </p>
              </div>
              <button
                onClick={() => onTabChange('jadwal')}
                className="text-xs font-semibold text-[#3B82F6] hover:underline"
              >
                Lihat Semua Jadwal ↗
              </button>
            </div>

            {/* Schedule 1: Rutinitas Pagi */}
            {schedules.find(s => s.id === 'rutinitas-pagi') && (
              <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-[#E7EDF4] flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFF4E5] flex items-center justify-center">
                      <IconSun className="w-5 h-5" color="#B86A13" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#172B4D]">
                        Rutinitas Pagi
                      </h3>
                      <span className="text-xs text-[#64748B]">
                        06.00 · Setiap hari · 3 Program
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenDetail('rutinitas-pagi')}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-[#E7EDF4] text-[#172B4D] hover:bg-slate-50 transition-colors"
                    >
                      Buka Detail
                    </button>
                    <button
                      onClick={() => handleStartSession('rutinitas-pagi')}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#3B82F6] hover:bg-[#2563EB] text-white transition-colors"
                    >
                      Mulai Sesi
                    </button>
                  </div>
                </div>

                {/* Checkable programs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-2">
                  {schedules.find(s => s.id === 'rutinitas-pagi').programs.map((prog) => (
                    <div
                      key={prog.id}
                      onClick={() => toggleProgram('rutinitas-pagi', prog.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        prog.completed
                          ? 'bg-emerald-50/60 border-emerald-200'
                          : 'bg-white border-[#E7EDF4] hover:border-[#3B82F6]'
                      }`}
                    >
                      <Checkbox
                        checked={prog.completed}
                        label={prog.title}
                        sublabel={prog.duration}
                        onChange={() => toggleProgram('rutinitas-pagi', prog.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Schedule 2: Belajar Mandiri */}
            {schedules.find(s => s.id === 'belajar-mandiri') && (
              <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-[#E7EDF4] flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
                      <IconBook className="w-5 h-5" color="#3B82F6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#172B4D]">
                        Belajar Mandiri
                      </h3>
                      <span className="text-xs text-[#64748B]">
                        19.00 · Sen – Jum · 2 Program
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenDetail('belajar-mandiri')}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-[#E7EDF4] text-[#172B4D] hover:bg-slate-50 transition-colors"
                    >
                      Buka Detail
                    </button>
                    <button
                      onClick={() => handleStartSession('belajar-mandiri')}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#3B82F6] hover:bg-[#2563EB] text-white transition-colors"
                    >
                      Mulai Sesi
                    </button>
                  </div>
                </div>

                {/* Checkable programs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2">
                  {schedules.find(s => s.id === 'belajar-mandiri').programs.map((prog) => (
                    <div
                      key={prog.id}
                      onClick={() => toggleProgram('belajar-mandiri', prog.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        prog.completed
                          ? 'bg-emerald-50/60 border-emerald-200'
                          : 'bg-white border-[#E7EDF4] hover:border-[#3B82F6]'
                      }`}
                    >
                      <Checkbox
                        checked={prog.completed}
                        label={prog.title}
                        sublabel={prog.duration}
                        onChange={() => toggleProgram('belajar-mandiri', prog.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section: Konsistensi 7 Hari (Expanded Web Bar Chart) */}
          <div className="bg-white rounded-3xl p-6 border border-[#E7EDF4] shadow-card flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#172B4D]">
                  Konsistensi 7 Hari Terakhir
                </h2>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Tingkat keberhasilan penyelesaian rutinitas harian dalam seminggu.
                </p>
              </div>
              <span className="text-xs font-semibold text-[#168567] bg-[#EAF8F1] px-3 py-1 rounded-lg">
                +20% Lebih Konsisten
              </span>
            </div>

            {/* Web Chart with Percentage Values and Dates */}
            <div className="grid grid-cols-7 gap-3 pt-4">
              {daysData.map((d, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 group">
                  <span className="text-[11px] font-bold text-[#172B4D]">
                    {d.percent}%
                  </span>
                  <div className="w-full max-w-[42px] h-36 bg-[#F1F5F9] rounded-xl relative flex items-end overflow-hidden p-1">
                    <div
                      style={{ height: `${d.percent}%` }}
                      className={`w-full rounded-lg transition-all duration-700 ${
                        d.isToday ? 'bg-[#3B82F6] shadow-sm' : 'bg-[#6BA1F9] group-hover:bg-[#3B82F6]'
                      }`}
                    />
                  </div>
                  <span className={`text-xs ${d.isToday ? 'font-bold text-[#3B82F6]' : 'font-medium text-[#172B4D]'}`}>
                    {d.label}
                  </span>
                  <span className="text-[10px] text-[#94A3B8]">
                    {d.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Sesi Fokus Cepat & Notifikasi Langsung */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Quick Focus Session Widget */}
          <div className="bg-white rounded-3xl p-6 border border-[#E7EDF4] shadow-card flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider text-[#3B82F6] uppercase bg-[#EFF6FF] px-2.5 py-1 rounded-md">
                RUTINITAS PAGI
              </span>
              <span className="text-xs text-[#64748B]">Program 3/3</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF8F1] flex items-center justify-center shrink-0">
                <IconLeaf className="w-6 h-6" color="#168567" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-base font-bold text-[#172B4D]">
                  Meditasi
                </h3>
                <span className="text-xs text-[#64748B]">
                  10 menit waktu fokus
                </span>
              </div>
            </div>

            <p className="text-xs text-[#64748B] italic bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
              "Tarik napas perlahan. Fokus pada momen ini."
            </p>

            <button
              onClick={() => handleStartSession('rutinitas-pagi')}
              className="w-full h-11 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
            >
              <IconLeaf className="w-4 h-4" color="#FFFFFF" />
              <span>Buka Ruang Fokus (08:42)</span>
            </button>
          </div>

          {/* Live Notification Preview Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#E7EDF4] shadow-card flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#E7EDF4] pb-3">
              <div className="flex items-center gap-2">
                <IconBell className="w-4 h-4 text-[#172B4D]" color="#172B4D" />
                <h3 className="text-sm font-bold text-[#172B4D]">
                  Pusat Pengingat
                </h3>
              </div>
              <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                Hari Ini 19.00
              </span>
            </div>

            <div className="bg-[#EFF6FF] rounded-2xl p-4 border border-[#DBEAFE] flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-lg bg-[#3B82F6] flex items-center justify-center text-white">
                    <IconCheck className="w-3.5 h-3.5" color="#FFFFFF" />
                  </div>
                  <span className="text-xs font-bold text-[#172B4D]">KONSISTEN</span>
                </div>
                <span className="text-[10px] text-[#64748B]">Sekarang</span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#172B4D]">
                  Waktunya mulai konsisten!
                </h4>
                <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                  Belajar Mandiri dimulai pukul 19.00. Dua program kecil untuk masa depanmu.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handleStartSession('belajar-mandiri')}
                  className="h-8 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Mulai
                </button>
                <button
                  onClick={() => onTabChange('notifikasi')}
                  className="h-8 bg-white hover:bg-slate-50 text-[#64748B] text-xs font-medium border border-[#E7EDF4] rounded-lg transition-colors"
                >
                  Detail
                </button>
              </div>
            </div>

            {/* Upcoming reminder */}
            <div className="flex items-center justify-between px-2 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-base">🌙</span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#172B4D]">Istirahat Malam</span>
                  <span className="text-[10px] text-[#64748B]">Pengingat berikutnya</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#172B4D]">21.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
