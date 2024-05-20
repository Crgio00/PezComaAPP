import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
        }
      );

      const token = response.data;
      console.log(response);
      await AsyncStorage.setItem("authtoken", token);
      
      navigation.navigate('Test');
      
    } catch (error) {
      console.error(error);
      alert("Error al iniciar sesión"); // Mostrar mensaje de error al usuario
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Iniciar sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={email}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Ingresar" onPress={handleLogin} color="#1abc9c" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#194547",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#15202b",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    color: "white",
  },
});

export default LoginScreen;
