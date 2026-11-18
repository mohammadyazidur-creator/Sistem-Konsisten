import React from 'react';
import { IconCheck } from './Icons';

export const Checkbox = ({ checked = false, onChange, label, sublabel, disabled = false, className = "" }) => {
  return (
    <div
      onClick={() => !disabled && onChange && onChange(!checked)}
      className={`flex items-center gap-3 select-none cursor-pointer group ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <div
        className={`w-[24px] h-[24px] rounded-lg flex items-center justify-center transition-all duration-150 shrink-0 ${
          checked
            ? 'bg-[#3B82F6] text-white shadow-sm'
            : 'border-[1.8px] border-[#CBD5E1] bg-white group-hover:border-[#3B82F6]'
        }`}
      >
        {checked && <IconCheck className="w-3.5 h-3.5" color="#FFFFFF" />}
      </div>
      {(label || sublabel) && (
        <div className="flex flex-col">
          {label && (
            <span className={`text-[14px] font-medium leading-tight ${checked ? 'text-[#64748B] line-through' : 'text-[#172B4D]'}`}>
              {label}
            </span>
          )}
          {sublabel && (
            <span className="text-[11px] text-[#64748B] mt-0.5">
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
