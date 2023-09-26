import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfilePicturePage = ({navigation,route}) => {
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
    interest,
    email,
    mobileNumber,
  } = route.params;
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);

  const handleAddPicture = async (type) => {
    // Show the two options to the user (choose from gallery or take a photo)
    Alert.alert(
      'Select a Picture',
      'Choose from gallery or take a photo',
      [
        {
          text: 'Choose from Gallery',
          onPress: () => pickImageFromGallery(type),
        },
        {
          text: 'Take a Photo',
          onPress: () => takePhoto(type),
        },
      ],
      { cancelable: true }
    );
  };

  const pickImageFromGallery = async (type) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      if (type === 'profile') {
        setProfilePicture(result);
      } else if (type === 'cover') {
        setCoverPhoto(result);
      }
    }
  };

  const takePhoto = async (type) => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      if (type === 'profile') {
        setProfilePicture(result);
      } else if (type === 'cover') {
        setCoverPhoto(result);
      }
    }
  };

  const handleRemovePicture = (type) => {
    // Show an alert to confirm removing the picture
    Alert.alert(
      'Remove Picture',
      'Are you sure you want to remove this picture?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => {
            if (type === 'profile') {
              setProfilePicture(null);
            } else if (type === 'cover') {
              setCoverPhoto(null);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleSkip = () => {
    navigation.navigate('discoverpage',
    {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      password: password,
      selectedDay: selectedDay,
      selectedMonth: selectedMonth,
      selectedYear: selectedYear,
      username: username,
      description: description,
      interest: interest,
      mobileNumber: mobileNumber,
      email: email,
      profilepic:null,
      coverpic:null,
      });
    // For example, skip setting a profile picture and navigate to another screen.
    console.log('Skip');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.coverPhotoContainer}
        onPress={() => handleAddPicture('cover')}
      >
        {coverPhoto ? (
          <>
            <Image source={{uri:coverPhoto.assets[0].uri}} style={styles.coverPhoto} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemovePicture('cover')}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.addPictureText}>Add Cover Photo</Text>
        )}

        <TouchableOpacity
          style={styles.profilePicContainer}
          onPress={() => handleAddPicture('profile')}
        >
          {profilePicture ? (
            <>
              <Image source={{uri:profilePicture.uri}} style={styles.profilePic} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemovePicture('profile')}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.addPictureText}>Add Profile Picture</Text>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={() => handleAddPicture('profile')}>
        <Text style={styles.addButtonText}>Add Profile Picture</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={() => handleAddPicture('cover')}>
        <Text style={styles.addButtonText}>Add Cover Photo</Text>
      </TouchableOpacity>
     
      <TouchableOpacity style={styles.button} onPress={()=>{ navigation.navigate('discoverpage',
    {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      password: password,
      selectedDay: selectedDay,
      selectedMonth: selectedMonth,
      selectedYear: selectedYear,
      username: username,
      description: description,
      interest: interest,
      mobileNumber: mobileNumber,
      email: email,
      profilepic:profilePicture,
      coverpic:null,
      });}}>
        <Text style={styles.buttonText}>Skip</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={() => { navigation.navigate('discoverpage',
    {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      password: password,
      selectedDay: selectedDay,
      selectedMonth: selectedMonth,
      selectedYear: selectedYear,
      username: username,
      description: description,
      interest: interest,
      mobileNumber: mobileNumber,
      email: email,
      profilepic:profilePicture,
      coverpic:coverPhoto,
      });}}>
        <Text style={styles.addButtonText}>Next</Text>
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
    backgroundColor: '#964B00',
  },
  profilePicContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  coverPhotoContainer: {
    width: '100%',
    height: 200,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  coverPhoto: {
    width: '100%',
    height: 200,
  },
  addPictureText: {
    fontSize: 18,
    color: 'white',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
  removeButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
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
