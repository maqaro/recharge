// Homepage.tsx

import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';


const MatchWithMentor = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [noOfMentors, setNoOfMentors] = useState(0);

    return (
        <View style={styles.container}>
          <LinearGradient colors={['#1a7373', '#e37b60']} style={{height:'100%', width:'100%'}}>
            <View>
                <Text style={styles.text}>Welcome {username}</Text>
                <Text style={styles.text}>You are currently matched with {noOfMentors}</Text>
            </View>
          <TouchableOpacity
            style={styles.square1}
            onPress={() => router.navigate('./MatchWithMentorForm')}
          >
            <Text style={styles.text}>Match with new Mentor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.square2}
            onPress={() => router.navigate('./ViewMentors')}
          >
            <Text style={styles.text}>View Existing Mentor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.square3}
            onPress={() => router.navigate('./ViewChatrooms')}
          >
            <Text style={styles.text}>View Chat Rooms</Text>
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

  export default MatchWithMentor;