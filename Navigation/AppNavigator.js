import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'; // Import React for functional components

import LoginScreen from '../Screens/Login';
import TestScreen from '../Screens/Test';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialScreen="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Test" component={TestScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
