import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Toggle } from '../components/Toggle';
import { Checkbox } from '../components/Checkbox';
import { StatusBar } from '../components/StatusBar';
import { BottomNav } from '../components/BottomNav';
import {
  IconBell,
  IconFlame,
  IconSun,
  IconBook,
  IconActivity,
  IconMoon,
  IconSearch,
  IconPlus,
  IconCheck,
  IconLeaf,
  IconClock,
  IconBack,
  IconMore,
  IconPause,
  IconChevron,
  IconSettings,
  IconHome,
  IconCalendar
} from '../components/Icons';

export const KomponenScreen = () => {
  const [toggleState, setToggleState] = useState(true);
  const [checkbox1, setCheckbox1] = useState(true);
  const [checkbox2, setCheckbox2] = useState(false);
  const [activeTabDemo, setActiveTabDemo] = useState('dashboard');

  const colorTokens = [
    { name: 'Primary / Brand', hex: '#3B82F6', text: 'white' },
    { name: 'Brand 50', hex: '#EFF6FF', text: '#172B4D' },
    { name: 'Brand 100', hex: '#DBEAFE', text: '#172B4D' },
    { name: 'Text Dark', hex: '#172B4D', text: 'white' },
    { name: 'Text Secondary', hex: '#64748B', text: 'white' },
    { name: 'App Background', hex: '#F8FAFC', text: '#172B4D' },
    { name: 'Border', hex: '#E7EDF4', text: '#172B4D' },
    { name: 'Amber Badge', hex: '#FFF4E5', text: '#B86A13' },
    { name: 'Green Badge', hex: '#EAF8F1', text: '#168567' },
    { name: 'Purple Badge', hex: '#F2F0FF', text: '#8060C2' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-sm border border-[#E7EDF4] flex flex-col gap-8 font-sans">
      {/* Header */}
      <div className="border-b border-[#E7EDF4] pb-5">
        <h1 className="text-[28px] font-bold text-[#172B4D] tracking-tight">
          Konsisten / UI kit
        </h1>
        <p className="text-[14px] text-[#64748B] mt-1">
          Inter · Mode terang · Radius 16 · #3B82F6
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[14px] font-semibold text-[#172B4D] uppercase tracking-wider">
          Buttons
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] text-[#64748B]">Style=Primary</span>
            <Button variant="primary">Mulai Sekarang</Button>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] text-[#64748B]">Style=Secondary</span>
            <Button variant="secondary">Mulai Sekarang</Button>
          </div>
        </div>
      </div>

      {/* Toggles & Checkboxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          <h3 className="text-[14px] font-semibold text-[#172B4D] uppercase tracking-wider">
            Toggle Switch
          </h3>
          <div className="flex items-center gap-6 bg-[#F8FAFC] p-4 rounded-2xl border border-[#E7EDF4]">
            <div className="flex items-center gap-3">
              <Toggle checked={true} onChange={() => {}} />
              <span className="text-[13px] font-medium text-[#172B4D]">State=On</span>
            </div>
            <div className="flex items-center gap-3">
              <Toggle checked={false} onChange={() => {}} />
              <span className="text-[13px] font-medium text-[#172B4D]">State=Off</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-[14px] font-semibold text-[#172B4D] uppercase tracking-wider">
            Checkbox
          </h3>
          <div className="flex items-center gap-6 bg-[#F8FAFC] p-4 rounded-2xl border border-[#E7EDF4]">
            <div className="flex items-center gap-2">
              <Checkbox checked={true} label="State=Complete" />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked={false} label="State=Pending" />
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[14px] font-semibold text-[#172B4D] uppercase tracking-wider">
          Status Bar (iOS 14/15/16)
        </h3>
        <div className="bg-[#F8FAFC] border border-[#E7EDF4] rounded-2xl overflow-hidden max-w-md">
          <StatusBar time="9:41" />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[14px] font-semibold text-[#172B4D] uppercase tracking-wider">
          Bottom Navigation
        </h3>
        <div className="max-w-md border border-[#E7EDF4] rounded-2xl overflow-hidden shadow-sm">
          <BottomNav active={activeTabDemo} onChange={setActiveTabDemo} />
        </div>
      </div>

      {/* Design Tokens: Colors */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[14px] font-semibold text-[#172B4D] uppercase tracking-wider">
          Color Tokens
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {colorTokens.map((c) => (
            <div
              key={c.name}
              className="p-3 rounded-2xl border border-[#E7EDF4] flex flex-col gap-2"
              style={{ backgroundColor: c.hex }}
            >
              <div className="h-6" />
              <div className="flex flex-col" style={{ color: c.text }}>
                <span className="text-[12px] font-bold leading-tight">{c.name}</span>
                <span className="text-[11px] opacity-80">{c.hex}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Icons Library */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[14px] font-semibold text-[#172B4D] uppercase tracking-wider">
          Icon Library (Exported from Figma)
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {[
            { name: 'Sun', Icon: IconSun, color: '#B86A13', bg: 'bg-[#FFF4E5]' },
            { name: 'Book', Icon: IconBook, color: '#3B82F6', bg: 'bg-[#EFF6FF]' },
            { name: 'Activity', Icon: IconActivity, color: '#168567', bg: 'bg-[#EAF8F1]' },
            { name: 'Moon', Icon: IconMoon, color: '#8060C2', bg: 'bg-[#F2F0FF]' },
            { name: 'Flame', Icon: IconFlame, color: '#B86A13', bg: 'bg-[#FFF4E5]' },
            { name: 'Bell', Icon: IconBell, color: '#172B4D', bg: 'bg-slate-100' },
            { name: 'Leaf', Icon: IconLeaf, color: '#168567', bg: 'bg-[#EAF8F1]' },
            { name: 'Clock', Icon: IconClock, color: '#64748B', bg: 'bg-slate-100' },
            { name: 'Search', Icon: IconSearch, color: '#64748B', bg: 'bg-slate-100' },
            { name: 'Plus', Icon: IconPlus, color: '#3B82F6', bg: 'bg-[#EFF6FF]' },
            { name: 'Check', Icon: IconCheck, color: '#3B82F6', bg: 'bg-[#EFF6FF]' },
            { name: 'Home', Icon: IconHome, color: '#3B82F6', bg: 'bg-[#EFF6FF]' },
            { name: 'Calendar', Icon: IconCalendar, color: '#3B82F6', bg: 'bg-[#EFF6FF]' },
            { name: 'Settings', Icon: IconSettings, color: '#3B82F6', bg: 'bg-[#EFF6FF]' },
            { name: 'Back', Icon: IconBack, color: '#172B4D', bg: 'bg-slate-100' },
            { name: 'More', Icon: IconMore, color: '#172B4D', bg: 'bg-slate-100' },
            { name: 'Pause', Icon: IconPause, color: '#172B4D', bg: 'bg-slate-100' },
            { name: 'Chevron', Icon: IconChevron, color: '#172B4D', bg: 'bg-slate-100' },
          ].map(({ name, Icon, color, bg }) => (
            <div key={name} className="flex flex-col items-center gap-2 p-3 bg-[#F8FAFC] rounded-2xl border border-[#E7EDF4]">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon className="w-5 h-5" color={color} />
              </div>
              <span className="text-[11px] font-medium text-[#172B4D]">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
