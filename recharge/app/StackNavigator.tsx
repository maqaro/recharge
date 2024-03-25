// StackNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TrackerFooter from './TrackerFooter';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={TrackerFooter}
        options={{ headerShown: false }} // Optionally hide the header
      />
      
    </Stack.Navigator>
  );
};

export default StackNavigator;
