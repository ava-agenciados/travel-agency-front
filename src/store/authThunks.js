
import { loginStart, loginSuccess, loginFailure, logout } from './authSlice';
import authService from '../services/authService';

export const loginAsync = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    // Faz a requisição para a API de login
    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 400) {
        throw new Error('Email ou senha incorretos.');
      } else {
        throw new Error('Erro no servidor. Tente novamente mais tarde.');
      }
    }

    const data = await response.json();
    if (data.success && data.token) {
      authService.setToken(data.token);
      // Aguarda o token ser salvo antes de buscar o usuário
      const user = authService.getUserInfo();
      if (!user || !user.role) {
        dispatch(loginFailure('Usuário sem permissão ou token inválido.'));
        return;
      }
      dispatch(loginSuccess(user));
    } else {
      throw new Error(data.message || 'Erro no login');
    }
  } catch (error) {
    dispatch(loginFailure(error.message || 'Erro ao fazer login'));
  }
};

export const logoutAsync = () => (dispatch) => {
  dispatch(logout());
};
