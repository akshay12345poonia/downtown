import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
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



// ======================================================
// 🔐 AUTH
// ======================================================
export const signup = (data) => api.post('/auth/signup', data);
export const login = (data) => api.post('/auth/login', data);
export const forgotPassword = (data) => api.post('/auth/forgotPassword', data);
export const resetPassword = (token, data) =>
  api.patch(`/auth/resetPassword/${token}`, data);



// ======================================================
// 🏠 PROPERTIES
// ======================================================
export const getProperties = (params) =>
  api.get('/properties', { params });

export const getProperty = (id) =>
  api.get(`/properties/${id}`);

export const createProperty = (data) =>
  api.post('/properties', data);

export const updateProperty = (id, data) =>
  api.patch(`/properties/${id}`, data);

export const deleteProperty = (id) =>
  api.delete(`/properties/${id}`);



// ======================================================
// 👨‍💼 AGENTS
// ======================================================
export const getAgents = (params) =>
  api.get('/agents', { params });

export const getAgent = (id) =>
  api.get(`/agents/${id}`);

export const createAgent = (data) =>
  api.post('/agents', data);

export const updateAgent = (id, data) =>
  api.patch(`/agents/${id}`, data);

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