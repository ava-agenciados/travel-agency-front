
import { loginStart, loginSuccess, loginFailure, logout } from './authSlice';
import authService from '../services/authService';

import api from '../services/api';

export const loginAsync = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    // Faz a requisição para a API de login usando Axios
    const response = await api.post('/api/v1/auth/login', credentials);
    const data = response.data;
    if (data.success && data.token) {
      // Só salva o token se o usuário for válido
      // Decodifica o token antes de salvar
      try {
        const tempToken = data.token;
        const jwtDecode = (await import('jwt-decode')).jwtDecode;
        const decoded = jwtDecode(tempToken);
        const role = decoded.role || decoded.roles?.[0] || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decoded.perfil || decoded.perfis?.[0];
        if (!role) {
          dispatch(loginFailure('Usuário sem permissão ou token inválido.'));
          return;
        }
        authService.setToken(tempToken);
        const user = authService.getUserInfo();
        dispatch(loginSuccess(user));
      } catch (e) {
        dispatch(loginFailure('Token inválido.'));
      }
    } else {
      throw new Error(data.message || 'Erro no login');
    }
  } catch (error) {
    // Tratamento de erro específico do Axios
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 400) {
        dispatch(loginFailure('Email ou senha incorretos.'));
      } else {
        dispatch(loginFailure('Erro no servidor. Tente novamente mais tarde.'));
      }
    } else if (error.request) {
      dispatch(loginFailure('Erro de conexão. Verifique sua internet.'));
    } else {
      dispatch(loginFailure(error.message || 'Erro ao fazer login'));
    }
  }
};

export const logoutAsync = () => (dispatch) => {
  // Remove o token do localStorage
  import('../services/authService').then(({ default: authService }) => {
    authService.removeToken();
    dispatch(logout());
  });
};
