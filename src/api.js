import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Attach bearer token if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('konsisten_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Handle 401 unauthorized
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token if invalid
      localStorage.removeItem('konsisten_token');
      localStorage.removeItem('konsisten_user');
    }
    return Promise.reject(error);
  }
);

export const api = {
  // Auth
  auth: {
    login: async (credentials) => {
      const res = await apiClient.post('/login', credentials);
      return res.data;
    },
    register: async (data) => {
      const res = await apiClient.post('/register', data);
      return res.data;
    },
    me: async () => {
      const res = await apiClient.get('/me');
      return res.data;
    },
    logout: async () => {
      const res = await apiClient.post('/logout');
      return res.data;
    },
  },

  // Dashboard
  dashboard: {
    get: async () => {
      const res = await apiClient.get('/dashboard');
      return res.data.data;
    },
  },

  // Schedules
  schedules: {
    getAll: async () => {
      const res = await apiClient.get('/schedules');
      return res.data.data;
    },
    getOne: async (id) => {
      const res = await apiClient.get(`/schedules/${id}`);
      return res.data.data;
    },
    create: async (payload) => {
      const res = await apiClient.post('/schedules', payload);
      return res.data;
    },
    update: async (id, payload) => {
      const res = await apiClient.put(`/schedules/${id}`, payload);
      return res.data;
    },
    delete: async (id) => {
      const res = await apiClient.delete(`/schedules/${id}`);
      return res.data;
    },
    toggleStatus: async (id) => {
      const res = await apiClient.patch(`/schedules/${id}/toggle-status`);
      return res.data;
    },
  },

  // Programs
  programs: {
    getAll: async (scheduleId) => {
      const res = await apiClient.get(`/schedules/${scheduleId}/programs`);
      return res.data.data;
    },
    create: async (scheduleId, payload) => {
      const res = await apiClient.post(`/schedules/${scheduleId}/programs`, payload);
      return res.data;
    },
    update: async (id, payload) => {
      const res = await apiClient.put(`/programs/${id}`, payload);
      return res.data;
    },
    delete: async (id) => {
      const res = await apiClient.delete(`/programs/${id}`);
      return res.data;
    },
    reorder: async (scheduleId, programIds) => {
      const res = await apiClient.post(`/schedules/${scheduleId}/programs/reorder`, { program_ids: programIds });
      return res.data;
    },
    toggleCompletion: async (id) => {
      const res = await apiClient.post(`/programs/${id}/toggle-completion`);
      return res.data;
    },
  },

  // Sessions
  sessions: {
    start: async (payload) => {
      const res = await apiClient.post('/sessions/start', payload);
      return res.data;
    },
    complete: async (sessionId, payload) => {
      const res = await apiClient.post(`/sessions/${sessionId}/complete`, payload);
      return res.data;
    },
  },

  // Notifications
  notifications: {
    getUpcoming: async () => {
      const res = await apiClient.get('/notifications/upcoming');
      return res.data.data;
    },
  },

  // Push Subscriptions
  pushSubscriptions: {
    save: async (payload) => {
      const res = await apiClient.post('/push-subscriptions', payload);
      return res.data;
    },
    delete: async (endpoint) => {
      const res = await apiClient.delete('/push-subscriptions', { data: { endpoint } });
      return res.data;
    },
  },
};

export default api;
