import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ConferencePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const users = [
    { id: '1', name: 'User 1' },
    { id: '2', name: 'User 2' },
    { id: '3', name: 'User 3' },
    // ...add more users
  ];

  const handleSearch = () => {
    // Implement search logic
  };

  const handleUserSelect = (user) => {
    if (!selectedUsers.includes(user)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Users"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <View style={styles.addUsersContainer}>
        <Text>Add Users to Conference:</Text>
        {users.map((user) => (
          <TouchableOpacity
            key={user.id}
            style={styles.userButton}
            onPress={() => handleUserSelect(user)}
          >
            <Text>{user.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.selectedUsersContainer}>
        <Text>Selected Users:</Text>
        <FlatList
          data={selectedUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        />
      </View>
      {/* Implement the "Start Conference" button here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addUsersContainer: {
    marginBottom: 20,
  },
  userButton: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  selectedUsersContainer: {
    marginBottom: 20,
  },
});

export default ConferencePage;
