import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const BioPage = ({ navigation, route }) => {
  const { firstName, middleName, lastName, password, selectedDay, selectedMonth, selectedYear, username } = route.params;

  const [description, setDescription] = useState('');

  const handleNext = () => {
    if (description.trim() !== '') {
      navigation.navigate('intrest', {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        password: password,
        selectedDay: selectedDay,
        selectedMonth: selectedMonth,
        selectedYear: selectedYear,
        username: username,
        description: description,
      });
      console.log('Description:', description);
    } else {
      alert('Please enter a description');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your description"
        placeholderTextColor="white"
        multiline
        numberOfLines={5}
        value={description}
        onChangeText={(text) => setDescription(text)}
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
    height: 150,
    width: '100%',
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
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

export default BioPage;