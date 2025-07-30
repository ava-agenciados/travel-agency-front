import { loginSuccess, setLoading } from './authSlice';
import authService from '../services/authService';

export const restoreAuth = () => (dispatch, getState) => {
  console.log('🔄 Iniciando restoreAuth...');
  
  try {
    const token = authService.getToken();
    console.log('🔑 Token encontrado:', !!token);
    
    if (token) {
      const isValid = authService.isTokenValid();
      console.log('✅ Token válido:', isValid);
      
      if (isValid) {
        const user = authService.getUserInfo();
        console.log('👤 Dados do usuário:', user);
        
        if (user && user.role) {
          console.log('✅ Restaurando sessão para:', user.email);
          dispatch(loginSuccess(user));
          return;
        }
      } else {
        console.log('❌ Token expirado, removendo...');
        authService.removeToken();
      }
    }
    
    console.log('❌ Sessão não restaurada');
  } catch (error) {
    console.error('❌ Erro ao restaurar sessão:', error);
    authService.removeToken();
  } finally {
    dispatch(setLoading(false));
  }
};
