import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const OTPVerificationScreen = ({ navigation,route }) => {
  const [otp, setOTP] = useState('');
  const {
    firstName,
    middleName,
    lastName,
    password,
    selectedDay,
    selectedMonth,
    selectedYear,
    username,
    description,
    interest,
    email,
    mobileNumber,
  } = route.params;
  const handleOTPChange = (enteredOTP) => {
    const numericOTP = enteredOTP.replace(/[^0-9]/g, '');
    setOTP(numericOTP);
  };

  const handleSubmit = () => {
    if (otp.length === 4) {
      // All fields are filled, proceed to the next screen
      navigation.navigate('policy',
        {
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          password: password,
          selectedDay: selectedDay,
          selectedMonth: selectedMonth,
          selectedYear: selectedYear,
          username: username,
          description: description,
          interest: interest,
          mobileNumber: mobileNumber,
          email: email,
          });
    } else {
      console.log('Please enter a valid OTP.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter 4-Digit OTP</Text>
      <View style={styles.otpContainer}>
        <TextInput
          style={styles.otpInput}
          value={otp.charAt(0)}
          onChangeText={(val) => handleOTPChange(val + otp.slice(1))}
          keyboardType="numeric"
          maxLength={1}
        />
        <TextInput
          style={styles.otpInput}
          value={otp.charAt(1)}
          onChangeText={(val) => handleOTPChange(otp.slice(0, 1) + val + otp.slice(2))}
          keyboardType="numeric"
          maxLength={1}
        />
        <TextInput
          style={styles.otpInput}
          value={otp.charAt(2)}
          onChangeText={(val) => handleOTPChange(otp.slice(0, 2) + val + otp.slice(3))}
          keyboardType="numeric"
          maxLength={1}
        />
        <TextInput
          style={styles.otpInput}
          value={otp.charAt(3)}
          onChangeText={(val) => handleOTPChange(otp.slice(0, 3) + val)}
          keyboardType="numeric"
          maxLength={1}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#36444b',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
  otpContainer: {
    flexDirection: 'row',
  },
  otpInput: {
    flex: 1,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 5,
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  button: {
    backgroundColor: '#0000FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default OTPVerificationScreen;