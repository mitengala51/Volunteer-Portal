import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const applicantAPI = {
  // Create new applicant
  create: (data) => api.post('/applicants', data),
  
  // Get all applicants (admin only)
  getAll: (params = {}) => api.get('/applicants', { params }),
  
  // Get single applicant (admin only)
  getById: (id) => api.get(`/applicants/${id}`),
  
  // Toggle review status (admin only)
  toggleReview: (id) => api.put(`/applicants/${id}/review`)
};

export const adminAPI = {
  // Admin login
  login: (credentials) => api.post('/admin/login', credentials),
  
  // Admin registration (for initial setup)
  register: (data) => api.post('/admin/register', data),
  
  // Get admin profile
  getProfile: () => api.get('/admin/profile')
};

export default api;