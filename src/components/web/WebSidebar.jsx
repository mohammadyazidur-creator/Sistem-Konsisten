import React from 'react';
import {
  IconHome,
  IconCalendar,
  IconLeaf,
  IconBell,
  IconSettings,
  IconFlame,
  IconPlus
} from '../Icons';
import { useApp } from '../../context/AppContext';

export const WebSidebar = ({ activeTab, onTabChange, onOpenAddModal }) => {
  const { user, userStreak, userRecord, token, logout, setShowAuthModal } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: IconHome, badge: null },
    { id: 'jadwal', label: 'Jadwal & Rutinitas', icon: IconCalendar, badge: '4' },
    { id: 'sesi', label: 'Sesi Fokus', icon: IconLeaf, badge: 'Live' },
    { id: 'notifikasi', label: 'Pusat Notifikasi', icon: IconBell, badge: '1' },
    { id: 'uikit', label: 'Desain Sistem & UI Kit', icon: IconSettings, badge: null },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#E7EDF4] flex flex-col justify-between shrink-0 select-none z-30">
      {/* Top Section: Logo & Navigation */}
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center gap-3 border-b border-[#E7EDF4]">
          <div className="w-9 h-9 rounded-xl bg-[#3B82F6] flex items-center justify-center text-white font-bold text-lg shadow-sm">
            K
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[#172B4D] text-base leading-tight tracking-tight">
              Konsisten
            </span>
            <span className="text-[11px] text-[#64748B]">
              Sistem Kebiasaan Baik
            </span>
          </div>
        </div>

        {/* Quick Action Button */}
        <div className="p-4">
          <button
            onClick={onOpenAddModal}
            className="w-full h-11 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <IconPlus className="w-4 h-4" color="#FFFFFF" />
            <span>Tambah Jadwal Baru</span>
          </button>
        </div>

        {/* Main Navigation Links */}
        <nav className="px-3 flex flex-col gap-1">
          <div className="px-3 pb-1 text-[10px] font-semibold tracking-wider text-[#94A3B8] uppercase">
            Menu Utama
          </div>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full h-10 px-3 rounded-xl flex items-center justify-between text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#EFF6FF] text-[#3B82F6] font-semibold'
                    : 'text-[#64748B] hover:text-[#172B4D] hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className="w-[18px] h-[18px]"
                    color={isActive ? '#3B82F6' : '#64748B'}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.badge === 'Live'
                        ? 'bg-emerald-100 text-emerald-700 animate-pulse'
                        : isActive
                        ? 'bg-[#3B82F6] text-white'
                        : 'bg-slate-100 text-[#64748B]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Habit Streak & User Profile */}
      <div className="p-4 flex flex-col gap-3 border-t border-[#E7EDF4]">
        {/* Streak Mini Card */}
        <div className="bg-[#FFF4E5] rounded-xl p-3 border border-[#FDE68A]/60 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/80 flex items-center justify-center shrink-0">
            <IconFlame className="w-4 h-4" color="#B86A13" />
          </div>
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#B86A13]">
                {userStreak} Hari Beruntun
              </span>
              <span className="text-[10px] text-[#B86A13]/80 font-medium">
                Rekor {userRecord}
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-[#FDE68A] rounded-full overflow-hidden mt-1.5">
              <div
                style={{ width: `${Math.min(100, (userStreak / Math.max(1, userRecord)) * 100)}%` }}
                className="h-full bg-[#B86A13] rounded-full transition-all"
              />
            </div>
          </div>
        </div>

        {/* User Profile & Auth Trigger */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'R'}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-[#172B4D] leading-tight truncate">
                {user?.name || 'Raka Pratama'}
              </span>
              <span className="text-[10px] text-[#64748B] truncate">
                {user?.email || 'raka@konsisten.id'}
              </span>
            </div>
          </div>
          {token ? (
            <button
              onClick={logout}
              className="text-[10px] text-slate-400 hover:text-rose-600 font-medium ml-1 transition-colors"
              title="Logout"
            >
              Keluar
            </button>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="text-[10px] text-[#3B82F6] font-semibold hover:underline"
            >
              Masuk
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
