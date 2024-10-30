import React, { useState } from 'react';
import { ScrollView, Button, StyleSheet, Alert, View } from 'react-native';
import { CustomInput } from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { postUserForm, userFormData } from '../state/formSlice'; // Import the Redux action
import Navigation from '../components/Navigation';

export default function AddUserForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [businessName, setBusinessName] = useState('');
  const allUsers = useSelector(state => userFormData(state));
  console.log('OUR FORM REDUX STATE', allUsers)

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
      const formData = {
        FirstName: firstName,
        LastName: lastName,
        PhoneNumber: phoneNumber,
        Address: address,
        Business: businessName
      };
      dispatch(postUserForm(formData)); // Dispatch the form data to Redux
      Alert.alert('Form submitted', JSON.stringify(formData));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Navigation />

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
  navButtonContainer: {
    marginBottom: 20,
  },
});
