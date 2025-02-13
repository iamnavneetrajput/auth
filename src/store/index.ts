// Desc: Redux store configuration
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import lastPageReducer from '../reducers/lastPageSlice';
import  ThemeState  from '../reducers/themeSlice'; // Add this line

const store = configureStore({
  reducer: {
    auth: authReducer,
    lastPage: lastPageReducer,
    theme: ThemeState, 
  },
});

export default store; // Default export

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
