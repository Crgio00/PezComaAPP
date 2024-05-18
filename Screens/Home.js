import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = await AsyncStorage.getItem("authtoken");
        if (!token) {
          // Redireccionar al login si no hay token
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get("http://localhost:4000/api/post/", {
          headers,
        });
        setPosts(response.data);
      } catch (error) {
        console.error(error);
        alert("Error al cargar publicaciones");
      }
    };

    fetchPosts();
  }, []);

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Comentar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Publicaciones</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderPost}
        contentContainerStyle={styles.scrollContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#194547",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  postContainer: {
    backgroundColor: "#15202b",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  postTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  postContent: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#1abc9c",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default HomeScreen;
