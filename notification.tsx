import React from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import trending from './trending';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

export default ({ navigation }) => {
  return (
    <NavigationContainer independent={true}>
        <View style={{marginTop:47}}></View>
      <Tab.Navigator>
        <Tab.Screen name="Trending" component={trending} />
        <Tab.Screen name="For You" component={trending} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
