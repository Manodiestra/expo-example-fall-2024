import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import weatherReducer from './weatherSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    weather: weatherReducer,
  },
});

export default store;
