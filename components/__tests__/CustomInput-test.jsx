import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CustomInput } from '../CustomInput'; // Update the path accordingly

describe('<CustomInput />', () => {
  test('renders label and input correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <CustomInput label="Username" placeholder="Enter your username" value="" onChangeText={() => {}} />
    );

    expect(getByText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Enter your username')).toBeTruthy();
  });

  test('calls onChangeText when input changes', () => {
    const mockOnChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <CustomInput
        label="Username"
        placeholder="Enter your username"
        value=""
        onChangeText={mockOnChangeText}
      />
    );

    const input = getByPlaceholderText('Enter your username');
    fireEvent.changeText(input, 'New Value');

    expect(mockOnChangeText).toHaveBeenCalledWith('New Value');
  });

  test('displays error text and applies error style when error is provided', () => {
    const { getByText, getByPlaceholderText } = render(
      <CustomInput
        label="Email"
        placeholder="Enter your email"
        value=""
        onChangeText={() => {}}
        error="Invalid email address"
      />
    );

    expect(getByText('Invalid email address')).toBeTruthy();

    const input = getByPlaceholderText('Enter your email');
    expect(input.props.style).toContainEqual({ borderColor: 'red' });
  });

  test('renders with correct keyboardType', () => {
    const { getByPlaceholderText } = render(
      <CustomInput
        label="Phone Number"
        placeholder="Enter your phone number"
        value=""
        onChangeText={() => {}}
        keyboardType="numeric"
      />
    );

    const input = getByPlaceholderText('Enter your phone number');
    expect(input.props.keyboardType).toBe('numeric');
  });

  test('renders without error text and style when no error is provided', () => {
    const { queryByText, getByPlaceholderText } = render(
      <CustomInput label="Password" placeholder="Enter your password" value="" onChangeText={() => {}} />
    );

    expect(queryByText('Invalid email address')).toBeNull();

    const input = getByPlaceholderText('Enter your password');
    expect(input.props.style).not.toContainEqual({ borderColor: 'red' });
  });
});
