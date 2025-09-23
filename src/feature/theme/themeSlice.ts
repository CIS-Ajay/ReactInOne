import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  mode: 'light' | 'dark';
}

const initialState: ThemeState = {
  mode: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',  // Persist via localStorage
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload;
      console.log('state.mode: ', state.mode);
      localStorage.setItem('theme', action.payload);  // Persist
    },
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      console.log('state.toggleTheme: ', state.mode);
      localStorage.setItem('theme', state.mode);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;