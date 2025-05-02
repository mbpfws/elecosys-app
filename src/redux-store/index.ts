import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Import reducers
import authReducer from './slices/authSlice';
// import userProfileReducer from './slices/userProfileSlice';
// import writingToolReducer from './slices/writingToolSlice';
// import adaptiveTestReducer from './slices/adaptiveTestSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // userProfile: userProfileReducer,
    // writingTool: writingToolReducer,
    // adaptiveTest: adaptiveTestReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
