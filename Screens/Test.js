import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native'; 
import axios from 'axios'; // Assuming you're using axios for API requests
import AsyncStorage from '@react-native-async-storage/async-storage'; // Assuming you're using AsyncStorage for token storage

const TestScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = await AsyncStorage.getItem('authtoken');
        if (!token) {
          // Handle case where no token is found (e.g., redirect to login)
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get('http://localhost:4000/api/post/', {
          headers,
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Handle errors (e.g., display an error message)
      }
    };

    fetchPosts(); // Call the function on component mount
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.postItem}>
      {Object.keys(item).map((key) => (
        <Text key={key}>
          {key}: {item[key]}
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id} // Assuming posts have unique IDs
          style={styles.postList}
        />
      ) : (
        <Text>No posts found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  postList: {
    flex: 1,
  },
  postItem: {
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingBottom: 10,
  },
});

export default TestScreen;
