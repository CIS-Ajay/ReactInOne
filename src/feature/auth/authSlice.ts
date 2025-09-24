import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock async API for demo
const fakeApiCall = <T>(response: T, shouldFail = false, delay = 1000) =>
  new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error('Something went wrong.'));
      else resolve(response);
    }, delay);
  });

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  role: string;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  tokens: Tokens | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  secret: string | null;
  step: 'login' | 'otp' | 'authenticated';
  // Registration-specific
  registerStep: 'email' | 'otp' | 'details' | 'done';
  registrationToken: string | null;
  resetToken: string | null;
  hydrated: boolean;  
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  tokens: null,
  loading: false,
  error: null,
  successMessage: null,
  secret: null,
  step: 'login',
  registerStep: 'email',
  registrationToken: null,
  resetToken: null,
  hydrated: false,
};

// --- STEP 1: Request OTP ---
export const requestRegisterOtp = createAsyncThunk(
  'auth/requestRegisterOtp',
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/otp/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error.message || 'Failed to request OTP');
      }
      return (await res.json()) as { secret: string; otp?: string };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// --- STEP 2: Verify OTP ---
export const verifyRegisterOtp = createAsyncThunk(
  'auth/verifyRegisterOtp',
  async (
    { email, otp, secret }: { email: string; otp: string; secret: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, secret }),
      });
      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error.message || 'OTP verification failed');
      }
      return (await res.json()) as { registrationToken: string };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// --- STEP 3: Register user ---
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    payload: {
      username: string;
      firstname: string;
      lastname: string;
      password: string;
      registrationToken: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error.message || 'Registration failed');
      }
      return (await res.json()) as User;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Step 1 → request OTP
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error.message || 'Login failed');
      }
      return (await res.json()) as { message: string; secret: string };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Step 2 → verify OTP
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (payload: { email: string; secret: string; otp: string }, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/login/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error.message || 'OTP verification failed');
      }
      return (await res.json()) as { user: User; tokens: Tokens };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// --- Step 1: Request OTP ---
export const requestForgotOtp = createAsyncThunk(
  'auth/requestForgotOtp',
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/forgot-password/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error.message);
      }
      return (await res.json()) as { message: string; secret: string; otp?: string };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// --- Step 2: Verify OTP ---
export const verifyForgotOtp = createAsyncThunk(
  'auth/verifyForgotOtp',
  async (
    { email, otp, secret }: { email: string; otp: string; secret: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/forgot-password/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, secret }),
      });
      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error.message);
      }
      return (await res.json()) as { resetToken: string };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// --- Step 3: Reset Password ---
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (
    { newPassword, confirmPassword, resetToken }: { newPassword: string; confirmPassword: string; resetToken: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/forgot-password/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword, confirmPassword, resetToken }),
      });
      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error.message);
      }
      return await res.json();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.tokens = null;
      state.secret = null;
      state.step = 'login';
      state.registerStep = 'email';
      state.registrationToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    restoreAuth: (state, action) => {
      state.tokens = action.payload.tokens;
      state.user = action.payload.user || null;
      state.isAuthenticated = true;
      state.hydrated = true;
      // state.step = 'authenticated';
    },
hydrate: (state) => {
  state.hydrated = true; // just mark hydration complete
},

  },
  extraReducers: (builder) => {
    // STEP 1 → Request OTP
    builder.addCase(requestRegisterOtp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(requestRegisterOtp.fulfilled, (state, action) => {
      state.loading = false;
      state.secret = action.payload.secret;
      state.registerStep = 'otp';
      state.successMessage = 'OTP sent to your email';
    });
    builder.addCase(requestRegisterOtp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // STEP 2 → Verify OTP
    builder.addCase(verifyRegisterOtp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifyRegisterOtp.fulfilled, (state, action) => {
      state.loading = false;
      state.registrationToken = action.payload.registrationToken;
      state.registerStep = 'details';
      state.successMessage = 'OTP verified. Continue with registration.';
    });
    builder.addCase(verifyRegisterOtp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // STEP 3 → Register User
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.registerStep = 'done';
      state.successMessage = 'Registration successful. You can now login.';
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // --- LOGIN (Step 1) ---
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
      state.secret = action.payload.secret;
      state.step = 'otp';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // --- VERIFY OTP (Step 2) ---
    builder.addCase(verifyOtp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      state.step = 'authenticated';
      localStorage.setItem('accessToken', action.payload.tokens.accessToken);
      localStorage.setItem('refreshToken', action.payload.tokens.refreshToken);
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Forgot Password
    // Request OTP
    builder.addCase(requestForgotOtp.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    });
    builder.addCase(requestForgotOtp.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
      state.secret = action.payload.secret;
    });
    builder.addCase(requestForgotOtp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Verify OTP
    builder.addCase(verifyForgotOtp.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    });
    builder.addCase(verifyForgotOtp.fulfilled, (state, action) => {
      state.loading = false;
      state.resetToken = action.payload.resetToken;
      state.successMessage = 'OTP verified. Enter new password.';
    });
    builder.addCase(verifyForgotOtp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Reset Password
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
      state.resetToken = null;
      state.secret = null;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout, clearMessages, restoreAuth, hydrate } = authSlice.actions;
export default authSlice.reducer;
