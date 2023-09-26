import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MentorshipOption = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.optionBox} onPress={onPress}>
      <Text style={styles.optionText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionBox: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#3498db',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MentorshipOption;
