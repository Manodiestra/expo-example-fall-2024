import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to post user form data to the API
export const postUserForm = createAsyncThunk(
  'form/postUserForm',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('USE addUser', userData);
      const response = await fetch('http://127.0.0.1:8080/api/addUser/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        // Handle non-2xx responses
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json(); // Parse response as JSON
      return data; // This will be the resolved action payload
    } catch (error) {
      // Return error message or object if the request fails
      return rejectWithValue(error.response?.data || 'Failed to submit form');
    }
  }
);

const initialState = {
  formData: [],
  loading: false,
  error: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postUserForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postUserForm.fulfilled, (state, action) => {
        state.loading = false;
        state.formData.push(action.payload); // Assuming the server responds with the saved form data
      })
      .addCase(postUserForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Error message from the server or axios
      });
  },
});

export const userFormData = (state) => state.form.formData;
export const formLoading = (state) => state.form.loading;
export const formError = (state) => state.form.error;

export default formSlice.reducer;
