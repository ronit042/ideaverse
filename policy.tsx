import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TermsAndPolicyPage = ({navigation,route}) => {
  const [agreed, setAgreed] = useState(false);
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
  const handleAgree = () => {
    navigation.navigate('addpic',
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
    // For example, update the state to indicate that the user agreed to the terms.
    setAgreed(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terms and Policies</Text>
      <Text style={styles.policyText}>
        {/* Add your policy and terms here */}
        This app collects some personal information for authentication purposes.
        By using this app, you agree to the collection and processing of your
        personal information as described in the Privacy Policy.
      </Text>
      {!agreed && (
        <TouchableOpacity style={styles.button} onPress={handleAgree}>
          <Text style={styles.buttonText}>I Agree</Text>
        </TouchableOpacity>
      )}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  policyText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  bottomText: {
    marginTop: 20,
  },
});

export default TermsAndPolicyPage;