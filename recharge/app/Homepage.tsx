// Homepage.tsx
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';


export default function Homepage() {
    const router = useRouter();
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.square}
            onPress={() => router.navigate('/Trackers')}
          >
            <Text style={styles.text}>Trackers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.square}
            //onPress={() => ........
          >
            <Text style={styles.text}>Daily Journal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.square}
            //onPress={() => .........
          >
            <Text style={styles.text}>Mentor Match</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.square}
            //onPress={() => ........
          >
            <Text style={styles.text}>Mental Health Resources</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.square}
            //onPress={() => h........
          >
            <Text style={styles.text}>Exercise Routines</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.square}
            //onPress={() => ..........
          >
            <Text style={styles.text}>Additonal Resources</Text>
          </TouchableOpacity>
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
    square: {
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



