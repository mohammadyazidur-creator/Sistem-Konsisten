import React from 'react';
import { IconHome, IconCalendar, IconSettings } from './Icons';
import { useApp } from '../context/AppContext';

export const BottomNav = ({ active = "dashboard", onChange }) => {
  const { currentScreen, setCurrentScreen } = useApp();

  const handleTabClick = (tab) => {
    if (onChange) {
      onChange(tab);
    } else {
      setCurrentScreen(tab);
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: IconHome },
    { id: 'jadwal', label: 'Jadwal', icon: IconCalendar },
    { id: 'pengaturan', label: 'Pengaturan', icon: IconSettings },
  ];

  return (
    <div className="w-full h-[88px] bg-white border-t border-[#E7EDF4] flex flex-col justify-between pt-2.5 pb-2 px-0 select-none z-20">
      <div className="flex items-center justify-around w-full">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-1 transition-colors duration-150 group"
            >
              <div className={isActive ? 'text-[#3B82F6]' : 'text-[#64748B] group-hover:text-[#172B4D]'}>
                <Icon
                  className="w-[21px] h-[21px]"
                  color={isActive ? '#3B82F6' : '#64748B'}
                />
              </div>
              <span className={`text-[10px] font-medium tracking-tight ${isActive ? 'text-[#3B82F6] font-semibold' : 'text-[#64748B]'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* iOS Gesture Home Indicator */}
      <div className="w-full flex items-center justify-center pt-1 pb-1">
        <div className="w-[124px] h-[4px] bg-[#172B4D] rounded-full opacity-80" />
      </div>
    </div>
  );
};
