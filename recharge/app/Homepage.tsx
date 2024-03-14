// Homepage.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';


export default function Homepage() {
    const router = useRouter();
    return (
        <View style={styles.container}>
          <LinearGradient colors={['#1a7373', '#e37b60']} style={{height:'100%', width:'100%'}}>
          <TouchableOpacity
            style={styles.square1}
            onPress={() => router.navigate('/Trackers')}
          >
            <Text style={styles.text}>Trackers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.square2}
            //onPress={() => ........
          >
            <Text style={styles.text}>Daily Journal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.square3}
            //onPress={() => .........
          >
            <Text style={styles.text}>Mentor Match</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.square4}
            //onPress={() => ........
          >
            <Text style={styles.text}>Mental Health Resources</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.square5}
            //onPress={() => h........
          >
            <Text style={styles.text}>Exercise Routines</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.square6}
            //onPress={() => ..........
          >
            <Text style={styles.text}>Additonal Resources</Text>
          </TouchableOpacity>
        </LinearGradient>
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    square1: {
      width: '45%',
      aspectRatio: 1, // Square aspect ratio
      margin: '2.5%', // Adjust as needed
      backgroundColor: 'lightblue',
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    square2: {
      width: '45%',
      aspectRatio: 1, // Square aspect ratio
      margin: '2.5%', // Adjust as needed
      backgroundColor: 'lightblue',
      justifyContent: 'center',
      alignItems: 'center',
    },

    square3: {
      width: '45%',
      aspectRatio: 1, // Square aspect ratio
      margin: '2.5%', // Adjust as needed
      backgroundColor: 'lightblue',
      justifyContent: 'center',
      alignItems: 'center',
    },

    square4: {
      width: '45%',
      aspectRatio: 1, // Square aspect ratio
      margin: '2.5%', // Adjust as needed
      backgroundColor: 'lightblue',
      justifyContent: 'center',
      alignItems: 'center',
    },

    square5: {
      width: '45%',
      aspectRatio: 1, // Square aspect ratio
      margin: '2.5%', // Adjust as needed
      backgroundColor: 'lightblue',
      justifyContent: 'center',
      alignItems: 'center',
    },

    square6: {
      width: '45%',
      aspectRatio: 1, // Square aspect ratio
      margin: '2.5%', // Adjust as needed
      backgroundColor: 'lightblue',
      justifyContent: 'center',
      alignItems: 'center',
    },

    text: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });



