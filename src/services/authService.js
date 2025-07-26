// PROCESSO DE LOGIN DO USUÁRIO
import api from './api';

const login = async (credenciais) => {
  const response = await api.post('/api/v1/auth/login', credenciais);

  const { token } = response.data;

  if (token) {
    localStorage.setItem('token', token)
  }
  return response.data;
};

// Logout do usuário
const logout = () => {
  localStorage.removeItem('token');
};

export default{
  login,
  logout,
};
