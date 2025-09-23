import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

// Mock async API for demo
const fakeApiCall = <T>(response: T, shouldFail = false, delay = 1000) =>
  new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error('Something went wrong.'));
      else resolve(response);
    }, delay);
  });

// --- Async thunks for login & register (fake API for now) ---
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload: { username: string; password: string }) => {
    // Simulate API call with delay
    await fakeApiCall(true); 
    // await new Promise((resolve) => setTimeout(resolve, 500));
    return { name: payload.username }; // fake returned user
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (payload: { username: string; password: string }) => {
    // Simulate API call with delay
    await fakeApiCall(true);
    // await new Promise((resolve) => setTimeout(resolve, 500));
    return { name: payload.username }; // fake returned user
  }
);
// Forgot Password
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email }: { email: string }) => {
    await fakeApiCall(true);
    return { message: 'Password reset link sent to your email.' };
  }
);

interface AuthState {
  isAuthenticated: boolean;
  user: { name: string } | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;

}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('authToken'),
  user: null,
  loading: false,
  error: null,
  successMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('authToken');
    },
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },

  },
  extraReducers: (builder) => {
    // --- LOGIN ---
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<{ name: string }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('authToken', 'demo-token');
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
      state.error = 'Failed to login';
    });

    // --- REGISTER ---
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<{ name: string }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('authToken', 'demo-token');
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.loading = false;
      state.error = 'Failed to register';
    });

    // Forgot Password
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Request failed.';
    });
  },
});

export const { logout, clearMessages } = authSlice.actions;
export default authSlice.reducer;
