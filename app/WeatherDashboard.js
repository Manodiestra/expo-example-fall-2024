import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherData, selectWeatherData } from '../state/weatherSlice';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Navigation from '../components/Navigation';

export default function WeatherDashboard() {
  const dispatch = useDispatch();
  const weatherData = useSelector(selectWeatherData);
  const weatherStatus = useSelector((state) => state.weather.status);

  useEffect(() => {
    if (weatherStatus === 'idle') {
      dispatch(fetchWeatherData());
    }
  }, [dispatch, weatherStatus]);

  const todayWeather = weatherData?.list ? weatherData.list[0] : null;

  if (weatherStatus === 'loading') {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.text}>Loading today's weather...</Text>
      </View>
    );
  }

  if (weatherStatus === 'failed') {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Failed to fetch weather data.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Navigation />
      <Text style={styles.title}>Today's Weather in {weatherData?.city?.name}</Text>
      {todayWeather ? (
        <View style={styles.weatherInfo}>
          <Text style={styles.text}><Text style={styles.boldText}>Temperature:</Text> {(todayWeather.main.temp - 273.15).toFixed(2)} °C</Text>
          <Text style={styles.text}><Text style={styles.boldText}>Humidity:</Text> {todayWeather.main.humidity} %</Text>
          <Text style={styles.text}><Text style={styles.boldText}>Weather:</Text> {todayWeather.weather[0].description}</Text>
          <Text style={styles.text}><Text style={styles.boldText}>Wind Speed:</Text> {todayWeather.wind.speed} m/s</Text>
        </View>
      ) : (
        <Text style={styles.text}>No weather data available for today.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  text: {
    fontSize: 18,
    marginBottom: 10
  },
  boldText: {
    fontWeight: 'bold'
  },
  weatherInfo: {
    alignItems: 'flex-start',
    width: '100%',
    maxWidth: 400
  }
});