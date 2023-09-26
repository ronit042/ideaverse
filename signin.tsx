import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import * as Application from 'expo-application';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import { Platform } from 'expo-modules-core'; // Add this import
import { v4 as uuidv4 } from 'uuid'; // or any other UUID library
import AsyncStorage from '@react-native-async-storage/async-storage';

const generateUniqueID = () => {
  const randomId = uuidv4(); // Generate a random UUID

  return `${randomId}`;
};
const storeUniqueID = async (uniqueID) => {
  try {
    await AsyncStorage.setItem('uniqueID', uniqueID);
  } catch (error) {
    console.error('Error storing unique ID:', error);
  }
};
const LoginScreen = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const hasSpecialCharacter = (input) => {
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return specialCharacters.test(input);
  };
  const handleLogin = () => {
    if (emailOrPhone && password && hasSpecialCharacter(password)) {
      console.log('Email/Phone:', emailOrPhone);
      console.log('Password:', password);

const postData = {
  [emailOrPhone]: {
    'Pass': [password],
  }
};
const fetchLastId = async () => {
  try {
    const response = await axios.get('http://13.53.200.185:3000/lastId');
    const stringer=""+response.data.lastId;
    storeUniqueID(stringer); // Store the unique ID

  } catch (error) {
    console.error('Error fetching last ID:', error);
  }
};
const apiUrl = 'http://13.53.200.185:3000/data';
axios.post(apiUrl, postData, {
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    if(response.data.signal){
      fetchLastId();
      navigation.navigate('feedpage');
    }
    else{
      alert('Invalid Credentials');
    }
    console.log('Response:', response.data.signal);
  })
  .catch(error => {
    console.error('Error:', error);
  });
    } else if (!hasSpecialCharacter(password)) {
      console.log('Password must contain at least one special character.');
    } else {
      console.log('Please fill in all fields.');
    }
  };

  const handleForgotPassword = () => {
    // No mandatory fields for forgot password
    
    navigation.navigate('forgot');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email or Phone Number"
          placeholderTextColor="white"
          
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
          keyboardType="email-address" // Use 'phone-pad' for phone number input
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="white"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword((prevShow) => !prevShow)}
        >
          <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#36444b',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    color: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    borderRadius: 5,
  },
  eyeIcon: {
    position: 'absolute',
    top: 70,
    right: 10,
  },  
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPasswordText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;