import React, { useState } from 'react';
import { StatusBar } from '../components/StatusBar';
import {
  IconBack,
  IconMore,
  IconPlus
} from '../components/Icons';
import { Checkbox } from '../components/Checkbox';
import { Button } from '../components/Button';
import { useApp } from '../context/AppContext';

export const DetailJadwalScreen = () => {
  const {
    selectedSchedule,
    toggleProgram,
    setCurrentScreen,
    addSchedule
  } = useApp();

  const [newProgramName, setNewProgramName] = useState('');
  const [newProgramDuration, setNewProgramDuration] = useState('5 menit');
  const [showAddProgram, setShowAddProgram] = useState(false);

  const sch = selectedSchedule;
  const completedCount = sch.programs.filter(p => p.completed).length;
  const totalCount = sch.programs.length;

  const handleAddProgramSubmit = (e) => {
    e.preventDefault();
    if (!newProgramName.trim()) return;
    const newProg = {
      id: 'prog-' + Date.now(),
      title: newProgramName.trim(),
      duration: newProgramDuration,
      durationSec: parseInt(newProgramDuration) * 60 || 300,
      completed: false
    };
    sch.programs.push(newProg);
    setNewProgramName('');
    setShowAddProgram(false);
  };

  const handleStartSession = () => {
    setCurrentScreen('sesi');
  };

  return (
    <div className="w-[390px] h-[844px] bg-[#F8FAFC] flex flex-col justify-between overflow-hidden select-none font-sans relative">
      {/* iOS Status Bar */}
      <StatusBar time="9:41" />

      {/* Top Bar */}
      <div className="px-6 h-[44px] flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="w-9 h-9 rounded-xl bg-white border border-[#E7EDF4] flex items-center justify-center text-[#172B4D] hover:bg-slate-50 transition-colors"
          title="Kembali"
        >
          <IconBack className="w-5 h-5" color="#172B4D" />
        </button>
        <span className="text-[15px] font-semibold text-[#172B4D]">
          Detail Jadwal
        </span>
        <button
          className="w-9 h-9 rounded-xl bg-white border border-[#E7EDF4] flex items-center justify-center text-[#172B4D] hover:bg-slate-50 transition-colors"
          title="Opsi Lainnya"
        >
          <IconMore className="w-5 h-5" color="#172B4D" />
        </button>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 px-6 pt-3 pb-4 overflow-y-auto no-scrollbar flex flex-col gap-4">
        {/* Schedule Title Card */}
        <div className="flex flex-col gap-1">
          <h1 className="text-[25px] font-bold text-[#172B4D] tracking-tight leading-tight">
            {sch.name}
          </h1>
          <p className="text-[12px] text-[#64748B]">
            {sch.time}{sch.end_time ? ` – ${sch.end_time}` : ''} · {sch.days || sch.days_summary}
          </p>
        </div>

        {/* 3 Stats Cards */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-white rounded-2xl p-3 border border-[#E7EDF4] shadow-card flex flex-col items-center justify-center">
            <span className="text-[19px] font-semibold text-[#172B4D]">
              {sch.programs.length}
            </span>
            <span className="text-[10px] text-[#64748B] mt-0.5">
              Program
            </span>
          </div>

          <div className="bg-white rounded-2xl p-3 border border-[#E7EDF4] shadow-card flex flex-col items-center justify-center">
            <span className="text-[19px] font-semibold text-[#172B4D]">
              {sch.totalDuration || '17 mnt'}
            </span>
            <span className="text-[10px] text-[#64748B] mt-0.5">
              Total durasi
            </span>
          </div>

          <div className="bg-white rounded-2xl p-3 border border-[#E7EDF4] shadow-card flex flex-col items-center justify-center">
            <span className="text-[19px] font-semibold text-[#172B4D]">
              {sch.streak || 7} hari
            </span>
            <span className="text-[10px] text-[#64748B] mt-0.5">
              Streak
            </span>
          </div>
        </div>

        {/* Section: Program Kamu */}
        <div className="flex flex-col gap-2.5 pt-1">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold text-[#172B4D]">
              Program kamu
            </h2>
            <span className="text-[12px] font-medium text-[#3B82F6]">
              {completedCount}/{totalCount} selesai
            </span>
          </div>

          {/* Program Checklist Items */}
          <div className="flex flex-col gap-2">
            {sch.programs.map((prog) => (
              <div
                key={prog.id}
                onClick={() => toggleProgram(sch.id, prog.id)}
                className="w-full bg-white rounded-2xl p-3.5 border border-[#E7EDF4] shadow-card flex items-center justify-between cursor-pointer hover:border-[#3B82F6] transition-all"
              >
                <Checkbox
                  checked={prog.completed}
                  label={prog.title}
                  sublabel={prog.duration}
                  onChange={() => toggleProgram(sch.id, prog.id)}
                />
                <span className="text-[12px] text-[#64748B]">
                  {prog.completed ? 'Selesai' : 'Mulai'}
                </span>
              </div>
            ))}
          </div>

          {/* Add Program Trigger */}
          {showAddProgram ? (
            <form onSubmit={handleAddProgramSubmit} className="bg-white rounded-2xl p-3.5 border border-[#3B82F6] flex flex-col gap-2.5">
              <input
                type="text"
                placeholder="Nama program baru (cth: Meditasi)"
                value={newProgramName}
                onChange={(e) => setNewProgramName(e.target.value)}
                autoFocus
                className="w-full h-10 px-3 text-[13px] border border-[#E7EDF4] rounded-xl focus:outline-none focus:border-[#3B82F6]"
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Durasi (cth: 10 menit)"
                  value={newProgramDuration}
                  onChange={(e) => setNewProgramDuration(e.target.value)}
                  className="flex-1 h-10 px-3 text-[13px] border border-[#E7EDF4] rounded-xl focus:outline-none focus:border-[#3B82F6]"
                />
                <Button size="sm" type="submit" fullWidth={false}>
                  Simpan
                </Button>
                <button
                  type="button"
                  onClick={() => setShowAddProgram(false)}
                  className="h-10 px-3 text-[12px] text-[#64748B] hover:text-[#172B4D]"
                >
                  Batal
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowAddProgram(true)}
              className="w-full h-[46px] rounded-2xl border border-dashed border-[#CBD5E1] bg-white hover:bg-slate-50 text-[14px] font-semibold text-[#3B82F6] flex items-center justify-center gap-2 transition-colors"
            >
              <IconPlus className="w-4 h-4" color="#3B82F6" />
              <span>Tambah Program</span>
            </button>
          )}
        </div>

        {/* Encouragement Card */}
        <div className="w-full bg-[#EFF6FF] rounded-2xl p-4 border border-[#DBEAFE] flex flex-col gap-1 mt-1">
          <h4 className="text-[14px] font-semibold text-[#172B4D]">
            Sedikit lagi, kamu bisa.
          </h4>
          <p className="text-[12px] text-[#64748B] leading-relaxed">
            Selesaikan meditasi untuk menutup pagimu dengan lebih tenang.
          </p>
        </div>
      </div>

      {/* Bottom Sticky Action Area */}
      <div className="w-full px-6 pt-2 pb-4 bg-white/80 backdrop-blur-md border-t border-[#E7EDF4] flex flex-col gap-3">
        <Button
          variant="primary"
          size="md"
          onClick={handleStartSession}
        >
          Mulai Konsisten
        </Button>

        {/* Home Indicator */}
        <div className="w-full flex items-center justify-center">
          <div className="w-[124px] h-[4px] bg-[#172B4D] rounded-full opacity-80" />
        </div>
      </div>
    </div>
  );
};
