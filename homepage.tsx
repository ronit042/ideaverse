import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity,ScrollView,Modal,DrawerLayoutAndroid,TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Header from './header';
import FeedItem from './feed';
import heart from './heart-icon.png';
import comment from './comment-png.png';
import share from './share-icon-png-2.png';
import bulb from './light_bulb.webp';
import likedheart from './liked_heart.png';
import glow from './glow.png'
import { RefreshControl } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
const Stack = createStackNavigator();
import { BackHandler } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as ScreenCapture from 'expo-screen-capture';
import { AppState } from 'react-native';
async function preventScreenshots() {
  await ScreenCapture.preventScreenCaptureAsync();
}

// Allow screenshots
async function allowScreenshots() {
  await ScreenCapture.allowScreenCaptureAsync();
}

const DrawerContentScreen = () => {
  return (
    <View >
      {/* Add your drawer content here */}
      <Text>Drawer Content</Text>
    </View>
  );
};

const Drawer = createDrawerNavigator(); // Create the drawer navigator

// Define the Home screen component
const commentrender = ({ item }) => {
  return (
    <TouchableOpacity onPress={()=>{}}>
    <View style={styles.commentContainer}>
      <View style={styles.commentAuthorContainer}>
        <Image source={{ uri: item['auth_image:']}} style={styles.commentAuthorImage} />
        <Text style={styles.commentAuthorName}>{item.author}</Text>
      </View>
      <Text style={styles.commentText}>{item.content}</Text>
    </View>
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    preventScreenshots()
  }, []);
  const isFocused = useIsFocused(); // Check if the screen is currently focused
  const [selectedItemComments, setSelectedItemComments] = useState([]);
  const handleShare = async () => {
    const imageUrl = 'https://www.seiu1000.org/sites/main/files/imagecache/hero/main-images/camera_lense_0.jpeg'; // Replace with the actual image URL
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const handleSearchPress = () => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = data.filter(item => item.author.toLowerCase().includes(lowerCaseQuery));
      setFilteredData(filtered);
    };
    try {
      const shareOptions = {
        mimeType: 'image/jpeg', // Specify the MIME type of the image
        url: imageUrl,
      };

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(shareOptions);
      } else {
        console.log('Sharing is not available on this device.');
      }
    } catch (error) {
      console.log('Error sharing:', error.message);
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isFocused) {
        // Do nothing to prevent the app from navigating back
        return true;
      }
      return false; // Allow back navigation on other screens
    });

    return () => backHandler.remove();
  }, [isFocused]);

  
  
  

  const apiUrl = 'http://13.53.200.185:3000/posts';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      
      const response = await axios.get(apiUrl);
      const modifiedData = response.data.content.map(item => ({
        ...item,
        liked: false,
        bulbed:false, // Add a property to track liked status
      }));
      setData(modifiedData);


    

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const [refreshing, setRefreshing] = useState(false);
 
  const onRefresh = () => {
    setRefreshing(true);
      setTimeout(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(apiUrl);
            const modifiedData = response.data.content.reverse().map(item => ({
              ...item,
              liked: false,
              bulbed: false,
            }));
            setData(modifiedData);
          } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error, show a message to the user, etc.
          }
        };
fetchData();        
      setRefreshing(false);
      navigation.navigate('Home1');
    }, 1000);
  };
  const [data, setData] = useState([]);
  const [liked, setLiked] = useState(false);
  const [isbulb,bulbed]=useState(false);
  const [commentInput, setCommentInput] = useState("");
  const handleSearchPress = () => {
    alert('Search button pressed');
  };
  const handlePostPress = () => {
    alert('Post button pressed');
  };
  const [visible, setVisible] = useState(false);
  const renderFeedItem = ({ item }) => (
    
    <>
      <View style={styles.feedItem}>
      <TouchableOpacity onPress={() => handlePostPress}>
        <View style={styles.feedHeader}>
          <Image source={{ uri: item.auth_image }} style={styles.feedImage} />
          <Text style={styles.feedAuthor}>{item.author}</Text>
        </View>
        <Text style={styles.feedTitle}>{item.title}</Text>
        <Text style={styles.feedContent}>{item.content}</Text>
        {item.contains_image &&<Image source={{ uri: item.image }} style={{ width: '100%', height: 200 }} />}
    </TouchableOpacity>
    
        <View style={styles.interactionContainer}>
          <TouchableOpacity style={styles.interactionButton} onPress={()=>{    const newData = data.map(dataItem => {
          if (dataItem.id === item.id) {
            return { ...dataItem, liked: !dataItem.liked };
          }
          return dataItem;
        });
        setData(newData);}}>
            <Image  source={item.liked ? likedheart : heart} style={styles.interactionIcon} />
            <Text>{item.likecount}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.interactionButton} onPress={()=>{setVisible(true);        setSelectedItemComments(item.comment);
}}>
            <Image source={comment} style={styles.interactionIcon} />
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity
  style={styles.interactionButton}
  onPress={handleShare}
>
  <Image source={share} style={styles.interactionIcon} />
  <Text></Text>
</TouchableOpacity>

          <TouchableOpacity style={styles.interactionButton} onPress={()=>{
           const newData = data.map(dataItem => {
            if (dataItem.id === item.id) {
              return { ...dataItem, bulbed: !dataItem.bulbed };
            }
            return dataItem;
          });
          setData(newData);
          }}>
            <Image source={item.bulbed==false?bulb:glow} style={styles.interactionIcon} />
            <Text>{item.bulb_count}</Text>
          </TouchableOpacity>
          
        </View>
        
      </View>
    </>
  );


  return (
    <DrawerLayoutAndroid
    drawerWidth={250}
    drawerPosition="right"
    renderNavigationView={() => (
      <View style={styles.drawer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('settingprivacy');          }}
          style={styles.drawerItem}
        >
          <Text style={styles.drawerItemText}>Secuirity & Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // Handle the menu item action
          }}
          style={styles.drawerItem}
        >
          <Text style={styles.drawerItemText}>Favourites</Text>
          
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // Handle the menu item action
          }}
          style={styles.drawerItem}
        >
          <Text style={styles.drawerItemText}>Recent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // Handle the menu item action
          }}
          style={styles.drawerItem}
        >
          <Text style={styles.drawerItemText}>Blocked</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home2');
            // Handle the menu item action
          }}
          style={styles.drawerItem}
        >
          <Text style={styles.drawerItemText1}>Log Out</Text>
        </TouchableOpacity>
      </View>
    )}
  >
    <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <Header onSearchPress={handleSearchPress} />
      
      <FlatList
        data={data}
        renderItem={renderFeedItem}
        keyExtractor={(item, index) => index.toString()}
      />
<Modal visible={visible} transparent={true} animationType='slide'>
  <View style={{ flex: 1 }}>
    <View style={styles.commentModalContainer}>
      <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <FlatList
        data={selectedItemComments}
        renderItem={commentrender}
        keyExtractor={(item, index) => index.toString()}
      />
        <TextInput
    style={styles.commentInput}
    placeholder="Add a comment..."
    onChangeText={text => setCommentInput(text)}
    value={commentInput}
    underlineColorAndroid="transparent"
  />
  {/* Send Icon */}
  <TouchableOpacity
    style={styles.sendCommentButton}
  >
    <Image source={require('./send-icon.png')} style={styles.sendCommentIcon} />
  </TouchableOpacity>
    </View>
  </View>
</Modal>

    </ScrollView>
    </DrawerLayoutAndroid>
  );
};


const styles = StyleSheet.create({
  sendCommentButton: {
    position: 'absolute',
    right: 15,
    bottom: 20,
  },
  sendCommentIcon: {
    width: 25,
    height: 25,
    tintColor: '#007AFF', // Change the color as needed
  },
  commentInput: {
    borderColor: 'transparent', // Hide the border
    borderBottomColor: '#ccc', // Add a new border bottom color
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingBottom: 5, // Adjust the padding as needed
  },  
  modalOverlay: {
    flex: 1,
  },
  addCommentButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addCommentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },

    drawer: {
      flex: 1,
      backgroundColor: '#fff',
    },
    commentModalContainer: {
      maxHeight: '100%', // Adjust this value as needed to control the modal height
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 15,
      alignSelf: 'flex-end', // Align the modal to the bottom
  position: 'absolute', // Make the modal position absolute
  bottom: 0, // Position the modal at the bottom
    },
    drawerItemText: {
      fontSize: 16,
      paddingVertical: 15,
      paddingHorizontal: 20,
    },
    drawerItemText1: {
      fontSize: 16,
      color:'red',
      paddingVertical: 15,
      paddingHorizontal: 20,
    },
  feedItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  drawerItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  feedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  feedImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  feedAuthor: {
    fontWeight: 'bold',
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  feedContent: {
    fontSize: 16,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  commentAuthorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentAuthorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentAuthorName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  commentText: {
    fontSize: 16,
  },
  interactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionIcon: {
    width: 21,
    height: 22,
    marginRight: 5,
  },
});

export default HomeScreen;