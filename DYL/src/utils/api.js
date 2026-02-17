import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.PROD
        ? 'https://decodeyourlifestyle-modern-backend.onrender.com'
        : '',
});

export default api;
