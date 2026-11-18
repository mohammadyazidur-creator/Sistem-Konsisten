import React, { useState } from 'react';
import { StatusBar } from '../components/StatusBar';
import {
  IconCheck,
  IconMoon,
  IconBell
} from '../components/Icons';
import { Button } from '../components/Button';
import { useApp } from '../context/AppContext';

export const NotifikasiScreen = () => {
  const { setCurrentScreen, setSelectedScheduleId } = useApp();
  const [snoozed, setSnoozed] = useState(false);

  const handleStartSchedule = () => {
    setSelectedScheduleId('belajar-mandiri');
    setCurrentScreen('sesi');
  };

  const handleUnlock = () => {
    setCurrentScreen('dashboard');
  };

  return (
    <div className="w-[390px] h-[844px] bg-gradient-to-b from-[#EAF2FF] via-[#DBEAFE] to-[#E0EDFF] flex flex-col justify-between overflow-hidden select-none font-sans relative">
      {/* Status Bar */}
      <StatusBar time="19:00" />

      {/* Main Lock Screen Content */}
      <div className="flex-1 px-6 pt-3 pb-2 flex flex-col justify-between overflow-y-auto no-scrollbar">
        {/* Lock Screen Clock */}
        <div className="flex flex-col items-center text-center mt-2">
          <span className="text-[16px] font-medium text-[#172B4D]/80">
            Senin, 16 November
          </span>
          <span className="text-[76px] font-semibold text-[#172B4D] tracking-tighter leading-none mt-1">
            19.00
          </span>
        </div>

        {/* Notification Center Section */}
        <div className="flex flex-col gap-3 my-auto w-full">
          {/* Section Label */}
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-semibold tracking-wider text-[#64748B] uppercase">
              PUSAT NOTIFIKASI
            </span>
            <span className="text-[10px] text-[#64748B]">
              Sekarang
            </span>
          </div>

          {/* Main Konsisten Push Notification */}
          {!snoozed ? (
            <div className="w-full bg-white/90 backdrop-blur-xl rounded-2xl p-4 border border-white/80 shadow-modal flex flex-col gap-3 transition-all">
              {/* App Sender Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#3B82F6] flex items-center justify-center text-white shadow-sm">
                    <IconCheck className="w-4 h-4" color="#FFFFFF" />
                  </div>
                  <span className="text-[10px] font-bold tracking-wider text-[#172B4D]">
                    KONSISTEN
                  </span>
                </div>
                <span className="text-[10px] text-[#64748B]">
                  sekarang
                </span>
              </div>

              {/* Message Content */}
              <div className="flex flex-col gap-1">
                <h3 className="text-[17px] font-semibold text-[#172B4D] tracking-tight">
                  Waktunya mulai konsisten!
                </h3>
                <p className="text-[12px] text-[#64748B] leading-relaxed whitespace-pre-line">
                  Belajar Mandiri dimulai pukul 19.00.{"\n"}Dua program kecil untuk masa depanmu.
                </p>
              </div>

              {/* Notification Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleStartSchedule}
                >
                  Mulai
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setSnoozed(true)}
                >
                  Tunda
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-full bg-white/70 backdrop-blur-md rounded-2xl p-3 border border-white/60 text-center text-[12px] text-[#64748B]">
              Notifikasi ditunda 10 menit.
            </div>
          )}

          {/* Next Reminder Preview */}
          <div className="w-full bg-white/70 backdrop-blur-md rounded-2xl px-3.5 py-3 border border-white/60 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F2F0FF] flex items-center justify-center shrink-0">
              <IconMoon className="w-5 h-5" color="#8060C2" />
            </div>
            <div className="flex-1 flex flex-col min-w-0">
              <span className="text-[13px] font-semibold text-[#172B4D]">
                Istirahat Malam
              </span>
              <span className="text-[11px] text-[#64748B] mt-0.5">
                Pengingat berikutnya · 21.00
              </span>
            </div>
          </div>
        </div>

        {/* Motivational Explanation Quote */}
        <div className="flex flex-col items-center text-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-full bg-white/60 flex items-center justify-center text-[#172B4D]">
            <IconBell className="w-4 h-4" color="#172B4D" />
          </div>
          <p className="text-[13px] text-[#64748B] leading-relaxed whitespace-pre-line">
            Pengingat kecil untuk{"\n"}kebiasaan yang berarti.
          </p>
        </div>
      </div>

      {/* Bottom Area: Unlock swipe cue */}
      <div
        onClick={handleUnlock}
        className="w-full pb-4 pt-1 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="text-[11px] text-[#172B4D]/70 font-medium group-hover:text-[#172B4D] transition-colors">
          Geser ke atas untuk membuka
        </span>
        <div className="w-[124px] h-[4px] bg-[#172B4D] rounded-full opacity-80" />
      </div>
    </div>
  );
};
