import React, { useState, useRef, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { RNCamera } from 'react-native-camera';

import {
  View,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
} from 'react-native';
import * as Permissions from 'expo-permissions';

import { Avatar, IconButton, List, Divider, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import {
  startRecorder,
  stopRecorder,
  startPlayer,
  stopPlayer,
} from 'react-native-audio-recorder-player';
import ViewShot from 'react-native-view-shot';
import * as ScreenCapture from 'expo-screen-capture';

// Prevent screenshots
async function preventScreenshots() {
  await ScreenCapture.preventScreenCaptureAsync();
}

// Allow screenshots
async function allowScreenshots() {
  await ScreenCapture.allowScreenCaptureAsync();
}

const MessagePage = ({ navigation }) => {
  useEffect(() => {
    // Request camera and microphone permissions here
    requestCameraAndMicrophonePermissions();
  }, []);
  useEffect(() => {
    preventScreenshots();
  }, []);

  const requestCameraAndMicrophonePermissions = async () => {
    const { status: cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
    const { status: microphoneStatus } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);

    if (cameraStatus === 'granted' && microphoneStatus === 'granted') {
      console.log('Camera and microphone permissions granted');
    } else {
      console.log('Camera and/or microphone permissions denied');
    }
  };
  const viewShotRef = useRef(null);
  const [visible,setvisible]=useState(false);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUri, setAudioUri] = useState(null);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const [expandedProfilePic, setExpandedProfilePic] = useState(false);
  const [expandedProfilePicUri, setExpandedProfilePicUri] = useState(null);

  
  const renderMessage = ({ item }) => (
 
    <List.Item
      title={item.sender}
      description={item.text}
      descriptionNumberOfLines={10}
      onLongPress={()=>setvisible(true)}
      right={() => (
        <Text style={{ color: '#000000', fontSize: 12 }}>
          {formatTimestamp(item.timestamp)}
        </Text>
      )}
      left={() => (
        <TouchableOpacity onPress={() => handleExpandProfilePic(item.sender)}>
          <Avatar.Text size={40} label={item.sender[0]} />
        </TouchableOpacity>
      )}
    >
      {/* Render the image if available */}
      {item.imageUri && (
        <Image
          source={{ uri: item.imageUri }}
          style={{ width: 100, height: 100 }}
          resizeMode="cover"
        />
      )}
    </List.Item>
  );


  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  const sendMessage = () => {
    if (messageText.trim() === '' && !audioUri) {
      return;
    }

    const newMessage = {
      sender: 'User1',
      text: messageText,
      timestamp: new Date().toISOString(),
      isSent: true,
      imageUri: null,
      documentUri: null,
      audioUri: audioUri,
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
    setAudioUri(null);
  };

  const handleVoiceCall = () => {
    requestCameraAndMicrophonePermissions();
    navigation.navigate('calling');
    console.log('Initiating voice call...');
  };

  const handleVideoCall = () => {
    navigation.navigate('videocalling');
    console.log('Initiating video call...');
  };

  const handleOpenGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        const newMessage = {
          sender: 'User1',
          text: '',
          timestamp: new Date().toISOString(),
          isSent: true,
          imageUri: result.assets[0].uri,
          documentUri: null,
          audioUri: null,
        };

        setMessages([...messages, newMessage]);
      }
    } catch (error) {
      console.error('Error opening gallery:', error);
    }
  };

  const handleOpenDocumentPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();

      if (!result.cancelled) {
        const newMessage = {
          sender: 'User1',
          text: '',
          timestamp: new Date().toISOString(),
          isSent: true,
          imageUri: result.assets[0].uri,
          documentUri: result.uri,
          audioUri: null,
        };

        setMessages([...messages, newMessage]);
      }
    } catch (error) {
      console.error('Error opening document picker:', error);
    }
  };

  const startRecording = async () => {
    try {
      setIsRecording(true);
      await startRecorder();
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      const uri = await stopRecorder();
      setAudioUri(uri);
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  const playAudio = async () => {
    try {
      if (!isPlaying && audioUri) {
        setIsPlaying(true);
        await startPlayer(audioUri);
      } else {
        setIsPlaying(false);
        await stopPlayer();
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const handleExpandProfilePic = (sender) => {
    console.log('Expanding profile picture for', sender);
    setExpandedProfilePic(true);
    setExpandedProfilePicUri(
      'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg'
    ); // Replace with the actual profile picture URI
  };

  const handleCloseExpandedProfilePic = () => {
    setExpandedProfilePic(false);
    setExpandedProfilePicUri(null);
  };

  const handleProfileOptions = () => {
    setShowProfileOptions(true);
  };

  const closeProfileOptions = () => {
    setShowProfileOptions(false);
  };

  const handleOpenWallpaperPicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedWallpaper(result.uri);
      }
    } catch (error) {
      console.error('Error opening wallpaper picker:', error);
    }
  };

  const handleRemoveWallpaper = () => {
    setSelectedWallpaper(null);
  };
  const [selectedMessageToDelete, setSelectedMessageToDelete] = useState(null);
  const handleDeleteMessageForEveryone = () => {
    if (selectedMessageToDelete) {
      const updatedMessages = messages.filter(item => item !== selectedMessageToDelete);
      setMessages(updatedMessages);
    }
    setvisible(false); // Close the modal after deleting the message
    setSelectedMessageToDelete(null); // Clear the selected message
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <View style={{ flex: 1 }}>
        {selectedWallpaper && (
          <Image
            source={{ uri: selectedWallpaper }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height, // Adjust height as needed
            }}
            resizeMode="cover"
          />
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
          <Avatar.Text size={40} label="U1" style={{ marginTop: 32 }} />
          <View style={{ marginLeft: 10, flexDirection: 'row', alignItems: 'center', marginTop: 28 }}>
            <Text style={{ fontWeight: 'bold' }}>User 1</Text>
            <IconButton icon="phone" size={24} color="#007AFF" onPress={handleVoiceCall} style={{ marginLeft: 90 }} />
            <IconButton
              icon="video"
              size={24}
              color="#000000"
              onPress={handleVideoCall}
              style={{ marginLeft: 10 }}
            />
            <IconButton
              icon="dots-vertical"
              size={24}
              color="#000000"
              onPress={handleProfileOptions}
              style={{ marginLeft: 'auto' }}
            />
          </View>
        </View>
        <ScrollView>
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
        <View style={{ flexDirection: 'column', paddingHorizontal: 10 }}>
          <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#000000',
                  borderRadius: 5,
                  padding: 5,
                  marginRight: 10,
                }}
                value={messageText}
                onChangeText={setMessageText}
                onSubmitEditing={sendMessage}
                multiline
              />
              <IconButton icon="send" size={24} color="#000000" onPress={sendMessage} />
              <TouchableOpacity onPress={handleOpenGallery}>
                <IconButton icon="image" size={24} color="#000000" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleOpenDocumentPicker}>
                <IconButton icon="file" size={24} color="#000000" />
              </TouchableOpacity>
              <IconButton
                icon={isRecording ? 'stop-circle' : 'microphone'}
                size={24}
                color={isRecording ? 'red' : '#007AFF'}
                onPress={isRecording ? stopRecording : startRecording}
              />
              {audioUri && (
                <IconButton
                  icon={isPlaying ? 'stop-circle' : 'play-circle'}
                  size={24}
                  color={isPlaying ? 'red' : '#007AFF'}
                  onPress={playAudio}
                />
              )}
            </View>
          </ViewShot>
        </View>
      </View>
      <Modal visible={showProfileOptions} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Button icon="volume-off" mode="text" onPress={() => {}}>
              Mute Notifications
            </Button>
            <Divider style={{ marginVertical: 10 }} />
            {selectedWallpaper ? (
              <React.Fragment>
                <Button icon="wallpaper" mode="text" onPress={handleRemoveWallpaper}>
                  Remove Wallpaper
                </Button>
                <Divider style={{ marginVertical: 10 }} />
              </React.Fragment>
            ) : null}
            <Button icon="wallpaper" mode="text" onPress={handleOpenWallpaperPicker}>
              Set Wallpaper
            </Button>
            <Divider style={{ marginVertical: 10 }} />
            <Button icon="close" mode="text" onPress={closeProfileOptions}>
              Close
            </Button>
          </View>
        </View>
      </Modal>
      <Modal visible={expandedProfilePic} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
          <TouchableOpacity onPress={handleCloseExpandedProfilePic}>
            <Image
              source={{ uri: expandedProfilePicUri }}
              style={{
                width: Dimensions.get('window').width * 0.8,
                height: Dimensions.get('window').width * 0.8, // Adjust size as needed
                borderRadius: 10,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal visible={visible} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Button onPress={handleDeleteMessageForEveryone}>
              Delete for Everyone
            </Button>
            <Button>
              Delete for me
            </Button>
            <Button icon="close" mode="text" onPress={()=>setvisible(false)}>
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default MessagePage;
