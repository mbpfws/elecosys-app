import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: string | null;
  email: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  role: string | null;
  hasApiKey: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  id: null,
  email: null,
  displayName: null,
  avatarUrl: null,
  role: null,
  hasApiKey: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload, error: null };
    },
    clearUser: (state) => {
      return { ...initialState };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser, clearUser, setLoading, setError, updateUserProfile } = authSlice.actions;

export default authSlice.reducer;
