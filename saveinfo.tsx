import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SaveInfoPage = ({ navigation, route }) => {
  const { firstName, middleName, lastName, password } = route.params;

  const handleSave = () => {
    // Perform any action you want when the "Save" button is clicked
    // For example, save the information to a database
    
    navigation.navigate('birthdate', {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      password: password,
    });
    
    console.log('Info saved!');
  };

  const handleNotNow = () => {
    // Perform any action you want when the "Not Now" button is clicked
    navigation.navigate('birthdate');
    console.log('Not saving info now!');
  };

  return (
    <View style={styles.container}>
      {/* Your content for saving information goes here */}
      <Text style={styles.infoText}>Please save your information.</Text>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNotNow}>
        <Text style={styles.buttonText}>Not Now</Text>
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
  infoText: {
    fontSize: 18,
    marginBottom: 20,
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
  bottomText: {
    marginTop: 20,
  },
});

export default SaveInfoPage;