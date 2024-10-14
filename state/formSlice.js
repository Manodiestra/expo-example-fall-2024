import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    submitForm: (state, action) => {
      console.log('Form Data Submitted:', action.payload);
      return [...state, action.payload];
    },
  },
});

export const { submitForm } = formSlice.actions;

export const userFormData = state => state.form

export default formSlice.reducer;
