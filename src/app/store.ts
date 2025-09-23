import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../feature/theme/themeSlice';
import authReducer from '../feature/auth/authSlice';
// Import other reducers here (e.g., counterReducer from features/counter/counterSlice)

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    // Add other reducers, e.g., counter: counterReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;