import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch the list of users from the API
export const fetchUsers = createAsyncThunk(
  'form/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      // serverUrl is the public IP address of the EC2 server if you used the startup scripts from class
      const serverUrl = process.env.EXPO_PUBLIC_PUBLIC_IP;
      const response = await fetch(`http://${serverUrl}:8000/api/users/`, {
        method: 'GET',
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
      return rejectWithValue(error.response?.data || 'Failed to fetch users');
    }
  }
);

// Thunk to post user form data to the API
export const postUserForm = createAsyncThunk(
  'form/postUserForm',
  async (userData, { rejectWithValue }) => {
    // serverUrl is the public IP address of the EC2 server if you used the startup scripts from class
    const serverUrl = process.env.EXPO_PUBLIC_PUBLIC_IP;
    try {
      const response = await fetch(`http://${serverUrl}:8000/api/addUser/`, {
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
      // Handle POST request
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
        state.error = action.payload; // Error message from the server
      })

      // Handle GET request for fetching users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.formData = action.payload; // Replace formData with the fetched users
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Error message from the server
      });
  },
});

export const userFormData = (state) => state.form.formData;
export const formLoading = (state) => state.form.loading;
export const formError = (state) => state.form.error;

export default formSlice.reducer;
