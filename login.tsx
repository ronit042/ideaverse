import React,{useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animation from './logo_animation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";

const loginScreen = ({ navigation }) => {

  useEffect(() => {
    const loadStoredUniqueID = async () => {
      const id = await AsyncStorage.getItem('uniqueID');
      if (id) {
        navigation.navigate('Home1')
      }
    };
    loadStoredUniqueID(); // Call the function to load stored ID
  }, []);
  const handleSignIn = () => {
    navigation.navigate('signin');
  };

  const handleSignUp = () => {
    navigation.navigate('signup');
  };

  const handleGoogleSignIn = () => {
    // Implement sign-in with Google logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Id<Text style={{ color: 'red' }}>e</Text>aVerse
          
        </Text>
        <Text style={{color:'white'}}>Where Ideas Unite: Empowering Teams with Support</Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36444b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row', // Display buttons side by side
    justifyContent: 'space-around', // Space evenly between buttons
    alignItems: 'center', // Align buttons vertically
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'yellow',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  blueRectangle: {
    backgroundColor: 'red',
    paddingHorizontal: 5,
    width: 20,
    marginLeft: 7, // Adjust the marginLeft to control the size of the red rectangle
  },
});

export default loginScreen;
