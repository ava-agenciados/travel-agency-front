import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../services/authService';

// Thunk para login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk para logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch }) => {
    authService.logout();
  }
);

// Thunk para verificar token ao inicializar
export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      if (authService.isAuthenticated()) {
        const user = authService.getUserInfo();
        return user;
      } else {
        throw new Error('Not authenticated');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
