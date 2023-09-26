import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'
import Login from './login'
var styles = {
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#36444b'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#36444b'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#36444b'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
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
}

export default ({navigation}) => {
    const handleSignIn = () => {
      navigation.navigate('signup');

      };
    
      const handleSignUp = () => {
        navigation.navigate('signin');

      };
    
      const handleGoogleSignIn = () => {
        // Implement sign-in with Google logic here
      };
    return(
    <>
  <Swiper style={styles.wrapper} showsButtons loop={true} autoplay={true} autoplayTimeout={3}>
    <View testID="Hello" style={styles.slide1}>
     <Login></Login>
    </View>
    <View testID="Beautiful" style={styles.slide2}>
      <Text style={styles.text}>Beautiful</Text>
    </View>
    <View testID="Simple" style={styles.slide3}>
      <Text style={styles.text}>And simple</Text>
    </View>
  </Swiper>
  <View style={{backgroundColor:'#36444b'}}>
  <View style={styles.buttonsContainer}>
  <TouchableOpacity style={styles.button} onPress={handleSignIn}>
    <Text style={styles.buttonText}>Sign up</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.button} onPress={handleSignUp}>
    <Text style={styles.buttonText}>Login</Text>
  </TouchableOpacity>
</View>
</View>
</>
)}