import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

import heart from './heart-icon.png';
import comment from './comment-png.png';
import share from './share-icon-png-2.png';
import bulb from './light_bulb.webp';
import jsonData from './data.json';
import likedheart from './liked_heart.png';
import glow from './glow.png';
import profile_logo from './my_image.jpg';


export default ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [liked, setLiked] = useState(false);
  const [isbulb, setBulbed] = useState(false);

  const handlePost = async() => {
    if (title && content) {
      alert('New post created!');
      const newPost = {
        title:title,
        content:content,
        "author":"Priyanshu",
        "date":"12/12/2019",
        "skills":["data science","ml"],
        "likecount":500,
        "comments":["nice","good"],
        "bulb_count":123,
        "comment":[{"auth_image:":"https://cdn.discordapp.com/avatars/741280410180386947/97ddc40395dfa5312cdbf02f4da07d7a.png?size=1024","author":"Priyanshu","content":"nice"},{"auth_image:":"https://cdn.discordapp.com/avatars/741280410180386947/97ddc40395dfa5312cdbf02f4da07d7a.png?size=1024","author":"Priyanshu","content":"nice"},{"auth_image:":"https://cdn.discordapp.com/avatars/741280410180386947/97ddc40395dfa5312cdbf02f4da07d7a.png?size=1024","author":"Priyanshu","content":"nice"}],
        "contains_image":selectedImage?true:false,
        "image":selectedImage?selectedImage:null,
        "auth_image":"https://cdn.discordapp.com/avatars/619474506381000706/e0060cfb201dc12a11725138b305529d.png?size=1024"
      }
      try {
        const response = await axios.post('http://13.53.200.185:3000/newposts', newPost);
        if (response.status === 200) {
          alert('New post created!');
          setSelectedImage(null);
          setTitle('');
          setContent('');
          navigation.goBack();
        } else {
          alert('Failed to create post.');
        }
      } catch (error) {
        console.error('Error creating post:', error);
        alert('An error occurred while creating the post.');
      }
    } else {
      alert('Please fill in both title and content.');
    }
  };
  const handleRemoveImage = () => {
    setSelectedImage(null);
  };
  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Permission to access media library was denied.');
      return;
    }
   
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={{ marginTop: 70 }}></View>
      <Text style={styles.heading}>New Post</Text>


      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Content"
        multiline
        numberOfLines={4}
        value={content}
        onChangeText={(text) => setContent(text)}
      />

      <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePicker}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>


      <View style={styles.previewContainer}>
  <Text style={styles.previewHeading}>Preview</Text>
  <View style={styles.feedHeader}>
          <Image source={profile_logo} style={styles.feedImage} />
          <Text style={styles.feedAuthor}>Priyanshu</Text>
        </View>
  {title && (
    <View>
      <Text style={styles.previewTitle}>{title}</Text>
      <Text style={styles.previewContent}>{content}</Text>
      {selectedImage && (
        <>
        <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        <TouchableOpacity onPress={handleRemoveImage}>
        <Text style={{color:'red'}}>Remove Image</Text>
        </TouchableOpacity>
        </>
      )}

      <View style={styles.interactionContainer}>
        <TouchableOpacity style={styles.interactionButton} onPress={() => setLiked(!liked)}>
          <Image source={liked == false ? heart : likedheart} style={styles.interactionIcon} />
          <Text>23</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionButton}>
          <Image source={comment} style={styles.interactionIcon} />
          <Text></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionButton}>
          <Image source={share} style={styles.interactionIcon} />
          <Text></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionButton} onPress={() => setBulbed(!isbulb)}>
          <Image source={isbulb == false ? bulb : glow} style={styles.interactionIcon} />
          <Text>50</Text>
        </TouchableOpacity>
      </View>
    </View>
  )}
</View>
<TouchableOpacity style={styles.button} onPress={handlePost}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};


const styles = StyleSheet.create({

  previewContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  previewHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  previewContent: {
    fontSize: 14,
    marginBottom: 5,
  },
  previewImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
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
  container: {
    
    justifyContent: 'center', // Center content vertically
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imagePickerButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  selectedImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});