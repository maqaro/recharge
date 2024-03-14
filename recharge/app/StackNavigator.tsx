// StackNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavBar from './NavBar';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={NavBar}
        options={{ headerShown: false }} // Optionally hide the header
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
