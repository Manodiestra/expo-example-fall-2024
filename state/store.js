import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import weatherReducer from './weatherSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    form: formReducer,
    weather: weatherReducer,
  },
});

export default store;
