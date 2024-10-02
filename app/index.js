import React, { useState } from 'react';
import { ScrollView, Button, StyleSheet, Alert, View } from 'react-native';
import { CustomInput } from '../components/CustomInput';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { submitForm } from '../state/formSlice';

export default function App() {
  const router = useRouter(); // Initialize router
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [businessName, setBusinessName] = useState('');

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch(); // Initialize Redux dispatch

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!firstName) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    if (!lastName) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    const phoneRegex = /^[0-9]+$/;
    if (!phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be numeric';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const formData = { firstName, lastName, phoneNumber, address, businessName };
      dispatch(submitForm(formData)); // Dispatch the form data to Redux
      Alert.alert('Form submitted', JSON.stringify(formData));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.navButtonContainer}>
        <Button title="About Us" onPress={() => router.push('/aboutUs')} />
      </View>
      <View style={styles.navButtonContainer}>
        <Button title="Weather Dashboard" onPress={() => router.push('/WeatherDashboard')} />
      </View>

      <CustomInput
        label="First Name"
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Enter first name"
        error={errors.firstName}
      />
      <CustomInput
        label="Last Name"
        value={lastName}
        onChangeText={setLastName}
        placeholder="Enter last name"
        error={errors.lastName}
      />
      <CustomInput
        label="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        error={errors.phoneNumber}
      />
      <CustomInput
        label="Address"
        value={address}
        onChangeText={setAddress}
        placeholder="Enter address"
      />
      <CustomInput
        label="Business Name"
        value={businessName}
        onChangeText={setBusinessName}
        placeholder="Enter business name"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  navButtonContainer: {
    marginBottom: 20,
  },
});
