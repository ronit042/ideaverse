import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const BlinkingLiveIcon = ({ source }) => {
  const [borderColor, setBorderColor] = useState('transparent');

  useEffect(() => {
    // Toggle border color every 500ms (adjust interval as needed)
    const intervalId = setInterval(() => {
      setBorderColor(prevColor => (prevColor === 'transparent' ? 'red' : 'transparent'));
    }, 500);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <View style={[styles.container, { borderColor }]}>
      <Image source={source} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: 'transparent',
    borderRadius: 20,
    padding: 2,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default BlinkingLiveIcon;
