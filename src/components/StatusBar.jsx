import React from 'react';
import { StatusBarIndicators } from './Icons';

export const StatusBar = ({ time = "9:41", light = false, className = "" }) => {
  return (
    <div className={`w-full h-[52px] px-7 flex items-center justify-between select-none ${light ? 'text-white' : 'text-[#172B4D]'} ${className}`}>
      <span className="text-[14px] font-semibold tracking-tight">{time}</span>
      <StatusBarIndicators className={`w-16 h-3 ${light ? 'text-white' : 'text-[#172B4D]'}`} />
    </div>
  );
};
