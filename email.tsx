import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const EmailAddressPage = ({ navigation,route }) => {
  const [email, setEmail] = useState('');
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
  const validateEmail = (input) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|in)$/;
    return emailPattern.test(input);
  };

  const handleNext = () => {
    if (email.trim() !== '') {
      if (validateEmail(email)) {
        navigation.navigate('otp');
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
          mobileNumber: null,
          email:email,
        });
      } else {
        alert('Please enter a valid email address ending with .com or .in');
      }
    } else {
      alert('Please enter an email address');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => {
          navigation.navigate('mobilenum');
        }}
      >
        <Text style={styles.signupButtonText}>Sign up with mobile number</Text>
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

export default EmailAddressPage;