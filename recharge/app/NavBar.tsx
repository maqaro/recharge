// NavBar.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


const NavBar = () => {
      
  const router = useRouter();
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

      <TouchableOpacity style={styles.navButton} onPress={() => router.navigate('/ViewChatrooms')}>
        <Ionicons name="chatbubble-outline" size={24} color="black" />
        <Text>Chat</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={() => router.navigate('/Friends')}>
        <Ionicons name="people-outline" size={24} color="black" />
        <Text>Friends</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={() => router.navigate('/LeaderBoard')}>
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
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: '#fff',
        borderRadius: 25,
        bottom: 0,
        left: 0,
        right: 0,
      },
      navButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 0,
        alignItems: 'center',
      },
});
    


export default NavBar;