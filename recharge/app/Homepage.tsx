// Homepage.tsx

import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import NavBar from './NavBar';
// import notifee from "@notifee/react-native";

export default function Homepage() {
    const router = useRouter();

    // async function onDisplayNotification() {

    //   // Request permissions (required for iOS)
    //   await notifee.requestPermission();
  
    //   // Create a channel (required for Android)
    //   const channelId = await notifee.createChannel({
    //     id: "default",
    //     name: "Default Channel",
    //   });
  
    //   // Display a notification
    //   await notifee.displayNotification({
    //     title: "Water Reminder",
    //     body: "Remeber to drink water and stay hydrated!",
    //     android: {
    //       channelId,
    //       // pressAction is needed if you want the notification to open the app when pressed
    //       pressAction: {
    //         id: "default",
    //       },
    //     },
    //   });
    // }

    


    return (
        <View style={styles.container}>
          <LinearGradient colors={['#eccbaa', '#65AAB3']} style={{height:'100%', width:'100%'}} >

          {/* <Button
        title="Display Notification"
        onPress={() => onDisplayNotification()}
      /> */}

          <TouchableOpacity
            style={styles.square1}
            onPress={() => router.navigate('/Trackers')}
          >
            <Text style={styles.text}>Trackers</Text>
            <Image source={require('./images/Tracker.png')} style={styles.TrackerPic}/>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.square2}
            onPress={() => router.navigate('/DailyJournal')}
          >
            <Text style={styles.text}>Daily Journal</Text>
            <Image source={require('./images/Journal.png')} style={styles.JournalPic}/>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.square3}
            onPress={() => router.navigate('/MatchWithMentor')}
          >
            <Text style={styles.text}>Mentor Match</Text>
            <Image source={require('./images/Match.png')} style={styles.MatchPic}/>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.square4}
            onPress={() => router.navigate('/GuidedSession')}
          >
            <Text style={styles.text}>Mental Health Care</Text>
            <Image source={require('./images/MentalCare.jpg')} style={styles.MentalCarePic}/>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.square5}
            onPress={() => router.navigate('/ExerciseRoutine')}
          >
            <Text style={styles.text}>Exercise Routines</Text>
            <Image source={require('./images/Exercise.png')} style={styles.ExercisePic}/>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.square6}
            // onPress={() => router.navigate('/OtherResources')}
          >
            <Text style={styles.text}>Other Resources</Text>
            <Image source={require('./images/Resources.png')} style={styles.ResourcesPic}/>
          </TouchableOpacity>
          <NavBar/>
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
    },
    
    square1: {
      marginTop: '20%',
      width: '45%',
      aspectRatio: 1,
      margin: '2.5%', 
      backgroundColor: 'white',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },

    TrackerPic: {
      width: 200,
      height: 100,
      marginTop: 10,
      resizeMode: 'contain',
    },
    
    square2: {
      width: '45%',
      aspectRatio: 1, 
      margin: '2.5%',
      backgroundColor: 'white',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: '52%',
      marginTop: '-48%',
    },

    JournalPic: {
      width: 200,
      height: 100,
      marginTop: 5,
      resizeMode: 'contain',
    },

    square3: {
      width: '45%',
      aspectRatio: 1, 
      margin: '2.5%', 
      backgroundColor: 'white',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },

    MatchPic: {
      width: 200,
      height: 97,
      marginTop: 11,
      resizeMode: 'contain',
    },

    square4: {
      width: '45%',
      aspectRatio: 1, 
      margin: '2.5%', 
      backgroundColor: 'white',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: '52%',
      marginTop: '-48%',
    },

    MentalCarePic: {
      width: 200,
      height: 100,
      marginTop: 4,
      resizeMode: 'contain',
    },

    square5: {
      width: '45%',
      aspectRatio: 1,
      margin: '2.5%', 
      backgroundColor: 'white',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },

    ExercisePic: {
      width: 200,
      height: 95,
      marginTop: 15,
      resizeMode: 'contain',
    },

    square6: {
      width: '45%',
      aspectRatio: 1, 
      margin: '2.5%', 
      backgroundColor: 'white',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: '52%',
      marginTop: '-48%',
    },

    ResourcesPic: {
      width: 200,
      height: 104,
      marginTop: 3,
      resizeMode: 'contain',
    },

    text: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#e37b60',
    },
  });



