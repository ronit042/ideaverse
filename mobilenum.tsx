import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const MobileNumberPage = ({ navigation,route }) => {
  const [mobileNumber, setMobileNumber] = useState('');
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
    interest
  } = route.params;
  const handleNext = () => {
    if (mobileNumber.length === 10) {
      navigation.navigate('otp', {
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
        email:null,
      });
      console.log('Mobile Number:', mobileNumber);
    } else {
      alert('Please enter a valid 10-digit mobile number');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your mobile number"
        placeholderTextColor="white"
        keyboardType="numeric"
        value={mobileNumber}
        onChangeText={(text) => setMobileNumber(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => {
          navigation.navigate('email',
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
          }
          );
        }}
      >
        <Text style={styles.signupButtonText}>Sign up with email address</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{navigation.navigate('signin')}}>
      <Text style={styles.bottomText}>Already have an account?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#36444b',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  signupButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 18,
  },
  bottomText: {
    marginTop: 20,
  },
});

export default MobileNumberPage;
