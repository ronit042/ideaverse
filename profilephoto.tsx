import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ProfilePicturePage = ({navigation}) => {
  const [profilePicture, setProfilePicture] = useState(null);

  const handleAddPicture = () => {
   navigation.navigate('addpic');
    // For example, open the image picker or camera to select a profile picture.
    console.log('Add Picture');
  };

  const handleSkip = () => {
    navigation.navigate('discoverpage');
    // Perform any action you want when the "Skip" button is clicked
    // For example, skip setting a profile picture and navigate to another screen.
    console.log('Skip');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profilePicContainer} onPress={handleAddPicture}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.profilePic} />
        ) : (
          <Text style={styles.addPictureText}>Add Picture</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAddPicture}>
        <Text style={styles.buttonText}>Add Picture</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSkip}>
        <Text style={styles.buttonText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#36444b',
  },
  profilePicContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  addPictureText: {
    fontSize: 18,
    color: 'gray',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ProfilePicturePage;