import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import NavBar from './NavBar';


const MatchWithMentor = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [noOfMentors, setNoOfMentors] = useState(0);

    return (
        <View style={styles.container}>
          <LinearGradient colors={['#eccbaa', '#65AAB3']} style={{height:'100%', width:'100%'}}>
            <View>
                <Text style={styles.header}>Welcome {username}</Text>
                <Text style={styles.intro}>This page offers a supportive environment for {'\n'}discussing mental health and personal concerns {'\n'}with dedicated mentors. 
                  Connect with empathetic listeners to share experiences, gain insights, and find encouragement. Break the stigma and embrace a 
                  community of support. You're not alone – let's talk.</Text>
                <Text style={styles.subtitle}>You are currently matched with </Text>
                <Text style={styles.subtitle}>{noOfMentors} mentors</Text>
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
        <NavBar/>
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
      minHeight:100,
      margin: '2.5%', // Adjust as needed
      backgroundColor: 'lightblue',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:10,
    },
    
    square2: {
      minHeight:100,
      margin: '2.5%', // Adjust as needed
      backgroundColor: 'lightblue',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:10,
    },

    square3: {
      minHeight:100,
      margin: '2.5%', // Adjust as needed
      backgroundColor: 'lightblue',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:10,
    },
    text: {
      fontSize: 18,
      color:'white',
    },
    header: {
      fontSize: 40,
      fontWeight: 'bold',
      color:'white',
      alignSelf:'center',
      marginTop:30,
      marginBottom: 20,
    },
    subtitle:{
      fontSize:20,
      alignSelf:'center',
      color:'white',
      fontWeight: 'bold',
    },
    intro:{
      color:'white',
      marginBottom: 60,
      textAlign:'center',
    }
  });

  export default MatchWithMentor;