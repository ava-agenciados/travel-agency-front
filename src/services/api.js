// INTEGRAÇÃO COM O BACKEND 
import axios from 'axios';

// URL base da API
const api = axios.create({
    baseURL: 'http://localhost:5110',
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptador para adicionar o token de autenticação ao header em todas as requisições
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    },

    (error) => Promise.reject(error)
);

export default api;