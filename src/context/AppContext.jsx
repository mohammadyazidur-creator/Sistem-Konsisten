import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';

const AppContext = createContext();

// Initial fallback mock data matching Figma in case backend is loading
const FALLBACK_SCHEDULES = [
  {
    id: 1,
    name: 'Rutinitas Pagi',
    time: '06.00',
    days: [0, 1, 2, 3, 4, 5, 6],
    days_summary: 'Sen – Min',
    status: 'Aktif',
    icon: 'sun',
    color: '#3B82F6',
    streak: 7,
    total_duration: '17 mnt',
    programs: [
      { id: 1, schedule_id: 1, title: 'Minum air putih', duration: '2 menit', duration_seconds: 120, completed: true },
      { id: 2, schedule_id: 1, title: 'Peregangan', duration: '5 menit', duration_seconds: 300, completed: true },
      { id: 3, schedule_id: 1, title: 'Meditasi', duration: '10 menit', duration_seconds: 600, completed: false, quote: 'Tarik napas perlahan.\nFokus pada momen ini.', icon: 'leaf' }
    ]
  },
  {
    id: 2,
    name: 'Belajar Mandiri',
    time: '19.00',
    days: [0, 1, 2, 3, 4],
    days_summary: 'Sen – Jum',
    status: 'Aktif',
    icon: 'book',
    color: '#3B82F6',
    streak: 5,
    total_duration: '50 mnt',
    programs: [
      { id: 4, schedule_id: 2, title: 'Membaca Dokumentasi & Teori', duration: '20 menit', duration_seconds: 1200, completed: false },
      { id: 5, schedule_id: 2, title: 'Latihan Koding & Proyek', duration: '30 menit', duration_seconds: 1800, completed: false }
    ]
  },
  {
    id: 3,
    name: 'Gerak Sehat',
    time: '16.30',
    days: [1, 3, 5],
    days_summary: 'Sel, Kam, Sab',
    status: 'Aktif',
    icon: 'activity',
    color: '#20A586',
    streak: 3,
    total_duration: '25 mnt',
    programs: [
      { id: 6, schedule_id: 3, title: 'Jogging Sore', duration: '20 menit', duration_seconds: 1200, completed: false },
      { id: 7, schedule_id: 3, title: 'Pendinginan Tubuh', duration: '5 menit', duration_seconds: 300, completed: false }
    ]
  },
  {
    id: 4,
    name: 'Istirahat Malam',
    time: '21.00',
    days: [0, 1, 2, 3, 4, 5, 6],
    days_summary: 'Sen – Min',
    status: 'Nonaktif',
    icon: 'moon',
    color: '#8060C2',
    streak: 0,
    total_duration: '15 mnt',
    programs: [
      { id: 8, schedule_id: 4, title: 'Review Hari & Matikan Layar', duration: '15 menit', duration_seconds: 900, completed: false }
    ]
  }
];

export const AppProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // Authentication State
  const [token, setToken] = useState(() => localStorage.getItem('konsisten_token'));
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('konsisten_user');
      return saved ? JSON.parse(saved) : { name: 'Raka Pratama', email: 'raka@konsisten.id' };
    } catch {
      return { name: 'Raka Pratama', email: 'raka@konsisten.id' };
    }
  });
  const [authLoading, setAuthLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Auto-login to pre-seeded demo user if no token exists yet
  useEffect(() => {
    if (!token) {
      api.auth.login({ email: 'raka@konsisten.id', password: 'password' })
        .then((res) => {
          setToken(res.token);
          setUser(res.user);
          localStorage.setItem('konsisten_token', res.token);
          localStorage.setItem('konsisten_user', JSON.stringify(res.user));
        })
        .catch(() => {
          // Backend may be starting, user can click login modal anytime
        });
    }
  }, [token]);

  // Auth Methods
  const login = async (credentials) => {
    setAuthLoading(true);
    try {
      const res = await api.auth.login(credentials);
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem('konsisten_token', res.token);
      localStorage.setItem('konsisten_user', JSON.stringify(res.user));
      queryClient.invalidateQueries();
      return res;
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (data) => {
    setAuthLoading(true);
    try {
      const res = await api.auth.register(data);
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem('konsisten_token', res.token);
      localStorage.setItem('konsisten_user', JSON.stringify(res.user));
      queryClient.invalidateQueries();
      return res;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (token) await api.auth.logout();
    } catch (e) {
      console.warn('Logout error', e);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('konsisten_token');
      localStorage.removeItem('konsisten_user');
      queryClient.clear();
    }
  };

  // React Query: Schedules
  const { data: apiSchedules, isLoading: schedulesLoading } = useQuery({
    queryKey: ['schedules', token],
    queryFn: api.schedules.getAll,
    enabled: Boolean(token),
    staleTime: 1000 * 30,
  });

  // React Query: Dashboard Overview
  const { data: apiDashboard, isLoading: dashboardLoading } = useQuery({
    queryKey: ['dashboard', token],
    queryFn: api.dashboard.get,
    enabled: Boolean(token),
    staleTime: 1000 * 30,
  });

  // Effective schedules (API result or fallback)
  const schedules = apiSchedules && apiSchedules.length > 0 ? apiSchedules : FALLBACK_SCHEDULES;

  // UI Navigation states
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [selectedScheduleId, setSelectedScheduleId] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);

  // Selected schedule helper
  const selectedSchedule = schedules.find(s => s.id === selectedScheduleId || s.id === Number(selectedScheduleId)) || schedules[0];

  // Derived Progress & Streaks from API Dashboard
  const todayProgressPercent = apiDashboard?.today_progress?.percent ?? 60;
  const completedProgramsCount = apiDashboard?.today_progress?.completed ?? 3;
  const totalProgramsCount = apiDashboard?.today_progress?.total ?? 5;
  const userStreak = apiDashboard?.streak?.current ?? 7;
  const userRecord = apiDashboard?.streak?.record ?? 12;

  // React Query Mutations
  const toggleProgramMutation = useMutation({
    mutationFn: (progId) => api.programs.toggleCompletion(progId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });

  const toggleScheduleStatusMutation = useMutation({
    mutationFn: (schId) => api.schedules.toggleStatus(schId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const addScheduleMutation = useMutation({
    mutationFn: (payload) => api.schedules.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  // Actions for components
  const toggleProgram = (scheduleId, programId) => {
    if (token) {
      toggleProgramMutation.mutate(programId);
    }
  };

  const toggleScheduleStatus = (scheduleId) => {
    if (token) {
      toggleScheduleStatusMutation.mutate(scheduleId);
    }
  };

  const addSchedule = async (newSch) => {
    if (token) {
      await addScheduleMutation.mutateAsync({
        name: newSch.name,
        time: newSch.time,
        days: newSch.activeDays || newSch.days || [0, 1, 2, 3, 4, 5, 6],
        status: newSch.status || 'Aktif',
        icon: newSch.icon || 'sun',
        color: newSch.color || '#3B82F6',
        programs: newSch.programs || [
          { title: 'Aktivitas Utama', duration: '15 menit', duration_seconds: 900 }
        ]
      });
    }
  };

  const resetDemoData = () => {
    // Re-login demo user & refresh queries
    login({ email: 'raka@konsisten.id', password: 'password' });
    setCurrentScreen('dashboard');
    setActiveTab('dashboard');
    setSelectedScheduleId(1);
  };

  return (
    <AppContext.Provider
      value={{
        // Auth
        token,
        user,
        login,
        register,
        logout,
        authLoading,
        showAuthModal,
        setShowAuthModal,

        // Data from API & React Query
        schedules,
        schedulesLoading,
        apiDashboard,
        dashboardLoading,
        selectedScheduleId,
        setSelectedScheduleId,
        selectedSchedule,
        todayProgressPercent,
        completedProgramsCount,
        totalProgramsCount,
        userStreak,
        userRecord,

        // UI States
        activeTab,
        setActiveTab,
        currentScreen,
        setCurrentScreen,
        showAddModal,
        setShowAddModal,

        // Mutations / Actions
        toggleProgram,
        toggleScheduleStatus,
        addSchedule,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
