import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  address: '',
  businessName: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    submitForm: (state, action) => {
      console.log('Form Data Submitted:', action.payload); // Log the form data
      return { ...state, ...action.payload }; // Update the state with form data
    },
  },
});

export const { submitForm } = formSlice.actions;

export default formSlice.reducer;
