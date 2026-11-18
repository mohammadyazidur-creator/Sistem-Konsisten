import React, { useState } from 'react';
import { IconClose, IconCheck } from './Icons';
import { Button } from './Button';
import { useApp } from '../context/AppContext';

export const AuthModal = ({ isOpen, onClose }) => {
  const { login, register, authLoading } = useApp();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('raka@konsisten.id');
  const [password, setPassword] = useState('password');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      if (mode === 'login') {
        await login({ email, password });
      } else {
        await register({ name, email, password });
      }
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.email?.[0] || 'Terjadi kesalahan, silakan coba lagi.';
      setErrorMessage(msg);
    }
  };

  const handleDemoLogin = async () => {
    setErrorMessage('');
    setEmail('raka@konsisten.id');
    setPassword('password');
    try {
      await login({ email: 'raka@konsisten.id', password: 'password' });
      onClose();
    } catch (err) {
      setErrorMessage('Gagal login demo. Pastikan server backend berjalan.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E7EDF4] z-10 flex flex-col gap-6 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E7EDF4] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6] flex items-center justify-center text-white font-bold shadow-sm">
              K
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#172B4D]">
                {mode === 'login' ? 'Masuk ke Konsisten' : 'Buat Akun Baru'}
              </h2>
              <span className="text-xs text-[#64748B]">
                Sistem Kebiasaan & Rutinitas
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#64748B] flex items-center justify-center transition-colors"
          >
            <IconClose className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Demo Login Pill */}
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full h-11 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 text-xs font-bold border border-blue-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm"
        >
          <span>⚡</span>
          <span>Masuk Instan sebagai Raka Pratama (Demo)</span>
        </button>

        {/* Mode Tabs */}
        <div className="flex items-center bg-[#F8FAFC] p-1 rounded-2xl border border-[#E7EDF4]">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMessage(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-white text-[#3B82F6] shadow-sm'
                : 'text-[#64748B] hover:text-[#172B4D]'
            }`}
          >
            Masuk
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setErrorMessage(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              mode === 'register'
                ? 'bg-white text-[#3B82F6] shadow-sm'
                : 'text-[#64748B] hover:text-[#172B4D]'
            }`}
          >
            Daftar
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === 'register' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#172B4D]">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Raka Pratama"
                className="w-full h-11 px-4 text-xs border border-[#E7EDF4] rounded-xl focus:outline-none focus:border-[#3B82F6] transition-colors"
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#172B4D]">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="raka@konsisten.id"
              className="w-full h-11 px-4 text-xs border border-[#E7EDF4] rounded-xl focus:outline-none focus:border-[#3B82F6] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#172B4D]">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              className="w-full h-11 px-4 text-xs border border-[#E7EDF4] rounded-xl focus:outline-none focus:border-[#3B82F6] transition-colors"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={authLoading}
            >
              {authLoading ? 'Memproses...' : mode === 'login' ? 'Masuk' : 'Daftar Sekarang'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
