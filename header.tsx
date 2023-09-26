import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import searchIcon from './search.png'; // Import the search icon image
import messageIcon from './message.png'; // Import the message icon image
import { useNavigation } from '@react-navigation/native';

const Header = ({onSearchPress }) => {
  const navigation=useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
        />
        <TouchableOpacity
          style={styles.button}
          onPress={onSearchPress}
        >
          <Image source={searchIcon} style={styles.searchIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.messageButton}
          onPress={() => {
            navigation.navigate('messageList');
          }}
        >
          <Image source={messageIcon} style={styles.messageIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#36444b',
    paddingBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 45,
    backgroundColor: '#f4511e',
    borderRadius: 10,
  },
  input: {
    flex: 1,
    padding: 5,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  button: {
    padding: 10,
    backgroundColor: 'transparent',
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  messageButton: {
    padding: 10,
    backgroundColor: 'transparent',
  },
  messageIcon: {
    width: 20,
    height: 20,
    tintColor:'white'
  },
});

export default Header;
