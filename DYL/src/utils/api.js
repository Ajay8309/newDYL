import axios from 'axios';

const api = axios.create({
    baseURL: 'https://decodeyourlifestyle-modern-backend.onrender.com'
});

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
