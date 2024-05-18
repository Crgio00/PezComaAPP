import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./Screens/Login";
import HomeScreen from "./Screens/Home";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      await checkAuth();
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("authtoken");
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error("Error al verificar el token:", error);
      setIsAuthenticated(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const AuthStack = createStackNavigator();
  const LoginStack = createStackNavigator();

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AuthStack.Navigator>
          <AuthStack.Screen name="Home" component={HomeScreen} />
          {/* Add other authenticated screens here */}
        </AuthStack.Navigator>
      ) : (
        <LoginStack.Navigator>
          <LoginStack.Screen name="Login" component={LoginScreen} />
        </LoginStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
