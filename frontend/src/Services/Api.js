import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    headers: { 'Content-Type': 'application/json' }
});

// Attach token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Handle 401 globally
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

// Auth
export const login = (data) => api.post('/auth/login', data);
export const signup = (data) => api.post('/auth/signup', data);
export const forgotPassword = (data) => api.post('/auth/forgotPassword', data);

// Properties
export const getProperties = (params) => api.get('/properties', { params });
export const getProperty = (id) => api.get(`/properties/${id}`);
export const createProperty = (data) => api.post('/properties', data);
export const updateProperty = (id, data) => api.patch(`/properties/${id}`, data);
export const deleteProperty = (id) => api.delete(`/properties/${id}`);

// Agents
export const getAgents = (params) => api.get('/agents', { params });
export const getAgent = (id) => api.get(`/agents/${id}`);
export const createAgent = (data) => api.post('/agents', data);
export const updateAgent = (id, data) => api.patch(`/agents/${id}`, data);
export const deleteAgent = (id) => api.delete(`/agents/${id}`);

// Admin
export const getAdminStats = () => api.get('/admin/stats');

// Contacts
export const sendContact = (data) => api.post('/contacts', data);

// Meetings
export const bookMeeting = (data) => api.post('/meetings', data);
