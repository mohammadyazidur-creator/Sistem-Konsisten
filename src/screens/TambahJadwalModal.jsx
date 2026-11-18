import React, { useState } from 'react';
import {
  IconClose,
  IconSun,
  IconBook,
  IconActivity,
  IconMoon,
  IconClock
} from '../components/Icons';
import { Toggle } from '../components/Toggle';
import { Button } from '../components/Button';
import { useApp } from '../context/AppContext';

export const TambahJadwalModal = ({ isOpen, onClose }) => {
  const { addSchedule, setSelectedScheduleId } = useApp();

  const [name, setName] = useState('Rutinitas Sore');
  const [selectedIcon, setSelectedIcon] = useState('activity');
  const [selectedColor, setSelectedColor] = useState('#20A586');
  const [time, setTime] = useState('16.00');
  const [endTime, setEndTime] = useState('17.00');
  const [enableNotification, setEnableNotification] = useState(true);
  const [activeDays, setActiveDays] = useState([0, 1, 2, 3, 4, 5, 6]); // 0=Senin .. 6=Minggu

  if (!isOpen) return null;

  const weekdays = [
    { label: 'S', day: 'Sen' },
    { label: 'S', day: 'Sel' },
    { label: 'R', day: 'Rab' },
    { label: 'K', day: 'Kam' },
    { label: 'J', day: 'Jum' },
    { label: 'S', day: 'Sab' },
    { label: 'M', day: 'Min' },
  ];

  const iconOptions = [
    { id: 'sun', Icon: IconSun, bg: 'bg-[#FFF4E5]', color: '#B86A13' },
    { id: 'book', Icon: IconBook, bg: 'bg-[#EFF6FF]', color: '#3B82F6' },
    { id: 'activity', Icon: IconActivity, bg: 'bg-[#EAF8F1]', color: '#168567' },
    { id: 'moon', Icon: IconMoon, bg: 'bg-[#F2F0FF]', color: '#8060C2' },
  ];

  const colorOptions = ['#3B82F6', '#8B6ED1', '#20A586'];

  const toggleDay = (index) => {
    if (activeDays.includes(index)) {
      if (activeDays.length > 1) {
        setActiveDays(activeDays.filter(d => d !== index));
      }
    } else {
      setActiveDays([...activeDays, index].sort());
    }
  };

  const getDaysSummary = () => {
    if (activeDays.length === 7) return 'Setiap hari';
    if (activeDays.length === 5 && !activeDays.includes(5) && !activeDays.includes(6)) return 'Sen – Jum';
    return `${activeDays.length} hari per minggu`;
  };

  // Helper calculating duration between start and end time
  const calculateDuration = (start, end) => {
    try {
      const parseTime = (t) => {
        if (!t) return 0;
        const parts = t.replace(':', '.').split('.');
        const h = parseInt(parts[0], 10) || 0;
        const m = parseInt(parts[1], 10) || 0;
        return h * 60 + m;
      };
      const diff = parseTime(end) - parseTime(start);
      if (diff > 0) {
        const hours = Math.floor(diff / 60);
        const mins = diff % 60;
        if (hours > 0 && mins > 0) return `${hours} jam ${mins} menit`;
        if (hours > 0) return `${hours} jam`;
        return `${mins} menit`;
      }
      return '1 jam';
    } catch {
      return '1 jam';
    }
  };

  const handleSave = async () => {
    const newId = 'sch-' + Date.now();
    const durationText = calculateDuration(time, endTime);

    const newSchedule = {
      id: newId,
      name: name || 'Rutinitas Baru',
      time: time || '16.00',
      end_time: endTime || '17.00',
      days: getDaysSummary(),
      activeDays,
      status: 'Aktif',
      icon: selectedIcon,
      color: selectedColor,
      streak: 0,
      totalDuration: durationText,
      programs: [
        { title: 'Aktivitas Utama', duration: durationText, durationSec: 3600, completed: false }
      ]
    };

    await addSchedule(newSchedule);
    setSelectedScheduleId(newId);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity"
      />

      {/* Bottom Sheet */}
      <div className="relative w-full bg-white rounded-t-[28px] px-6 pt-3 pb-6 flex flex-col gap-4 shadow-modal z-10 max-h-[90%] overflow-y-auto no-scrollbar animate-in slide-in-from-bottom duration-300">
        {/* Handle */}
        <div className="w-full flex items-center justify-center pt-1 pb-1">
          <div className="w-10 h-1 bg-[#CBD5E1] rounded-full" />
        </div>

        {/* Heading & Close */}
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] font-bold text-[#172B4D] tracking-tight">
            Tambah Jadwal
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#64748B] hover:text-[#172B4D] transition-colors"
          >
            <IconClose className="w-4 h-4" />
          </button>
        </div>

        {/* Form: Nama Jadwal */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold text-[#172B4D]">
            Nama jadwal
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Rutinitas Sore"
            className="w-full h-[48px] px-4 rounded-2xl bg-white border border-[#E7EDF4] text-[14px] text-[#172B4D] focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>

        {/* Form: Ikon & Warna */}
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-semibold text-[#172B4D]">
            Ikon & warna
          </label>
          <div className="flex items-center justify-between">
            {/* Icon Badges */}
            <div className="flex items-center gap-2">
              {iconOptions.map(({ id, Icon, bg, color }) => {
                const isSelected = selectedIcon === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedIcon(id)}
                    className={`w-[42px] h-[42px] rounded-xl ${bg} flex items-center justify-center transition-all ${
                      isSelected ? 'ring-2 ring-offset-2 ring-[#3B82F6] scale-105' : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" color={color} />
                  </button>
                );
              })}
            </div>

            {/* Color Swatches */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#E7EDF4]">
              {colorOptions.map((c) => {
                const isSelected = selectedColor === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-7 h-7 rounded-full transition-all ${
                      isSelected ? 'ring-2 ring-offset-2 ring-[#172B4D] scale-110' : 'opacity-90 hover:opacity-100'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Form: Hari Aktif */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-[12px] font-semibold text-[#172B4D]">
              Hari aktif
            </label>
            <span className="text-[11px] font-medium text-[#3B82F6]">
              {getDaysSummary()}
            </span>
          </div>

          <div className="flex items-center justify-between gap-1.5">
            {weekdays.map((item, idx) => {
              const isActive = activeDays.includes(idx);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleDay(idx)}
                  className={`w-[40px] h-[40px] rounded-xl flex items-center justify-center text-[13px] font-semibold transition-all ${
                    isActive
                      ? 'bg-[#3B82F6] text-white shadow-sm'
                      : 'bg-white border border-[#E7EDF4] text-[#64748B] hover:border-[#CBD5E1]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form: Jam Mulai & Jam Selesai (2 Kolom Kiri - Kanan) */}
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-3">
            {/* Kolom Kiri: Jam Mulai */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-[#172B4D]">
                Jam mulai
              </label>
              <div className="w-full h-[48px] px-3.5 rounded-2xl bg-white border border-[#E7EDF4] flex items-center justify-between focus-within:border-[#3B82F6] transition-colors shadow-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <IconClock className="w-4 h-4 text-[#64748B] shrink-0" color="#64748B" />
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="16.00"
                    className="text-[18px] font-semibold text-[#172B4D] bg-transparent focus:outline-none w-16"
                  />
                </div>
                <span className="text-[10px] font-semibold text-[#64748B] bg-[#F1F5F9] px-1.5 py-0.5 rounded shrink-0">
                  WIB
                </span>
              </div>
            </div>

            {/* Kolom Kanan: Jam Selesai */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-[#172B4D]">
                Jam selesai
              </label>
              <div className="w-full h-[48px] px-3.5 rounded-2xl bg-white border border-[#E7EDF4] flex items-center justify-between focus-within:border-[#3B82F6] transition-colors shadow-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <IconClock className="w-4 h-4 text-[#64748B] shrink-0" color="#64748B" />
                  <input
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="17.00"
                    className="text-[18px] font-semibold text-[#172B4D] bg-transparent focus:outline-none w-16"
                  />
                </div>
                <span className="text-[10px] font-semibold text-[#64748B] bg-[#F1F5F9] px-1.5 py-0.5 rounded shrink-0">
                  WIB
                </span>
              </div>
            </div>
          </div>

          {/* Badge Estimasi Durasi */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#EFF6FF] rounded-xl text-[11px] text-[#3B82F6]">
            <span className="font-medium">⏱️ Estimasi durasi rutinitas:</span>
            <span className="font-bold">{calculateDuration(time, endTime)}</span>
          </div>
        </div>

        {/* Form: Notifikasi */}
        <div className="w-full py-1 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-[#172B4D]">
              Notifikasi
            </span>
            <span className="text-[11px] text-[#64748B]">
              Ingatkan saat jadwal dimulai
            </span>
          </div>
          <Toggle
            checked={enableNotification}
            onChange={setEnableNotification}
          />
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            variant="primary"
            size="md"
            onClick={handleSave}
          >
            Simpan Jadwal
          </Button>
        </div>

        {/* Home Indicator */}
        <div className="w-full flex items-center justify-center pt-2">
          <div className="w-[124px] h-[4px] bg-[#172B4D] rounded-full opacity-80" />
        </div>
      </div>
    </div>
  );
};
