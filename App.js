import React, { useState } from 'react';
import { ScrollView, Button, StyleSheet, Alert } from 'react-native';
import { CustomInput } from './components/CustomInput';

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [businessName, setBusinessName] = useState('');

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    // Validate first name (required)
    if (!firstName) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    // Validate last name (required)
    if (!lastName) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    // Validate phone number (numbers only)
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
      // Proceed with form submission logic if validation passes
      Alert.alert('Form submitted', JSON.stringify({ firstName, lastName, phoneNumber, address, businessName }));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
});
