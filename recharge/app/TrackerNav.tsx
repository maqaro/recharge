import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Homepage from './Homepage';
import Settings from './Settings';
import Chats from './Chats';
import Friends from './Friends';
import LeaderBoard from './LeaderBoard';
import { router } from 'expo-router';
const Tab = createBottomTabNavigator();


const TrackerNav: React.FC = () => {
    return (
        <View style={styles.navContainer}>
        <TouchableOpacity style={styles.navButton} onPress={() => router.navigate('/Homepage')}>
          <Ionicons name="home-outline" size={24} color="black" />
          <Text>Home</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.navButton} onPress={() => router.navigate('/Settings')}>
          <Ionicons name="settings-outline" size={24} color="black" />
          <Text>Settings</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.navButton} onPress={() => router.navigate('/Chat')}>
          <Ionicons name="chatbubbles-outline" size={24} color="black" />
          <Text>Chat</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.navButton} onPress={() => router.navigate('/Friends')}>
          <Ionicons name="people-outline" size={24} color="black" />
          <Text>Friends</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.navButton} onPress={() => router.navigate('/Leaderboard')}>
          <Ionicons name="trophy-outline" size={24} color="black" />
          <Text>Leaderboard</Text>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
    navContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
    },
    navButton: {
      alignItems: 'center',
    },
});

export default TrackerNav;