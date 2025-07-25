// LIDAR COM O PROCESSO DE AUTENTICAÇÃO DO USUÁRIO

import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token'); // Obtém o token do armazenamento local
const user = JSON.parse(localStorage.getItem('user')); // Obtém o usuário do armazenamento

// Definindo estado inicial do slice de autenticação
const initialState = {
    token: token || null, // se houver token, atribui o valor do token, caso contrário, atribui null
    user: user ? JSON.parse(user) : null, // se houver usuário, converte de string para objeto
}

// usando Redux Toolkit para gerenciar autenticação de login e logout
const authSlice = createSlice({
    name: 'auth', initialState, // Define o nome do slice e o estado inicial
    reducers: {
        loginSucess: (state, action) => {
            state.token = action.payload.token; // Atualiza o token no estado
            state.user = action.payload.user; // Atualiza o usuário no estado
            localStorage.setItem('token', action.payload.token); // Armazena o token no armazenamento local
            localStorage.setItem('user', JSON.stringify(action.payload.user)); // Armazena o usuário no armazenamento local
        },
        logout: (state) => {
            state.token = null; // Limpa o token no estado
            state.user = null; // Limpa o usuário no estado
            localStorage.removeItem('token'); // Remove o token do armazenamento local
            localStorage.removeItem('user'); // Remove o usuário do armazenamento local
        }
    }
});

export const { loginSucess, logout } = authSlice.actions; // Exporta as ações do slice
export default authSlice.reducer; // Exporta o reducer do slice para ser usado na store