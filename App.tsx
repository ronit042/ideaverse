import React,{useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import signin from './signin'

import signup from './signup'
import profilephoto from './profilephoto'
const Stack = createStackNavigator();
const { StyleSheet, Text, View } = require('react-native');
import loginScreen from './login';
import feedpage from './feedpage';
import swipablescreen from './swipablescreen';
import { AppRegistry, Platform } from 'react-native';
AppRegistry.registerComponent('main', () => App);
import { registerRootComponent } from 'expo';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Viewprofile from './view_profile';
import ForgotPass from './forgot';
import pass from './password'
import saveinfo from './saveinfo'
import birthdate from './birthdate'
import username from './username'
import bio from './bio'
import email from './email'
import mobilenum from './mobilenum'
import otp from './otp'
import policy from './policy'
import addpic from './addpic'
import discoverpage from './discoverpage'
import messageList from './messageList'
import message from './message'
import calling from './calling'
import videocalling from './videocalling'
import confrence from './confrence'
import intrest from './intrest'
import settingprivacy from './settingprivacy'
import AsyncStorage from '@react-native-async-storage/async-storage';


library.add(faPlus);
const App = () => {
  const [homePage,setHome]=useState(false);
  useEffect(() => {
    const loadStoredUniqueID = async () => {
      const id = await AsyncStorage.getItem('uniqueID');
      if (id) {
      setHome(true)
      }
    };
    loadStoredUniqueID(); // Call the function to load stored ID
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
    headerShown: true,
    headerTransparent: true, // Make header transparent
    headerTitle: '',
    
  }}> 
        <Stack.Screen name="Home" component={setHome?feedpage:swipablescreen} />
        <Stack.Screen name="Home2" component={swipablescreen}/>
        <Stack.Screen name="confrence" component={confrence} />
        <Stack.Screen name="signin" component={signin} />
        <Stack.Screen name="signup" component={signup} />
        <Stack.Screen name="feedpage" component={feedpage}  />
        <Stack.Screen name="profilephoto" component={profilephoto} />
        <Stack.Screen name="viewProfile" component={Viewprofile} />
        <Stack.Screen name="forgot" component={ForgotPass} />
        <Stack.Screen name="password" component={pass} />
        <Stack.Screen name="saveinfo" component={saveinfo} />
        <Stack.Screen name="birthdate" component={birthdate} />
        <Stack.Screen name="username" component={username} />
        <Stack.Screen name="bio" component={bio} />
        <Stack.Screen name="mobilenum" component={mobilenum} />
        <Stack.Screen name="email" component={email} />
        <Stack.Screen name="otp" component={otp} />
        <Stack.Screen name="policy" component={policy} />
        <Stack.Screen name="addpic" component={addpic} />
        <Stack.Screen name="discoverpage" component={discoverpage} />
        <Stack.Screen name="messageList" component={messageList} />
        <Stack.Screen name="message" component={message} />
        <Stack.Screen name="calling" component={calling} />
        <Stack.Screen name="videocalling" component={videocalling} />
        <Stack.Screen name="login" component={loginScreen } />
        <Stack.Screen name="intrest" component={intrest } />
        <Stack.Screen name="settingprivacy" component={settingprivacy } />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
registerRootComponent(App);


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  setTextSize:{
    fontSize:20
  }
});