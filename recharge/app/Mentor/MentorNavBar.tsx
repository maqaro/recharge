// NavBar.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


const NavBar = () => {
      
  const router = useRouter();
  return (
      <View style={styles.navContainer}>
      
      <TouchableOpacity style={styles.navButton} onPress={() => router.navigate('/Mentor/MentorHomepage')}>
        <Ionicons name="home-outline" size={24} color="black" />
        <Text>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navButton} onPress={() => router.navigate('/Mentor/MentorViewChatrooms')}>
        <Ionicons name="chatbubble-outline" size={24} color="black" />
        <Text>Chat</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={() => router.navigate('/Mentor/MentorSettings')}>
        <Ionicons name="settings-outline" size={24} color="black" />
        <Text>Settings</Text>
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
        // borderRadius: 25,
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