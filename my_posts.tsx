import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity,ScrollView } from 'react-native';
import Header from './header';
import FeedItem from './feed';
import heart from './heart-icon.png';
import comment from './comment-png.png';
import share from './share-icon-png-2.png';
import bulb from './light_bulb.webp';
import jsonData from './data.json';
import likedheart from './liked_heart.png';
import glow from './glow.png'
const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [liked, setLiked] = useState(false);
  const [isbulb,bulbed]=useState(false);
  useEffect(() => {
    setData(jsonData.content);
  }, []);

  const handleSearchPress = () => {
    alert('Search button pressed');
  };
  const handlePostPress = () => {
    alert('Post button pressed');
  };

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
          <TouchableOpacity style={styles.interactionButton} onPress={()=>{setLiked(!liked)}}>
            <Image source={liked==false?heart:likedheart} style={styles.interactionIcon} />
            <Text>{item.likecount}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.interactionButton}>
            <Image source={comment} style={styles.interactionIcon} />
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.interactionButton}>
            <Image source={share} style={styles.interactionIcon} />
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.interactionButton} onPress={()=>{bulbed(!isbulb)}}>
            <Image source={isbulb==false?bulb:glow} style={styles.interactionIcon} />
            <Text>{item.bulb_count}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );


  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={renderFeedItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  feedItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
