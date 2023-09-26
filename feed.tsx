import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const FeedItem = ({ item }) => {
  const { title, content, author, skills, image } = item;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
      <Text style={styles.author}>Author: {author}</Text>
      <Text style={styles.skills}>Skills: {skills.join(', ')}</Text>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginBottom: 8,
  },
  author: {
    color: '#888',
    marginBottom: 4,
  },
  skills: {
    color: '#888',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
});

export default FeedItem;
