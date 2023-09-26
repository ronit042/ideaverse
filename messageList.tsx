import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BlinkingLiveIcon from './BlinkingLiveIcon';
// Import an image for the live streaming icon
import LiveIcon from './my_image.jpg';
import { useNavigation } from '@react-navigation/native';
const UserProfile = ({ user }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20,marginTop:20 }}>
    <Image
      source={{ uri: user.profilePic }}
      style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
    />
    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{user.profileName}</Text>
  </View>
);


const UserListItem = ({ user, handleCallPress, handleLongPress, isSelected, messageSeen, timeSeen }) => 
{
    const navigation = useNavigation();
    return(
  <TouchableOpacity onLongPress={() => handleLongPress(user)} onPress={() => navigation.navigate('message')}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: user.profilePic }}
          style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10, borderColor: user.blocked ? 'gray' : 'transparent', borderWidth: 2 }}
        />
        <Text style={{ color: user.blocked ? 'gray' : 'black' }}>{user.profileName}</Text>
      </View>
      {isSelected && (
        <Icon name="check-circle" size={20} color="green" />
      )}
      {messageSeen && (
        <Text style={{ color: 'gray', fontSize: 12 }}>{timeSeen}</Text>
      )}
      <TouchableOpacity onPress={() => handleCallPress(user)}>
        <Icon name="phone" size={20} />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
)};

const LiveTalksCircle = () => (
  <TouchableOpacity style={{ alignItems: 'center' }}>
    <View style={{flexDirection:'row'}}>
    <BlinkingLiveIcon source={require('./my_image.jpg')} />
    </View>
    <Text style={{ marginTop: 5, fontWeight: 'bold', color: 'red' }}>Live</Text>
  </TouchableOpacity>
);

const UserChatScreen = ({ user }) => (
  <View style={{ flex: 1, padding: 20 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
      <Image
        source={{ uri: user.profilePic }}
        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
      />
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{user.profileName}</Text>
    </View>
    <View style={{ flex: 1 }}>
      {/* Implement chat UI and functionality here */}
      {/* You can use a ScrollView or FlatList for displaying messages */}
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, paddingVertical: 10 }}>
      <TextInput
        style={{ flex: 1, height: 40, borderWidth: 1, paddingHorizontal: 10 }}
        placeholder="Type a message..."
        // Implement onChangeText and value for sending messages
      />
      <TouchableOpacity style={{ paddingHorizontal: 10 }}>
        <Icon name="send" size={20} color="blue" />
      </TouchableOpacity>
    </View>
  </View>
);

const CreateGroupPage = ({ selectedUsers, groupName, handleGroupNameChange, handleCreateGroup, handleCloseCreateGroup }) => {
  const handleConfirmCreateGroup = () => {
    if (groupName.trim() === '') {
      Alert.alert('Error', 'Please enter a group name.');
    } else {
      handleCreateGroup(groupName);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Create Group</Text>
      <TextInput
        style={{ height: 40, borderWidth: 1, paddingHorizontal: 10, marginBottom: 10 }}
        placeholder="Enter group name..."
        value={groupName}
        onChangeText={handleGroupNameChange}
      />

      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Selected Users</Text>
      <FlatList
        data={selectedUsers}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Image
              source={{ uri: item.profilePic }}
              style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
            />
            <Text>{item.profileName}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <Text>No selected users.</Text>
        )}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <TouchableOpacity onPress={handleCloseCreateGroup}>
          <Text style={{ color: 'red' }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleConfirmCreateGroup}>
          <Text style={{ color: 'blue' }}>Create</Text>
        </TouchableOpacity>
      </View>

      {/* Display the group name */}
      {groupName.trim() !== '' && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Group Name:</Text>
          <Text>{groupName}</Text>
        </View>
      )}
    </View>
  );
};

const MessageListPage = () => {
  const user = {
    profilePic: 'https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg',
    profileName: 'John Doe',
  };

  const initialUsers = [
    // Add users with messageSeen, timeSeen, and blocked properties
    { profilePic: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg', profileName: 'User 1', messageSeen: true, timeSeen: '1h ago', blocked: false, lastMessage: 'Hello there!' },
    { profilePic: 'https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg', profileName: 'User 2', messageSeen: false, timeSeen: null, blocked: false, lastMessage: 'How are you?' },
    { profilePic: 'https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg', profileName: 'User 3', messageSeen: true, timeSeen: '2h ago', blocked: false, lastMessage: 'Good to see you.' },
    // Add more users as needed
  ];

  const [users, setUsers] = useState(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [openChatUser, setOpenChatUser] = useState(null); // State to track open chat user
  const [groupName, setGroupName] = useState(''); // State to track the group name

  const renderItem = ({ item }) => (
    <UserListItem
      user={item}
      handleCallPress={handleCallPress}
      handleLongPress={handleLongPress}
      isSelected={selectedUsers.includes(item)}
      messageSeen={item.messageSeen}
      timeSeen={item.timeSeen}
      lastMessage={item.lastMessage}
    />
  );

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === '') {
      setUsers(initialUsers);
      setSearchResults([]);
    } else {
      const filteredUsers = initialUsers.filter((user) =>
        user.profileName.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filteredUsers);
    }
  };

  const handleCallPress = (user) => {
    const navigation=useNavigation();
    Alert.alert(
      'Call',
      `Call ${user.profileName}`,
      [
        { text: 'Voice Call', onPress: () => console.log('Voice Call pressed') },
        { text: 'Video Call', onPress: () => console.log('Video Call pressed') },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const handleLongPress = (user) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== user));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleBlockUser = () => {
    const updatedUsers = users.map((user) => {
      if (selectedUsers.includes(user)) {
        return { ...user, blocked: true };
      }
      return user;
    });
    setUsers(updatedUsers);
    setSelectedUsers([]);
  };

  const handleUnblockUser = () => {
    const updatedUsers = users.map((user) => {
      if (selectedUsers.includes(user)) {
        return { ...user, blocked: false };
      }
      return user;
    });
    setUsers(updatedUsers);
    setSelectedUsers([]);
  };

  const handleRemoveUsers = () => {
    const updatedUsers = users.filter(user => !selectedUsers.includes(user));
    setUsers(updatedUsers);
    setSelectedUsers([]);
  };

  const handleContextMenu = () => {
    // Handle context menu actions (block, unblock, remove, create group, report)
    console.log('Context menu options selected:', selectedUsers);
  };

  const handleOpenChat = (user) => {
    setOpenChatUser(user); // Set the open chat user
  };

  const handleOpenCreateGroup = () => {
    setIsCreatingGroup(true);
  };

  const handleCloseCreateGroup = () => {
    setIsCreatingGroup(false);
    setSelectedUsers([]);
    setGroupName(''); // Reset group name when closing create group
  };

  const handleGroupNameChange = (text) => {
    setGroupName(text);
  };

  const handleCreateGroup = (groupName) => {
    console.log('Creating group with name:', groupName);
    console.log('Selected users for group:', selectedUsers);
    // Add your logic to create the group here
    handleCloseCreateGroup();
  };

  const handleUserPress = (user) => {
    // Handle user selection here (if needed)
    if (selectedUsers.includes(user)) {
      handleLongPress(user); // Handle long press (selection)
    }
  };

  if (openChatUser) {
    return <UserChatScreen user={openChatUser} />;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <UserProfile user={user} />

      {/* Display the live streaming talks circle */}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
        <LiveTalksCircle />
      </View>

      <TextInput
        style={{ height: 40, borderWidth: 1, paddingHorizontal: 10, marginBottom: 10 }}
        placeholder="Search for users..."
        onChangeText={handleSearch}
        value={searchText}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <TouchableOpacity>
          <Text style={{ fontWeight: 'bold' }}>Primary</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>General</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Requests</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={searchText === '' ? users : searchResults}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <Text>No users are found.</Text>
          )}
        />
      </View>

      {selectedUsers.length > 0 && (
        <View
          style={{
            position: 'absolute',
            bottom: 60, // Adjust this value to your preference
            left: 20,
            right: 20,
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: 'white',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
            elevation: 5,
          }}>
          {selectedUsers.some(user => user.blocked) ? (
            <TouchableOpacity onPress={handleUnblockUser}>
              <Text>Tap to Unblock</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleBlockUser}>
              <Text>Block</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleRemoveUsers}>
            <Text>Remove</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleContextMenu}>
            <Text>Report</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenCreateGroup}>
            <Text>Create Group</Text>
          </TouchableOpacity>
        </View>
      )}

      {isCreatingGroup && (
        <CreateGroupPage
          selectedUsers={selectedUsers}
          groupName={groupName}
          handleGroupNameChange={handleGroupNameChange}
          handleCreateGroup={handleCreateGroup}
          handleCloseCreateGroup={handleCloseCreateGroup}
        />
      )}
    </View>
  );
};

export default MessageListPage;
