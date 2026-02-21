import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.MODE === 'production' ? '' : 'http://localhost:5000'
});

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.includes('localhost:5001') || imagePath.includes('localhost:5000')) {
        const baseUrl = api.defaults.baseURL || '';
        const parts = imagePath.split('/api/');
        if (parts.length > 1) return `${baseUrl}/api/${parts[1]}`;
    }
    if (imagePath.startsWith('http')) return imagePath;
    const baseUrl = api.defaults.baseURL || '';
    return `${baseUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

export default api;
