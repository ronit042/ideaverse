import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { Video } from 'expo-av';
import heart from './white_heart.png';
import comment from './white_comment.png';
import share from './white_share.png';
import bulb from './white_bulb.png';
import likedheart from './liked_heart.png';
import glow from './glow.png';
import { RefreshControl } from 'react-native';
const Homepage = ({navigation}) => {
  const [liked, setLiked] = useState(false);
  const [isbulb, bulbed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videos = ['http://videocdn.bodybuilding.com/video/mp4/62000/62792m.mp4','http://videocdn.bodybuilding.com/video/mp4/62000/62792m.mp4'];
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
      setTimeout(() => {
      setRefreshing(false);
      navigation.navigate('Reels');
    }, 1000);
  };
const onshortpress=()=>{
  setIsMuted(!isMuted);
}
const onlongpress=()=>{
  setIsPlaying(!isPlaying);
}
  const onIndexChanged = (index) => {
    setCurrentIndex(index);
  };

  const handlePlaybackStatusUpdate = (status) => {
    if (!status.isPlaying && status.didJustFinish) {
      setIsPlaying(false);
    }
    setIsMuted(!isFocused); 
  };

  useEffect(() => {
    setIsPlaying(true);
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Swiper
        showsButtons={false}
        horizontal={false}
        showsPagination={false}
        onIndexChanged={onIndexChanged}
        loop={false}
        index={currentIndex}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {videos.map((video, index) => (
          <View key={index} style={styles.slide}>
            <TouchableWithoutFeedback onPress={onshortpress} onLongPress={onlongpress}>
            <Video
              style={styles.backgroundVideo}
              source={{uri:video}}
              shouldPlay={isPlaying && currentIndex === index}
              isMuted={isMuted}
              resizeMode="cover"
              isLooping={true}
              onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            />
            </TouchableWithoutFeedback>
            <View style={styles.overlay}>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => setLiked(!liked)}>
                  <Image source={liked ? likedheart : heart} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.textdes}>234</Text>
                <TouchableOpacity onPress={() => bulbed(!isbulb)}>
                  <Image source={isbulb ? glow : bulb} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.textdes}>200</Text>
                <Image source={comment} style={styles.icon} />
                <Text style={styles.textdes}>5</Text>
                <Image source={share} style={styles.icon} />
              </View>
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    width: '100%',
    height: '100%',
  },
  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: '100%',
    marginBottom: 60,
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 15,
  },
  textdes: {
    width: 30,
    height: 30,
    marginTop: -2,
    color: 'white',
    alignItems: 'center',
  },
});

export default Homepage;
