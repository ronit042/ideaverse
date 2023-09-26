import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const UsernamePage = ({ navigation, route }) => {
  const { firstName, middleName, lastName, password, selectedDay, selectedMonth, selectedYear } = route.params;

  const [username, setUsername] = useState('');

  const handleNext = () => {
    if (username.trim() !== '') {
      navigation.navigate('bio', {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        password: password,
        selectedDay: selectedDay,
        selectedMonth: selectedMonth,
        selectedYear: selectedYear,
        username: username,
      });
      console.log('Username:', username);
    } else {
      alert('Please enter a username');
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="white"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
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
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  bottomText: {
    marginTop: 20,
  },
});

export default UsernamePage;