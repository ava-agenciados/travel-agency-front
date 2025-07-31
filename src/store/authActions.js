import { loginSuccess } from './authSlice';
import authService from '../services/authService';

export const restoreAuth = () => (dispatch, getState) => {
  const { isAuthenticated } = getState().auth;
  if (!isAuthenticated && authService.isAuthenticated()) {
    const user = authService.getUserInfo();
    if (user && user.role) {
      dispatch(loginSuccess(user));
    }
  }
};
