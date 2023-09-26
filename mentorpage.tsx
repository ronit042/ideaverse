import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView , Image} from 'react-native';
import MentorshipOption from './buttoncategory';



const MentorshipScreen = ({navigation}) => {
  const allMentorshipOptions = [
    'Sports', 'IT', 'Medical', 'Business', 'Judiciary', 'Management',
    // Add more options here
  ];

  const [searchText, setSearchText] = useState('');
  const filteredOptions = allMentorshipOptions.filter(option =>
    option.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleOptionPress = (option) => {
    navigation.navigate('messageList')
    console.log(`Selected option: ${option}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for mentorship options"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <ScrollView style={styles.optionContainer}>
        <View style={styles.optionRow}>
          {filteredOptions.map((option, index) => (
            <MentorshipOption
              key={index}
              title={option}
              onPress={() => handleOptionPress(option)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginLeft: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  optionContainer: {
    flex: 1,
    padding: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default MentorshipScreen;
