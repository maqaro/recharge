// NavBar.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Tracker from './Trackers';
import Exercise from './ExerciseTracker';
import Water from './WaterTracker';
import Sleep from './SleepTracker';
import Emotion from './EmotionTracker';
import Diet from './MealSearch';

const Tab = createBottomTabNavigator();

const TrackerFooter = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Tracker} options={{tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />),}}/>
      <Tab.Screen name="Exercise" component={Exercise} options={{tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy-outline" size={size} color={color} />),}}/>
      <Tab.Screen name="Water" component={Water} options={{tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy-outline" size={size} color={color} />),}}/>
      <Tab.Screen name="Sleep" component={Sleep} options={{tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy-outline" size={size} color={color} />),}}/>
      <Tab.Screen name="Emotion" component={Emotion} options={{tabBarIcon: ({ color, size }) => (
            <Ionicons name= "trophy-outline" size={size} color={color} />),}}/>
       <Tab.Screen name="Diet" component={Diet} options={{tabBarIcon: ({ color, size }) => (
            <Ionicons name= "trophy-outline" size={size} color={color} />),}}/>
       <Tab.Screen name="Journal" component={Tracker} options={{tabBarIcon: ({ color, size }) => (
            <Ionicons name= "trophy-outline" size={size} color={color} />),}}/>
    </Tab.Navigator>
  );
};

export default TrackerFooter;