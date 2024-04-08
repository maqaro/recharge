import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
// import NavBar from './NavBar';
import { Ionicons } from '@expo/vector-icons';


const MatchWithMentor = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [noOfMentors, setNoOfMentors] = useState(0);

    const BackButton = () => (
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.navigate('/Homepage')}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
          <LinearGradient colors={['#85D4D5', '#85D4D5']} style={{height:'100%', width:'100%'}}>
            <View>
              <BackButton />
                <Text style={styles.header}>Mentor Match {username}</Text>
                <Text style={styles.intro}>This page offers a supportive environment for {'\n'}discussing mental health and personal concerns {'\n'}with dedicated mentors. 
                  Connect with empathetic listeners to share experiences, gain insights, and find encouragement. Break the stigma and embrace a 
                  community of support.</Text>
                <Text style={styles.intro}>You're not alone – let's talk.</Text>
                {/* <Text style={styles.intro}>This page offers a supportive environment for discussing mental health and personal concerns with dedicated mentors.</Text>
                <Text style={styles.intro}>Connect with empathetic listeners to share experiences, gain insights, and find encouragement.</Text>
                <Text style={styles.intro}>Break the stigma and embrace a community of support.</Text>
                <Text style={styles.intro}>You're not alone – let's talk.</Text> */}
                <Text style={styles.gap}> </Text>
                <Text style={styles.subtitle}>You are currently matched with </Text>
                <Text style={styles.subtitle}>{noOfMentors} mentors</Text>
            </View>
          <TouchableOpacity
            style={styles.square1}
            onPress={() => router.navigate('./MatchWithMentorForm')}
          >
            <Text style={styles.text}>Match With New Mentor</Text>
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
        {/* <NavBar/> */}
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
    backButton: {
      position: 'absolute',
      top: 22, 
      left: 20,
      zIndex: 10,
    },
    square1: {
      minHeight:100,
      margin: '2.5%', // Adjust as needed
      backgroundColor: '#2BC0E4',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginTop: 30,
      opacity: 0.8,
      shadowColor: "black",
      shadowOffset: {
        width: 1,
        height: 4
      },
      shadowRadius: 8,
      shadowOpacity: 0.6,
    },
    
    square2: {
      minHeight:100,
      margin: '2.5%', // Adjust as needed
      backgroundColor: '#2BC0E4',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      opacity: 0.8,
      shadowColor: "black",
      shadowOffset: {
        width: 1,
        height: 4
      },
      shadowRadius: 8,
      shadowOpacity: 0.6,
    },

    square3: {
      minHeight:100,
      margin: '2.5%', // Adjust as needed
      backgroundColor: '#2BC0E4',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      opacity: 0.8,
      shadowColor: "black",
      shadowOffset: {
        width: 1,
        height: 4
      },
      shadowRadius: 8,
      shadowOpacity: 0.6,
    },
    text: {
      fontSize: 18,
      color:'black',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color:'black',
      alignSelf:'center',
      marginTop: 22,
      marginBottom: 20,
    },
    subtitle:{
      fontSize:20,
      alignSelf:'center',
      color:'black',
      fontWeight: 'bold',
    },
    intro:{
      color:'black',
      // marginBottom: 25,
      textAlign:'center',
      fontSize: 17,
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 10,
    },

    gap:{
      marginBottom: 50,
    }
  });

  export default MatchWithMentor;