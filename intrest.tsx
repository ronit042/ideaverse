import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';

const InterestPage = ({ navigation,route }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [otherInterest, setOtherInterest] = useState('');
  const interests = [
    'Technology',
    'Sports',
    'Cooking',
    'Travel',
    'Art',
    'Music',
    'Fitness',
    'Books',
    'Fashion',
    'Movies',
    'Gaming',
    'Others'
  ];
  const {
    firstName,
    middleName,
    lastName,
    password,
    selectedDay,
    selectedMonth,
    selectedYear,
    username,
    description,
  } = route.params;
  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const renderInterestItem = (interest) => (
    <TouchableOpacity
      key={interest}
      style={[styles.interestItem, selectedInterests.includes(interest) && styles.selectedInterest]}
      onPress={() => toggleInterest(interest)}
    >
      <Text style={styles.interestText}>{interest}</Text>
      {selectedInterests.includes(interest) && <View style={styles.checkmark}></View>}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Select Your Interests</Text>
      <View style={styles.interestList}>
        {interests.map((interest) => (
          <View key={interest} style={styles.menuItem}>
            {renderInterestItem(interest)}
          </View>
        ))}
      </View>
      <TextInput
        style={styles.otherInterestInput}
        placeholder="Other Interest"
        value={otherInterest}
        onChangeText={(text) => setOtherInterest(text)}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          console.log('Selected Interests:', selectedInterests, 'Other Interest:', otherInterest);
          navigation.navigate('mobilenum', {
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            password: password,
            selectedDay: selectedDay,
            selectedMonth: selectedMonth,
            selectedYear: selectedYear,
            username: username,
            description: description,
            interest: selectedInterests,
          });
        }}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#36444b',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  interestList: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  menuItem: {
    marginBottom: 10,
  },
  interestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  selectedInterest: {
    backgroundColor: 'black', // Change this color to indicate selection
  },
  interestText: {
    fontSize: 16,
    marginRight: 5,
    color:'white',
  },
  checkmark: {
    width: 12,
    height: 12,
    backgroundColor: 'green', // Color of the checkmark
    borderRadius: 6,
  },
  otherInterestInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default InterestPage;
