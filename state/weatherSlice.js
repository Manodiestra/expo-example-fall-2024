import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWeatherData = createAsyncThunk(
    'weather/fetchWeatherData',
    async () => {
        const apiKey = '';
        const locationID = '5780026';
        apiUrl = `http://api.openweathermap.org/data/2.5/forecast?id=${locationID}&appid=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("OUR WEATHER DATA", data)
        return data;  // Return the weather data to be used in the reducer
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        data: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchWeatherData.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchWeatherData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchWeatherData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
})

export const selectWeatherData = (state) => state.weather.data;

export default weatherSlice.reducer;