import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  IconLeaf,
  IconPause,
  IconChevron,
  IconCheck,
  IconClock,
  IconBack
} from '../components/Icons';
import { useApp } from '../context/AppContext';

export const WebSesiView = ({ onTabChange }) => {
  const {
    selectedSchedule,
    toggleProgram
  } = useApp();

  const totalSeconds = 600; // 10 minutes
  const [secondsLeft, setSecondsLeft] = useState(522); // 8:42
  const [isRunning, setIsRunning] = useState(true);
  const [isZenMode, setIsZenMode] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      handleComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const radius = 130;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = (totalSeconds - secondsLeft) / totalSeconds;
  const strokeDashoffset = circumference - progressRatio * circumference;

  const handleTogglePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleSkip = () => {
    setSecondsLeft(20);
  };

  const handleAddFiveMin = () => {
    setSecondsLeft((prev) => prev + 300);
  };

  const handleComplete = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 }
    });

    const currentProg = selectedSchedule.programs[selectedSchedule.programs.length - 1];
    if (currentProg) {
      toggleProgram(selectedSchedule.id, currentProg.id);
    }

    setTimeout(() => {
      onTabChange('dashboard');
    }, 1500);
  };

  return (
    <div className={`flex flex-col gap-8 pb-12 font-sans select-none transition-all ${isZenMode ? 'fixed inset-0 z-50 bg-[#0F172A] text-white p-12 overflow-auto' : ''}`}>
      {/* Top Header / Back */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onTabChange('dashboard')}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              isZenMode
                ? 'bg-slate-800 text-white hover:bg-slate-700'
                : 'bg-white border border-[#E7EDF4] text-[#172B4D] hover:bg-slate-50'
            }`}
          >
            <IconBack className="w-5 h-5" />
          </button>
          <div>
            <span className="text-xs font-semibold text-[#3B82F6] tracking-wider uppercase">
              {selectedSchedule.name} · Program 3 dari 3
            </span>
            <h1 className={`text-2xl font-bold tracking-tight ${isZenMode ? 'text-white' : 'text-[#172B4D]'}`}>
              Waktunya untuk dirimu.
            </h1>
          </div>
        </div>

        {/* Zen Mode Button */}
        <button
          onClick={() => setIsZenMode(!isZenMode)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
            isZenMode
              ? 'bg-blue-600 border-blue-500 text-white'
              : 'bg-white border-[#E7EDF4] text-[#172B4D] hover:bg-slate-50'
          }`}
        >
          {isZenMode ? 'Keluar Mode Zen' : '🧘 Mode Zen / Layar Penuh'}
        </button>
      </div>

      {/* Main Grid: Big Timer (Center) + Checklist (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Timer Area (8 cols) */}
        <div className={`lg:col-span-8 flex flex-col items-center justify-center p-8 lg:p-12 rounded-3xl border shadow-card transition-all ${
          isZenMode ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-[#E7EDF4]'
        }`}>
          {/* Circular Countdown Timer */}
          <div className="relative w-80 h-80 my-4 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 300 300">
              <circle
                cx="150"
                cy="150"
                r={radius}
                className={isZenMode ? 'stroke-slate-700' : 'stroke-[#EFF6FF]'}
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="150"
                cy="150"
                r={radius}
                className="stroke-[#3B82F6] transition-all duration-500 ease-linear"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Digits inside timer */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className={`text-6xl font-extrabold tracking-tight font-mono ${isZenMode ? 'text-white' : 'text-[#172B4D]'}`}>
                {formatTime(secondsLeft)}
              </span>
              <span className={`text-xs mt-2 font-medium ${isZenMode ? 'text-slate-400' : 'text-[#64748B]'}`}>
                tersisa dari 10 menit
              </span>
            </div>
          </div>

          {/* Activity Info Banner */}
          <div className="flex flex-col items-center text-center gap-2 max-w-md mt-2">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF8F1] flex items-center justify-center">
              <IconLeaf className="w-6 h-6" color="#168567" />
            </div>
            <h2 className={`text-2xl font-bold ${isZenMode ? 'text-white' : 'text-[#172B4D]'}`}>
              Meditasi
            </h2>
            <p className={`text-sm italic leading-relaxed whitespace-pre-line ${isZenMode ? 'text-slate-300' : 'text-[#64748B]'}`}>
              "Tarik napas perlahan.{"\n"}Fokus pada momen ini."
            </p>
          </div>

          {/* Action Control Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6 w-full max-w-md">
            <button
              onClick={handleTogglePlayPause}
              className={`flex-1 h-12 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 border ${
                isZenMode
                  ? 'bg-slate-700 hover:bg-slate-600 border-slate-600 text-white'
                  : 'bg-white hover:bg-slate-50 border-[#E7EDF4] text-[#172B4D]'
              }`}
            >
              <IconPause className="w-4 h-4" />
              <span>{isRunning ? 'Jeda Waktu' : 'Lanjutkan'}</span>
            </button>

            <button
              onClick={handleSkip}
              className={`flex-1 h-12 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 border ${
                isZenMode
                  ? 'bg-slate-700 hover:bg-slate-600 border-slate-600 text-white'
                  : 'bg-white hover:bg-slate-50 border-[#E7EDF4] text-[#172B4D]'
              }`}
            >
              <IconChevron className="w-4 h-4" />
              <span>Lewati Sesi</span>
            </button>

            <button
              onClick={handleAddFiveMin}
              className={`h-12 px-4 rounded-2xl font-semibold text-xs border transition-all active:scale-95 ${
                isZenMode
                  ? 'bg-slate-700 hover:bg-slate-600 border-slate-600 text-white'
                  : 'bg-[#F8FAFC] hover:bg-slate-100 border-[#E7EDF4] text-[#64748B]'
              }`}
            >
              +5 Menit
            </button>

            <button
              onClick={handleComplete}
              className="w-full h-12 rounded-2xl font-semibold text-sm bg-[#3B82F6] hover:bg-[#2563EB] text-white flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <IconCheck className="w-4 h-4" color="#FFFFFF" />
              <span>Selesai & Rayakan Progres</span>
            </button>
          </div>
        </div>

        {/* Right Column: Routine Checklist & Breathing Guide (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Routine Programs Checklist */}
          <div className={`p-6 rounded-3xl border shadow-card flex flex-col gap-4 ${
            isZenMode ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-[#E7EDF4]'
          }`}>
            <h3 className={`text-base font-bold ${isZenMode ? 'text-white' : 'text-[#172B4D]'}`}>
              Daftar Program {selectedSchedule.name}
            </h3>

            <div className="flex flex-col gap-2.5">
              {selectedSchedule.programs.map((prog, idx) => {
                const isCurrent = idx === selectedSchedule.programs.length - 1;
                return (
                  <div
                    key={prog.id}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                      isCurrent
                        ? 'border-[#3B82F6] bg-blue-50/50'
                        : prog.completed
                        ? 'border-emerald-200 bg-emerald-50/40 opacity-75'
                        : 'border-[#E7EDF4] bg-[#F8FAFC]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                        prog.completed
                          ? 'bg-emerald-500 text-white'
                          : isCurrent
                          ? 'bg-[#3B82F6] text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}>
                        {prog.completed ? '✓' : idx + 1}
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-xs font-semibold ${isCurrent ? 'text-[#3B82F6]' : 'text-[#172B4D]'}`}>
                          {prog.title}
                        </span>
                        <span className="text-[10px] text-[#64748B]">
                          {prog.duration}
                        </span>
                      </div>
                    </div>
                    {isCurrent && (
                      <span className="text-[10px] font-bold text-[#3B82F6] bg-blue-100 px-2 py-0.5 rounded-full">
                        Sedang Berjalan
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Relaxing Breathing Animation Card */}
          <div className={`p-6 rounded-3xl border shadow-card flex flex-col items-center text-center gap-3 ${
            isZenMode ? 'bg-slate-800/60 border-slate-700 text-slate-300' : 'bg-[#EFF6FF] border-[#DBEAFE] text-[#172B4D]'
          }`}>
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center animate-ping duration-1000">
              <div className="w-10 h-10 rounded-full bg-blue-500/40 flex items-center justify-center">
                <span className="text-xl">🌬️</span>
              </div>
            </div>
            <h4 className="text-sm font-bold mt-2">
              Panduan Bernapas Teratur
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Tarik napas dalam 4 detik, tahan 4 detik, lalu hembuskan perlahan selama 4 detik.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
