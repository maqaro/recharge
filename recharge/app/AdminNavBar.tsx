// NavBar.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


const AdminNavBar = () => {
      
  const router = useRouter();
  return (
    <View style={styles.navContainer}>
      <TouchableOpacity style={styles.navButton} onPress={() => router.navigate('/AdminHomepage')}>
      <Ionicons name="home-outline" size={26} color="black" />
        <Text style={styles.hometext}>Home</Text>
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
      backgroundColor: 'lightblue',
      borderRadius: 25,
      bottom: 5,
      left: 0,
      right: 0,
      },
  navButton: {
      backgroundColor: 'lightblue',
      padding: 2,
      borderRadius: 25,
      alignItems: 'center',
    },
      
  hometext: {
    fontSize: 12,
    color: 'black',
    paddingTop: 3,
    textAlign: 'center',
    left: -1,
  },
});
    


export default AdminNavBar;