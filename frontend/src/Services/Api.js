import axios from 'axios';

const BASE = 'http://localhost:5000';

const api = axios.create({
  baseURL: `${BASE}/api/v1`,
  headers: { 'Content-Type': 'application/json' }
});

// ============================
// 🔐 Attach Token Automatically
// ============================
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============================
// 🚨 Global 401 Handler
// ============================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default api;

// Helper: build public URL for uploaded files
export const mediaUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;

  // Ensure we don't have double slashes if path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${cleanPath}`;
};

// ======================================================
// 🔐 AUTH
// ======================================================
export const signup = (data) => api.post('/auth/signup', data);
export const login = (data) => api.post('/auth/login', data);
export const forgotPassword = (data) => api.post('/auth/forgotPassword', data);
export const resetPassword = (token, data) =>
  api.patch(`/auth/resetPassword/${token}`, data);

// Profile
export const getMe = () => api.get('/auth/me');
export const updateMe = (formData) =>
  api.patch('/auth/updateMe', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });


// ======================================================
// 🏠 PROPERTIES
// ======================================================
export const getProperties = (params) =>
  api.get('/properties', { params });

export const getProperty = (id) =>
  api.get(`/properties/${id}`);

export const createProperty = (formData) =>
  api.post('/properties', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const updateProperty = (id, formData) =>
  api.patch(`/properties/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const deleteProperty = (id) =>
  api.delete(`/properties/${id}`);


// ======================================================
// 👨‍💼 AGENTS
// ======================================================
export const getAgents = (params) =>
  api.get('/agents', { params });

export const getAgent = (id) =>
  api.get(`/agents/${id}`);

export const createAgent = (formData) =>
  api.post('/agents', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const updateAgent = (id, formData) =>
  api.patch(`/agents/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const deleteAgent = (id) =>
  api.delete(`/agents/${id}`);


// ======================================================
// 💬 TESTIMONIALS
// ======================================================
export const getTestimonials = () =>
  api.get('/testimonials');

export const createTestimonial = (data) =>
  api.post('/testimonials', data);


// ======================================================
// 💼 CAREERS
// ======================================================
export const getCareers = () =>
  api.get('/careers');

export const applyCareer = (data) =>
  api.post('/careers', data);


// ======================================================
// 🏡 SELLING
// ======================================================
export const getSelling = () =>
  api.get('/selling');


// ======================================================
// 🏘 BUYING
// ======================================================
export const getBuying = () =>
  api.get('/buying');


// ======================================================
// 📅 MEETINGS
// ======================================================
export const bookMeeting = (data) =>
  api.post('/meetings', data);

export const getMeetings = () =>
  api.get('/meetings');


// ======================================================
// 👥 TEAM
// ======================================================
export const getTeam = () =>
  api.get('/team');


// ======================================================
// 💰 INVESTORS
// ======================================================
export const getInvestors = () =>
  api.get('/investors');


// ======================================================
// 📩 CONTACT
// ======================================================
export const sendContact = (data) =>
  api.post('/contacts', data);


// ======================================================
// 📊 ADMIN
// ======================================================
export const getAdminStats = () =>
  api.get('/admin/stats');

export const getUsers = (params) =>
  api.get('/admin/users', { params });

export const updateUserRole = (id, role) =>
  api.patch(`/admin/users/${id}/role`, { role });