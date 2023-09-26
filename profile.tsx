import React,{useState,useEffect} from 'react';
import { Text, Image, ScrollView,DrawerLayoutAndroid, View, TouchableOpacity,Modal, Pressable, StatusBar,StyleSheet,Dimensions} from 'react-native';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Posts from './my_posts';
import my_data from './user_data.json';
import noprofile from './no_profile.png';
import nocover from './No_cover.png';
import bulb from './light_bulb.webp';
import heart from './heart-icon.png';
import star from './star.png';
import community from './community.png';
import mentions from './mentions';
import plus from './plus_icon.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import SkillsBarChart from './skillbarchat';

import { BarChart } from 'react-native-chart-kit';
import trophy from './gold.webp';
import Carousel from 'react-native-snap-carousel';
import { RefreshControl } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import LeagueInfo from './ranking';
const windowWidth = Dimensions.get('window').width; 
const styles = StyleSheet.create({
  carouselContainer: {
      marginTop: 2,
      backgroundColor: '#f4f4f4',
      padding: 15,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    
  },
  achievementContainer: {
    alignItems: 'center',
  },
  trophyImage: {
    width: 60,
    height: 60,
  },
  drawer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawerItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  drawerItemText: {
    fontSize: 16,
  },
  achievementName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  },
});

const Tab = createMaterialTopTabNavigator();

let convertDate = (date) => {
  switch (date) {
    case 1: return 'Jan';
    case 2: return 'Feb';
    case 3: return 'Mar';
    case 4: return 'Apr';
    case 5: return 'May';
    case 6: return 'June';
    case 7: return 'July';
    case 8: return 'Aug';
    case 9: return 'Sept';
    case 10: return 'Oct';
    case 11: return 'Nov';
    case 12: return 'Dec';
    default: return '';
  }
};
const encrypt=(x)=>{
  let ans='';
  for(let i=0;i<x.length;i++){
    switch(x[i]){
      case '1': ans=ans+'12sIma21-';break;
      case '0': ans=ans+'16RinKu40-';break;
      case '2': ans=ans+'33koMAl9-';break;
      case '3': ans=ans+'133KHUsI17-';break;
      case '4': ans=ans+'51AnIL79-';break;
      case '5': ans=ans+'16pRaMoD37-';break;
      case '6': ans=ans+'61alIshA16-';break;
      case '7': ans=ans+'22ANUprIyA89-';break;
      case '8': ans=ans+'59shirDEe93-';break;
      case '9': ans=ans+'94aBhIjEEt46-';break;
    }
  }
  ans=ans.substring(0,ans.length-1);
  return ans;
}
const UserProfile = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [coverVisible, setCoverVisible] = useState(false);
  const [profilePic, setProfilePic] = useState(my_data.profile_pic);
  const [coverPic, setCoverPic] = useState(my_data.cover_pic);
  const [refreshing, setRefreshing] = useState(false);
  const[size,pagesize]=useState(1000);
  const[userdata,setUserData]=useState({
    FirstName:null,
    MiddleName:null,
    Username:null,
    LastName:null,
    Description:null,
    Interests:[],
    Coverimage:null,
    Profileimage:null,
  });
  
  const handleTabPress = (route) => {
    console.log(route.name);
    console.log('Tab pressed');
    
  };

  useEffect(() => {
    const loadStoredUniqueID = async () => {
      const id = ''+await AsyncStorage.getItem('uniqueID');
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://13.53.200.185:3000/9073324/${encrypt(id)}`); // Replace with your server URL and data
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }
    loadStoredUniqueID();
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
      setTimeout(() => {
      setRefreshing(false);
      navigation.navigate('Profile');
    }, 1000);
  };
  
  const pickProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });  
    if (!result.cancelled) {
      setMenuVisible(false);
      setProfilePic(result.uri);
    }
  };
  const pickCoverImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 2],
      quality: 1,
    });
    if(!result.cancelled){
      setCoverVisible(false);
      setCoverPic(result.uri);
    }
  };

  
  
  const closeMenu = () => {
    setMenuVisible(false);
  };
  
    const renderAchievementItem = ({ item }) => (
      <View style={styles.achievementContainer}>
        <Image source={trophy} style={styles.trophyImage} />
        <Text style={styles.achievementName}>{item}</Text>
      </View>
    );
    
  return (
    <NavigationContainer independent={true}>
      <DrawerLayoutAndroid
          drawerWidth={250}
          drawerPosition="right"
          renderNavigationView={() => (
            <View style={styles.drawer}>
              <TouchableOpacity
                onPress={() => {
                  // Handle the menu item action
                }}
                style={styles.drawerItem}
              >
                <Text style={styles.drawerItemText}>Security</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { 
                  // Handle the menu item action
                }}
                style={styles.drawerItem}
              >
                <Text style={styles.drawerItemText}>Log Out</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // Handle the menu item action
                }}
                style={styles.drawerItem}
              >
                <Text style={styles.drawerItemText}>Privacy</Text>
              </TouchableOpacity>
            </View>
          )}
        >
      <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ flexGrow: 1 }}  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }>

        <TouchableOpacity onPress={()=>{setCoverVisible(true)}}>
        <Image
          source={userdata.Coverimage? {uri:userdata.Coverimage.assets[0].uri} : nocover}
          style={{ width: '100%', height: 200 }}
        />
        </TouchableOpacity>

        <View
          style={{
            position: 'absolute',
            top: 170,
            left: 18,
            zIndex: 2,
          }}
        >
        <TouchableOpacity onPress={()=>{setMenuVisible(true)}}>
          <Image
            source={userdata.Profileimage ? {uri:userdata.Profileimage.assets[0].uri} : noprofile}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: 'white',
            }}
          />

<View style={{
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'blue',
    borderRadius: 12,
    padding: 4,
  }}>
              <Image source={plus} style={{
    width: 16,
    height: 16,
    tintColor: 'white',
  }} />
            </View>
            </TouchableOpacity>

        </View>

        <Text style={{ marginLeft: 135, fontSize: 30, fontStyle: 'italic', fontFamily: 'Roboto' }}>{userdata.FirstName} {userdata.MiddleName} {userdata.LastName}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, marginLeft: 170 }}>
  <View style={{ backgroundColor: '#99a8a8', padding: 10, borderRadius: 11, width: 100, height: 35 }}>
    <Text style={{ fontSize: 10 }}>@{userdata.Username}</Text>
  </View>
</View>

        <View>
          <Text style={{ fontSize: 12, marginLeft: 5 }}>{userdata.Description}</Text>
          <Text style={{ fontSize: 12, marginLeft: 5, color: 'grey' }}>{'Date Joined: ' + new Date(my_data.creation_date * 1000).getDate() + ' '}{convertDate(new Date(my_data.creation_date * 1000).getMonth() + 1) + ' ' + new Date(my_data.creation_date * 1000).getFullYear()}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
  <Image style={{ width: 30, height: 30, marginRight: 10 }} source={require('./Legend.webp')} />
  <Image style={{ width: 30, height: 30, marginRight: 10 }} source={require('./verified.png')} />

</View>

        <View style={{ marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', marginLeft: 3 }}>
          {userdata.Interests.map((skill, index) => (
            <View key={index} style={{ backgroundColor: 'grey', borderRadius: 5, padding: 5, marginRight: 10, marginBottom: 10 }}>
              <Text style={{ fontSize: 12 }}>{skill}</Text>
            </View>
          ))}
        </View>
        <View style={{ marginTop: 20 }} />
        <View style={styles.carouselContainer}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Achievements</Text>
          <View style={{marginTop:15}}></View>
      <Carousel
        data={my_data.achievements}
        renderItem={renderAchievementItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth * 0.35}
        
      />
    </View>
    <SkillsBarChart skillsLevel={my_data.skills_level} />
<LeagueInfo />
        <View style={{ marginTop: 20 }} />
        <Tab.Navigator style={{minHeight:size}} >
        <Tab.Screen
  name="Posts"
  component={Posts}
  listeners={{
    tabPress: e => {
      pagesize(require('./data.json').content.length*305+40);
    }
  }}
/>
    <Tab.Screen name="Mentions" component={mentions} listeners={{
    tabPress: e => {
      pagesize(10);
    }
  }} />
        </Tab.Navigator>

        <Modal
          visible={menuVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeMenu}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
              <Pressable onPress={()=>{setMenuVisible(false);
                  navigation.navigate('viewProfile', { imageUrl: userdata.Profileimage.assets[0].uri });}} style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                <Text>View Profile Picture</Text>
              </Pressable>
              <Pressable onPress={pickProfileImage} style={{ padding: 20 }}>
                <Text>Edit Profile Picture</Text>
              </Pressable>
              <Pressable onPress={()=>{setProfilePic(null);setMenuVisible(false)}} style={{ padding: 20 }}>
                <Text style={{color:'red'}}>Remove Profile Picture</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          visible={coverVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={()=>{setCoverVisible(false)}}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
              <Pressable onPress={()=>{setCoverVisible(false);
                  navigation.navigate('viewProfile', { imageUrl: userdata.Coverimage.assets[0].uri });}} style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                <Text>View Cover Picture</Text>
              </Pressable>
              <Pressable onPress={pickCoverImage} style={{ padding: 20 }}>
                <Text>Edit Cover Picture</Text>
              </Pressable>
              <Pressable onPress={()=>{setCoverPic(null);setCoverVisible(false)}} style={{ padding: 20 }}>
                <Text style={{color:'red'}}>Remove Cover Picture</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        </ScrollView>
        </DrawerLayoutAndroid>
    </NavigationContainer>

  );
};

export default UserProfile;
