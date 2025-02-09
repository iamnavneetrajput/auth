import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, registerUser, forgotPassword, resetPassword, verifyOtp, fetchUser, updateUserInfo } from './authActions';
import Cookies from 'js-cookie';

// Retrieve stored user & token from localStorage
const storedUser = localStorage.getItem('user');
const storedToken = Cookies.get('token');

// Interface for Auth State
interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null, // Load from localStorage
  token: storedToken || null, // Load from Cookies
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove('token');
      localStorage.removeItem('user'); // Remove from storage
    },
    clearError: (state) => {
      state.error = null; // Allows clearing error messages
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        Cookies.set('token', action.payload.token, { expires: 30, path: '/' }); // Secure cookie with path
        localStorage.setItem('user', JSON.stringify(action.payload.user)); // Save user
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔹 Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        Cookies.set('token', action.payload.token, { expires: 30, path: '/' }); // Secure cookie with path
        localStorage.setItem('user', JSON.stringify(action.payload.user)); // Save user
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔹 Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔹 Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔹 Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        // Handle OTP verification success
        console.log('OTP verified successfully:', action.payload);
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        // Handle OTP verification failure
        console.log('Error during OTP verification:', action.payload);
        state.error = action.payload as string;
      })

      // 🔹 Fetch User Info
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload)); // Save user
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔹 Update User Info
      .addCase(updateUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload)); // Save user
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
