import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://glp-pharma-backend.vercel.app/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Automatically attach JWT token if available in localStorage
apiClient.interceptors.request.use(
  (config) => {
    try {
      const storedUser = localStorage.getItem('glp_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user?.token && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch (e) {
      console.error('Error attaching auth token in apiClient', e);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
