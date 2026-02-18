import axios from 'axios';

const api = axios.create({
    baseURL: 'https://decodeyourlifestyle-modern-backend.onrender.com'
});

export default api;
