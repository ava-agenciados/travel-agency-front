// INTEGRAÇÃO COM BACKEND

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:5110', // URL base da API
    headers: {
        'Content-Type': 'application/json',
    }
});

// "Interceptador" para adicionar o token JWT em todas as requisições
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Recupera o token do localStorage
        // Se o token existir, adiciona ao cabeçalho Authorization
        // Isso garante que todas as requisições autenticadas incluam o token
        if (token) { 
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config; // Retorna a config com a requisição modificada
    },

    (error) => Promise.reject(error)
);

export default api;