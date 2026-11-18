import React, { useState } from 'react';
import {
  IconSearch,
  IconBell,
  IconLeaf,
  IconCheck,
  IconMoon
} from '../Icons';
import { useApp } from '../../context/AppContext';

export const WebNavbar = ({
  activeTab,
  onTabChange,
  viewMode,
  onViewModeToggle
}) => {
  const {
    setSelectedScheduleId,
    token,
    user,
    setShowAuthModal,
    logout
  } = useApp();

  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard & Ringkasan Harian';
      case 'jadwal':
        return 'Kelola Jadwal & Rutinitas';
      case 'sesi':
        return 'Sesi Fokus & Meditasi';
      case 'notifikasi':
        return 'Pusat Notifikasi & Pengingat';
      case 'uikit':
        return 'Desain Sistem & Komponen UI';
      default:
        return 'Dashboard';
    }
  };

  const handleStartSession = () => {
    onTabChange('sesi');
  };

  const handleStartFromNotification = () => {
    setSelectedScheduleId(2);
    setShowNotificationDropdown(false);
    onTabChange('sesi');
  };

  return (
    <header className="h-16 bg-white border-b border-[#E7EDF4] px-8 flex items-center justify-between select-none sticky top-0 z-20">
      {/* Left: Breadcrumbs / Title */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-xs text-[#64748B] font-medium">Sistem Konsisten /</span>
          <h1 className="text-base font-bold text-[#172B4D] leading-tight">
            {getBreadcrumbTitle()}
          </h1>
        </div>

        {/* Live Date Pill */}
        <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#F8FAFC] border border-[#E7EDF4] text-[#64748B]">
          📅 Senin, 16 November 2026
        </span>
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden md:flex items-center w-72 lg:w-96 h-10 px-3 bg-[#F8FAFC] border border-[#E7EDF4] rounded-xl gap-2 focus-within:border-[#3B82F6] focus-within:bg-white transition-all">
        <IconSearch className="w-4 h-4 text-[#64748B] shrink-0" color="#64748B" />
        <input
          type="text"
          placeholder="Cari jadwal, kebiasaan, atau program..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-xs text-[#172B4D] placeholder-[#94A3B8] focus:outline-none"
        />
        <kbd className="hidden lg:inline-block text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono">
          ⌘K
        </kbd>
      </div>

      {/* Right: Actions, Notifications, Mode Switcher */}
      <div className="flex items-center gap-3">
        {/* Quick Start Focus Button */}
        <button
          onClick={handleStartSession}
          className="hidden sm:inline-flex items-center gap-2 h-9 px-3.5 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#3B82F6] rounded-xl text-xs font-semibold transition-all active:scale-95"
        >
          <IconLeaf className="w-4 h-4" color="#3B82F6" />
          <span>Mulai Sesi Fokus</span>
        </button>

        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
            className="w-10 h-10 rounded-xl bg-[#F8FAFC] hover:bg-slate-100 border border-[#E7EDF4] flex items-center justify-center text-[#172B4D] relative transition-colors"
            title="Pemberitahuan"
          >
            <IconBell className="w-5 h-5" color="#172B4D" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
          </button>

          {/* Notification Popover Dropdown */}
          {showNotificationDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#E7EDF4] p-4 flex flex-col gap-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-[#E7EDF4] pb-2">
                <span className="text-xs font-bold text-[#172B4D]">
                  Pusat Notifikasi
                </span>
                <button
                  onClick={() => {
                    setShowNotificationDropdown(false);
                    onTabChange('notifikasi');
                  }}
                  className="text-[11px] font-medium text-[#3B82F6] hover:underline"
                >
                  Lihat Semua
                </button>
              </div>

              {/* Notification Item */}
              <div className="bg-[#EFF6FF] rounded-xl p-3 border border-[#DBEAFE] flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-[#3B82F6] flex items-center justify-center text-white">
                      <IconCheck className="w-3 h-3" color="#FFFFFF" />
                    </div>
                    <span className="text-[10px] font-bold text-[#172B4D]">
                      KONSISTEN
                    </span>
                  </div>
                  <span className="text-[10px] text-[#64748B]">Sekarang</span>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#172B4D]">
                    Waktunya mulai konsisten!
                  </h4>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    Belajar Mandiri dimulai pukul 19.00. Dua program kecil untuk masa depanmu.
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleStartFromNotification}
                    className="flex-1 h-7 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-[11px] font-semibold rounded-lg transition-colors"
                  >
                    Mulai Sesi
                  </button>
                  <button
                    onClick={() => setShowNotificationDropdown(false)}
                    className="h-7 px-3 bg-white hover:bg-slate-50 text-[#64748B] text-[11px] font-medium border border-[#E7EDF4] rounded-lg transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </div>

              {/* Next reminder teaser */}
              <div className="flex items-center gap-2.5 px-2 py-1 text-[#64748B]">
                <IconMoon className="w-4 h-4 text-[#8060C2]" color="#8060C2" />
                <span className="text-[11px]">Berikutnya: Istirahat Malam · 21.00</span>
              </div>
            </div>
          )}
        </div>

        {/* User Account Button / Modal Trigger */}
        {token ? (
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2 h-10 px-3 rounded-xl bg-[#F8FAFC] hover:bg-slate-100 border border-[#E7EDF4] text-xs font-medium text-[#172B4D] transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
                {user?.name ? user.name.charAt(0) : 'R'}
              </div>
              <span className="hidden sm:inline font-semibold">{user?.name?.split(' ')[0] || 'Raka'}</span>
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#E7EDF4] p-2 flex flex-col gap-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-[#E7EDF4]">
                  <span className="text-xs font-bold text-[#172B4D] block truncate">{user?.name}</span>
                  <span className="text-[10px] text-[#64748B] block truncate">{user?.email}</span>
                </div>
                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    logout();
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl font-medium transition-colors"
                >
                  Keluar (Logout)
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowAuthModal(true)}
            className="h-9 px-3.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold shadow-sm transition-all"
          >
            Masuk / Daftar
          </button>
        )}

        {/* View Mode Toggle: Website vs Mobile */}
        <div className="flex items-center bg-[#F8FAFC] p-1 rounded-xl border border-[#E7EDF4]">
          <button
            onClick={() => onViewModeToggle('website')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'website'
                ? 'bg-white text-[#3B82F6] shadow-sm'
                : 'text-[#64748B] hover:text-[#172B4D]'
            }`}
          >
            <span>💻</span>
            <span className="hidden sm:inline">Website</span>
          </button>
          <button
            onClick={() => onViewModeToggle('mobile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'mobile'
                ? 'bg-white text-[#3B82F6] shadow-sm'
                : 'text-[#64748B] hover:text-[#172B4D]'
            }`}
          >
            <span>📱</span>
            <span className="hidden sm:inline">Mobile Frame</span>
          </button>
        </div>
      </div>
    </header>
  );
};
