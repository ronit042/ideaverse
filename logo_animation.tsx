import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
const IdeaVerseAnimation = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(100)).current;
  
    useEffect(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    }, [fadeAnim, slideAnim]);
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <Text style={{ fontSize: 36, fontWeight: 'bold' }}>IdeaVerse</Text>
        </Animated.View>
      </View>
    );
  };
  
  export default IdeaVerseAnimation;
  