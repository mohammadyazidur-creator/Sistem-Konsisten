import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { StatusBar } from '../components/StatusBar';
import {
  IconBack,
  IconMore,
  IconLeaf,
  IconPause,
  IconChevron
} from '../components/Icons';
import { Button } from '../components/Button';
import { useApp } from '../context/AppContext';

export const SesiScreen = () => {
  const {
    selectedSchedule,
    setCurrentScreen,
    toggleProgram
  } = useApp();

  const totalSeconds = 600; // 10 minutes (matching "tersisa dari 10 menit")
  const [secondsLeft, setSecondsLeft] = useState(522); // 8:42 in seconds
  const [isRunning, setIsRunning] = useState(true);

  // Timer countdown
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

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Circular progress calculations
  const radius = 108;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = (totalSeconds - secondsLeft) / totalSeconds;
  const strokeDashoffset = circumference - progressRatio * circumference;

  const handleTogglePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleSkip = () => {
    setSecondsLeft(30); // Skip to last 30 seconds
  };

  const handleComplete = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Mark current program as completed
    const currentProg = selectedSchedule.programs[selectedSchedule.programs.length - 1];
    if (currentProg) {
      toggleProgram(selectedSchedule.id, currentProg.id);
    }

    setTimeout(() => {
      setCurrentScreen('dashboard');
    }, 1200);
  };

  return (
    <div className="w-[390px] h-[844px] bg-[#F8FAFC] flex flex-col justify-between overflow-hidden select-none font-sans relative">
      {/* iOS Status Bar */}
      <StatusBar time="9:41" />

      {/* Top Bar */}
      <div className="px-6 h-[44px] flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('detail')}
          className="w-9 h-9 rounded-xl bg-white border border-[#E7EDF4] flex items-center justify-center text-[#172B4D] hover:bg-slate-50 transition-colors"
          title="Kembali"
        >
          <IconBack className="w-5 h-5" color="#172B4D" />
        </button>
        <span className="text-[15px] font-semibold text-[#172B4D]">
          Sesi Konsisten
        </span>
        <button
          className="w-9 h-9 rounded-xl bg-white border border-[#E7EDF4] flex items-center justify-center text-[#172B4D] hover:bg-slate-50 transition-colors"
          title="Opsi Lainnya"
        >
          <IconMore className="w-5 h-5" color="#172B4D" />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 px-6 pt-2 pb-3 overflow-y-auto no-scrollbar flex flex-col justify-between items-center text-center">
        {/* Current Program Section */}
        <div className="flex flex-col items-center gap-1.5 w-full">
          <span className="text-[10px] font-semibold tracking-wider text-[#3B82F6] uppercase bg-[#EFF6FF] px-2.5 py-1 rounded-md">
            {selectedSchedule.name.toUpperCase()}
          </span>
          <h1 className="text-[23px] font-bold text-[#172B4D] tracking-tight mt-0.5">
            Waktunya untuk dirimu.
          </h1>
          <p className="text-[12px] text-[#64748B]">
            Program 3 dari 3
          </p>
        </div>

        {/* Big Circular Timer */}
        <div className="relative w-[258px] h-[258px] my-2 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 258 258">
            {/* Background Track */}
            <circle
              cx="129"
              cy="129"
              r={radius}
              className="stroke-[#EFF6FF]"
              strokeWidth="10"
              fill="none"
            />
            {/* Progress Bar */}
            <circle
              cx="129"
              cy="129"
              r={radius}
              className="stroke-[#3B82F6] transition-all duration-500 ease-linear"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {/* Time digits & caption inside ring */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[52px] font-semibold text-[#172B4D] tracking-tight leading-none">
              {formatTime(secondsLeft)}
            </span>
            <span className="text-[12px] text-[#64748B] mt-2">
              tersisa dari 10 menit
            </span>
          </div>
        </div>

        {/* Meditation Program Description */}
        <div className="flex flex-col items-center gap-2 w-full max-w-[300px]">
          <div className="w-[42px] h-[42px] rounded-xl bg-[#EAF8F1] flex items-center justify-center">
            <IconLeaf className="w-5 h-5" color="#168567" />
          </div>
          <h2 className="text-[22px] font-semibold text-[#172B4D] leading-tight">
            Meditasi
          </h2>
          <p className="text-[13px] text-[#64748B] leading-relaxed whitespace-pre-line">
            Tarik napas perlahan.{"\n"}Fokus pada momen ini.
          </p>
        </div>

        {/* Secondary Action Buttons (Jeda / Lewati) */}
        <div className="flex items-center gap-3 w-full pt-2">
          <button
            onClick={handleTogglePlayPause}
            className="flex-1 h-[46px] rounded-2xl bg-white border border-[#E7EDF4] hover:bg-slate-50 flex items-center justify-center gap-2 text-[13px] font-semibold text-[#172B4D] shadow-sm transition-all active:scale-[0.98]"
          >
            <IconPause className="w-4 h-4" color="#172B4D" />
            <span>{isRunning ? 'Jeda' : 'Lanjut'}</span>
          </button>

          <button
            onClick={handleSkip}
            className="flex-1 h-[46px] rounded-2xl bg-white border border-[#E7EDF4] hover:bg-slate-50 flex items-center justify-center gap-2 text-[13px] font-semibold text-[#172B4D] shadow-sm transition-all active:scale-[0.98]"
          >
            <IconChevron className="w-4 h-4" color="#172B4D" />
            <span>Lewati</span>
          </button>
        </div>
      </div>

      {/* Bottom Sticky Action Area */}
      <div className="w-full px-6 pt-2 pb-4 bg-white/80 backdrop-blur-md border-t border-[#E7EDF4] flex flex-col gap-3">
        <Button
          variant="primary"
          size="md"
          onClick={handleComplete}
        >
          Selesai
        </Button>

        {/* Home Indicator */}
        <div className="w-full flex items-center justify-center">
          <div className="w-[124px] h-[4px] bg-[#172B4D] rounded-full opacity-80" />
        </div>
      </div>
    </div>
  );
};
