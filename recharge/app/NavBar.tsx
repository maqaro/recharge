// NavBar.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Homepage from './Homepage';
import Settings from './Settings';
import Chats from './Chats';
import Friends from './Friends';
import LeaderBoard from './LeaderBoard';

const Tab = createBottomTabNavigator();

const NavBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Homepage} options={{tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />),}}/>
      <Tab.Screen name="Settings" component={Settings} options={{tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />),}}/>
      <Tab.Screen name="Chat" component={Chats} options={{tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" size={size} color={color} />),}}/>
      <Tab.Screen name="Friends" component={Friends} options={{tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />),}}/>
      <Tab.Screen name="Leaderboard" component={LeaderBoard} options={{tabBarIcon: ({ color, size }) => (
            <Ionicons name= "trophy-outline" size={size} color={color} />),}}/>
    </Tab.Navigator>
  );
};

export default NavBar;