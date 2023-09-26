import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
export default ({navigation,route }) => {
    const { imageUrl } = route.params;
    return (
      <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
        <Image source={{uri:imageUrl}} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
        {/* Add UI elements for changing profile picture */}
      </View>
    );
  };
