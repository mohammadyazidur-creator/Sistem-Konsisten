import React, { useState } from 'react';
import {
  IconBell,
  IconCheck,
  IconMoon,
  IconSun,
  IconBook,
  IconActivity,
  IconClock
} from '../components/Icons';
import { Toggle } from '../components/Toggle';
import { useApp } from '../context/AppContext';

export const WebNotifikasiView = ({ onTabChange }) => {
  const { setSelectedScheduleId } = useApp();
  const [snoozed, setSnoozed] = useState(false);
  const [enableSound, setEnableSound] = useState(true);
  const [enableBrowserPush, setEnableBrowserPush] = useState(true);
  const [enableStreakAlerts, setEnableStreakAlerts] = useState(true);

  const handleStartSchedule = (id) => {
    setSelectedScheduleId(id);
    onTabChange('sesi');
  };

  return (
    <div className="flex flex-col gap-8 pb-12 font-sans select-none">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-[#E7EDF4] shadow-card flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#172B4D] tracking-tight">
            Pusat Notifikasi & Pengingat
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Pengingat tepat waktu agar kamu tidak melewatkan rutinitas harianmu.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          ● Notifikasi Browser Aktif
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Active Alert & Upcoming Schedule */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Active Interactive Notification Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-6 border border-[#DBEAFE] shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#3B82F6] flex items-center justify-center text-white shadow-sm">
                  <IconCheck className="w-4 h-4" color="#FFFFFF" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#172B4D] tracking-wider uppercase">
                    KONSISTEN NOTIFIKASI
                  </span>
                  <span className="text-[11px] text-[#64748B] block">
                    Senin, 16 November 2026 · Sekarang (19.00)
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#3B82F6] bg-blue-100 px-3 py-1 rounded-full animate-pulse">
                Peringatan Aktif
              </span>
            </div>

            {!snoozed ? (
              <div className="bg-white rounded-2xl p-5 border border-blue-100 flex flex-col gap-3">
                <h3 className="text-lg font-bold text-[#172B4D]">
                  Waktunya mulai konsisten!
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  Belajar Mandiri dimulai pukul 19.00. Dua program kecil untuk masa depanmu:
                  membaca dokumentasi dan latihan koding.
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => handleStartSchedule('belajar-mandiri')}
                    className="h-11 px-6 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold shadow-sm transition-all active:scale-95 flex items-center gap-2"
                  >
                    <span>Mulai Belajar Mandiri Sekarang</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={() => setSnoozed(true)}
                    className="h-11 px-5 rounded-xl bg-[#F8FAFC] hover:bg-slate-100 text-[#64748B] text-xs font-medium border border-[#E7EDF4] transition-colors"
                  >
                    Tunda 10 Menit
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white/80 p-4 rounded-2xl border border-blue-100 text-center text-xs text-[#64748B]">
                Pengingat telah ditunda 10 menit. Kami akan mengingatkanmu kembali pada 19.10 WIB.
              </div>
            )}
          </div>

          {/* Timeline of Scheduled Reminders */}
          <div className="bg-white rounded-3xl p-6 border border-[#E7EDF4] shadow-card flex flex-col gap-5">
            <h2 className="text-base font-bold text-[#172B4D]">
              Jadwal Pengingat Mendatang
            </h2>

            <div className="flex flex-col gap-3">
              {[
                {
                  id: 'belajar-mandiri',
                  name: 'Belajar Mandiri',
                  time: '19.00 WIB',
                  day: 'Hari ini',
                  desc: '2 program · Membaca & Koding',
                  icon: IconBook,
                  bg: 'bg-[#EFF6FF]',
                  color: '#3B82F6',
                  active: true
                },
                {
                  id: 'istirahat-malam',
                  name: 'Istirahat Malam',
                  time: '21.00 WIB',
                  day: 'Hari ini',
                  desc: '1 program · Review Hari & Matikan Layar',
                  icon: IconMoon,
                  bg: 'bg-[#F2F0FF]',
                  color: '#8060C2',
                  active: false
                },
                {
                  id: 'rutinitas-pagi',
                  name: 'Rutinitas Pagi',
                  time: '06.00 WIB',
                  day: 'Besok',
                  desc: '3 program · Minum air, Peregangan, Meditasi',
                  icon: IconSun,
                  bg: 'bg-[#FFF4E5]',
                  color: '#B86A13',
                  active: false
                }
              ].map((rem) => {
                const Icon = rem.icon;
                return (
                  <div
                    key={rem.name}
                    className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                      rem.active
                        ? 'border-[#3B82F6] bg-blue-50/30'
                        : 'border-[#E7EDF4] bg-[#F8FAFC]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${rem.bg} flex items-center justify-center shrink-0`}>
                        <Icon className="w-5 h-5" color={rem.color} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-[#172B4D]">
                            {rem.name}
                          </h4>
                          <span className="text-[10px] text-[#64748B] font-medium bg-white px-2 py-0.5 rounded border border-[#E7EDF4]">
                            {rem.day}
                          </span>
                        </div>
                        <span className="text-xs text-[#64748B]">
                          {rem.desc}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-[#172B4D]">
                        {rem.time}
                      </span>
                      <button
                        onClick={() => handleStartSchedule(rem.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-[#E7EDF4] hover:bg-slate-50 text-[#3B82F6] transition-colors"
                      >
                        Buka Sesi
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Settings & Philosophy Card */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Notification Preferences */}
          <div className="bg-white rounded-3xl p-6 border border-[#E7EDF4] shadow-card flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[#172B4D] border-b border-[#E7EDF4] pb-3">
              Pengaturan Notifikasi
            </h3>

            <div className="flex items-center justify-between py-1">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#172B4D]">
                  Suara Pengingat
                </span>
                <span className="text-[10px] text-[#64748B]">
                  Bunyikan nada lembut saat jadwal mulai
                </span>
              </div>
              <Toggle checked={enableSound} onChange={setEnableSound} />
            </div>

            <div className="flex items-center justify-between py-1">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#172B4D]">
                  Notifikasi Browser Web
                </span>
                <span className="text-[10px] text-[#64748B]">
                  Munculkan banner di desktop
                </span>
              </div>
              <Toggle checked={enableBrowserPush} onChange={setEnableBrowserPush} />
            </div>

            <div className="flex items-center justify-between py-1">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#172B4D]">
                  Pemberitahuan Streak
                </span>
                <span className="text-[10px] text-[#64748B]">
                  Rayakan pencapaian rekor kebiasaan
                </span>
              </div>
              <Toggle checked={enableStreakAlerts} onChange={setEnableStreakAlerts} />
            </div>
          </div>

          {/* Philosophy Card */}
          <div className="bg-[#EFF6FF] rounded-3xl p-6 border border-[#DBEAFE] flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#172B4D] shadow-sm">
              <IconBell className="w-6 h-6" color="#3B82F6" />
            </div>
            <h4 className="text-sm font-bold text-[#172B4D]">
              Pengingat Kecil yang Berarti
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Konsistensi tidak dibangun dari langkah raksasa sesekali, melainkan dari pengingat kecil yang kamu tepati setiap hari.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
