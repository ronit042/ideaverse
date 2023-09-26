import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import signup from './signup';
import Homepage from './homepage';
import homelogo from './home_logo.png';
import reelogo from './reel.png'
import reels_page from './reels_page';
import post from './new_post';
import new_post from './new-post-icon.jpg';
import notification from './notification';
import notif_logo from './mentoring.png';
import profile from './profile';
import profile_logo from './my_image.jpg';
import mentorpage from './mentorpage';
const Tab = createMaterialBottomTabNavigator();
const RoundedLogo = ({ logoUri }) => {
  return (
    <View style={styles.logoContainer}>
      <Image source={logoUri} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    borderRadius: 50, // Set this value to make the logo rounded. Adjust as needed.
    overflow: 'hidden', // This is important to ensure the image is clipped to the rounded shape.
  },
  logo: {
    width: 30, // Set your desired width for the logo
    height: 30, // Set your desired height for the logo
  },
});

const HomeTabIcon = ({image}) => (
    <Image
      source={image} // Use the imported image directly as the source
      style={{ width: 25, height: 25 }} // Set the desired width and height of the icon
    />
  );
  
export default ({ navigation }) => {
    return(<>
          <Tab.Navigator barStyle={{
        backgroundColor: '#f4511e',
        height: 50,
      }}
    >
        <Tab.Screen name="Home1" component={Homepage} options={{
          tabBarLabel: null,
          tabBarIcon: ({ color, focused }) => (
            <HomeTabIcon image={homelogo} /> 
          ),
        }} />
        <Tab.Screen name="Reels" component={reels_page} options={{
          tabBarLabel: null,
          tabBarIcon: ({ color, focused }) => (
            <HomeTabIcon image={reelogo} /> 
          ),
        }}  />


        <Tab.Screen name="New Post" component={post} options={{
          tabBarLabel: null,
          tabBarIcon: ({ color, focused }) => (
            <HomeTabIcon image={new_post} /> 
          ),
        }}  />
        <Tab.Screen name="Notification" component={mentorpage} options={{
          tabBarLabel: null,
          tabBarIcon: ({ color, focused }) => (
            <HomeTabIcon image={notif_logo} /> 
          ),
        }}  />
        <Tab.Screen name="Profile" component={profile} options={{
          tabBarLabel: null,
          tabBarIcon: ({ color, focused }) => (
            <RoundedLogo logoUri={profile_logo} /> 
          ),
        }}  />

      </Tab.Navigator>
      </>
    )
}