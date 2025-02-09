import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api'; // Assuming you have an axios instance or API utility
import Cookies from 'js-cookie';

// Register User
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data; // Backend should send success without login token
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

// Fetch User Profile
export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/profile/me'); // Backend API call
      return response.data.user; // Return user data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);

// Update User Profile
export const updateUserInfo = createAsyncThunk(
  'auth/updateUserInfo',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await api.put('/profile/me', formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user info');
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      Cookies.set('token', response.data.token, { expires: 30 });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || 'Login failed');
    }
  }
);

// Forgot Password (Send OTP)
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || 'Error sending OTP');
    }
  }
);

// Reset Password (Use OTP)
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ otp, newPassword }: { otp: string; newPassword: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/reset-password', { otp, newPassword });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || 'Reset password failed');
    }
  }
);

// Verify OTP
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ otp }: { otp: string }, { rejectWithValue }) => {
    try {
      // Send OTP to the backend
      const response = await api.post('/auth/verify-otp', { otp });

      // Return the response data if successful
      return response.data;
    } catch (error: any) {
      // Log the error for debugging
      console.log('Error during OTP verification:', error);

      // Return the error message if there's a failure
      return rejectWithValue(error.response?.data?.message || 'OTP verification failed');
    }
  }
);
