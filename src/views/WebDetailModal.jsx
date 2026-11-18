import React, { useState } from 'react';
import {
  IconClose,
  IconPlus,
  IconLeaf
} from '../components/Icons';
import { Checkbox } from '../components/Checkbox';
import { Button } from '../components/Button';
import { useApp } from '../context/AppContext';

export const WebDetailModal = ({ scheduleId, isOpen, onClose, onStartSession }) => {
  const { schedules, toggleProgram } = useApp();

  const [newProgramName, setNewProgramName] = useState('');
  const [newProgramDuration, setNewProgramDuration] = useState('5 menit');
  const [showAddProgram, setShowAddProgram] = useState(false);

  if (!isOpen) return null;

  const sch = schedules.find(s => s.id === scheduleId) || schedules[0];
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E7EDF4] z-10 flex flex-col gap-6 max-h-[90vh] overflow-y-auto no-scrollbar animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#E7EDF4] pb-4">
          <div>
            <span className="text-xs font-semibold text-[#3B82F6] tracking-wider uppercase">
              Detail Jadwal
            </span>
            <h2 className="text-2xl font-bold text-[#172B4D] tracking-tight mt-0.5">
              {sch.name}
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              {sch.time}{sch.end_time ? ` – ${sch.end_time}` : ''} WIB · {sch.days_summary || sch.days}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#64748B] hover:text-[#172B4D] flex items-center justify-center transition-colors"
          >
            <IconClose className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Stats Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#F8FAFC] rounded-2xl p-3.5 border border-[#E7EDF4] flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-[#172B4D]">
              {sch.programs.length}
            </span>
            <span className="text-[11px] text-[#64748B] mt-0.5">
              Program
            </span>
          </div>

          <div className="bg-[#F8FAFC] rounded-2xl p-3.5 border border-[#E7EDF4] flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-[#172B4D]">
              {sch.totalDuration || '17 mnt'}
            </span>
            <span className="text-[11px] text-[#64748B] mt-0.5">
              Total Durasi
            </span>
          </div>

          <div className="bg-[#F8FAFC] rounded-2xl p-3.5 border border-[#E7EDF4] flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-[#172B4D]">
              {sch.streak || 7} hari
            </span>
            <span className="text-[11px] text-[#64748B] mt-0.5">
              Streak
            </span>
          </div>
        </div>

        {/* Program Checklist */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#172B4D]">
              Daftar Program Aktivitas
            </h3>
            <span className="text-xs font-semibold text-[#3B82F6]">
              {completedCount}/{totalCount} selesai
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {sch.programs.map((prog) => (
              <div
                key={prog.id}
                onClick={() => toggleProgram(sch.id, prog.id)}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                  prog.completed
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-white border-[#E7EDF4] hover:border-[#3B82F6]'
                }`}
              >
                <Checkbox
                  checked={prog.completed}
                  label={prog.title}
                  sublabel={prog.duration}
                  onChange={() => toggleProgram(sch.id, prog.id)}
                />
                <span className={`text-xs font-medium ${prog.completed ? 'text-emerald-700' : 'text-[#64748B]'}`}>
                  {prog.completed ? 'Selesai ✓' : 'Belum Selesai'}
                </span>
              </div>
            ))}
          </div>

          {/* Add Program Trigger */}
          {showAddProgram ? (
            <form onSubmit={handleAddProgramSubmit} className="bg-slate-50 rounded-2xl p-4 border border-[#3B82F6] flex flex-col gap-3 mt-1">
              <input
                type="text"
                placeholder="Nama program (cth: Meditasi Pagi)"
                value={newProgramName}
                onChange={(e) => setNewProgramName(e.target.value)}
                autoFocus
                className="w-full h-10 px-3 text-xs border border-[#E7EDF4] rounded-xl bg-white focus:outline-none focus:border-[#3B82F6]"
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Durasi (cth: 10 menit)"
                  value={newProgramDuration}
                  onChange={(e) => setNewProgramDuration(e.target.value)}
                  className="flex-1 h-10 px-3 text-xs border border-[#E7EDF4] rounded-xl bg-white focus:outline-none focus:border-[#3B82F6]"
                />
                <Button size="sm" type="submit" fullWidth={false}>
                  Simpan
                </Button>
                <button
                  type="button"
                  onClick={() => setShowAddProgram(false)}
                  className="h-10 px-3 text-xs text-[#64748B] hover:text-[#172B4D]"
                >
                  Batal
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowAddProgram(true)}
              className="w-full h-11 rounded-2xl border border-dashed border-[#CBD5E1] hover:border-[#3B82F6] bg-white hover:bg-slate-50 text-xs font-semibold text-[#3B82F6] flex items-center justify-center gap-2 transition-all mt-1"
            >
              <IconPlus className="w-4 h-4" color="#3B82F6" />
              <span>Tambah Program Aktivitas</span>
            </button>
          )}
        </div>

        {/* Motivational Quote */}
        <div className="bg-[#EFF6FF] rounded-2xl p-4 border border-[#DBEAFE] flex flex-col gap-1">
          <h4 className="text-xs font-bold text-[#172B4D]">
            Sedikit lagi, kamu bisa.
          </h4>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Selesaikan program kebiasaanmu hari ini untuk menutup harimu dengan tenang dan puas.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              onClose();
              onStartSession(sch.id);
            }}
          >
            Mulai Konsisten Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
};
