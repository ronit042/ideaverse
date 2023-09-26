import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const DiscoverPeoplePage = ({navigation,route}) => {
  const storeUniqueID = async (uniqueID) => {
    try {
      await AsyncStorage.setItem('uniqueID', uniqueID);
    } catch (error) {
      console.error('Error storing unique ID:', error);
    }
  };
  const fetchLastId = async () => {
    try {
      const response = await axios.get('http://13.53.200.185:3000/lastId');
      const stringer=""+(Number(response.data.lastId)+1);

      storeUniqueID(stringer); // Store the unique ID
    } catch (error) {
      console.error('Error fetching last ID:', error);
    }
  };
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
    profilepic,
    coverpic
  } = route.params;
  const createData = async () => {
    fetchLastId();

    let ident=email==null?mobileNumber:email
    const data = {
      [ident]: {
        Password: password,
        FirstName:firstName,
        LastName:lastName,
        MiddleName:middleName,
        Username:username,
        DOB:{
          Date:selectedDay,
          Month:selectedMonth,
          Year:selectedYear,
        },
        Description:description,
        Interests:interest,
        Mobilenum:mobileNumber,
        Email:email,
        Profileimage:profilepic,
        Coverimage:coverpic,
        Friends:userData.map((user) => (user.follow ? user.name : null)),
        Posts:[]
      },
    };
    navigation.navigate('feedpage')

    try {
      const response = await axios.post('http://13.53.200.185:3000/create', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    } 
  };
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get('http://13.53.200.185:3000/users')
    .then(response => {
      const userData = response.data;
      const updatedUsers = Object.entries(userData).map(([id, name]) => ({
        id,
        name,
        follow: false,
      }));
      setUserData(updatedUsers);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
}, []);

  const handleFollow = (id) => {
    setUserData((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { ...user, follow: !user.follow } : user))
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Discover People</Text>
      {userData.map((user) => (
        <View key={user.id} style={styles.userContainer}>
          <Image
            source={require('./community.png')} // Replace with user's profile picture
            style={styles.profilePic}
          />
          <Text style={styles.username}>{user.id}</Text>
          {user.follow ? (
            <TouchableOpacity
              style={[styles.followButton, { backgroundColor: 'white' }]}
              onPress={() => handleFollow(user.id)}
            >
              <Text style={styles.followButtonText}>Following</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.followButton, { backgroundColor: 'blue' }]}
              onPress={() => handleFollow(user.id)}
            >
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.crossButton}
            onPress={() => handleFollow(user.id)}
          >
            <Text style={styles.crossButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.skipButton} onPress={createData}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#36444b',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  followButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 10,
  },
  followButtonText: {
    color: 'white',
    fontSize: 14,
  },
  crossButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
  },
  crossButtonText: {
    fontSize: 14,
    color: 'white',
  },
  skipButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  skipButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default DiscoverPeoplePage;