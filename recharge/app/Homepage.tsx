// Homepage.tsx

import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, ImageBackground, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
// import NavBar from './NavBar';
// import notifee from "@notifee/react-native";
import TrackerNav from './TrackerNav';
import NavBar from './NavBar';

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
          <View ><Text style={styles.title}>Home Page</Text></View>


<LinearGradient colors={['#FFFFFF', '#FFFFFF']} style={{height: '85%',width: '100%' }} >

<Text style={{fontSize: 25, fontWeight: 'bold', color: '#268394', margin: 16, alignContent:'center'}}>Let's Recharge, John</Text>

  <ScrollView>
    <View style={styles.full}>
      <View style={styles.row}>
        <LinearGradient colors={['#ff9966', '#ff5e62']} style={styles.square1}> 

          <TouchableOpacity
            style={styles.square1}
            onPress={() => router.navigate('/Trackers')}
          >
            <Text style={styles.text}>Trackers</Text>
            <Image source={require('./images/Tracker.png')} style={styles.TrackerPic} />
          </TouchableOpacity>
          </LinearGradient>
          <LinearGradient colors={['#f2709c', '#ff9472']} style={styles.square1} >
                          <TouchableOpacity
            style={styles.square1}
            onPress={() => router.navigate('/DailyJournal')}
          >
            <Text style={styles.text}>Daily Journal</Text>
            <Image source={require('./images/Journal.png')} style={styles.JournalPic} />
          </TouchableOpacity>
              </LinearGradient>
              </View>
              <View style={styles.row}>
                <LinearGradient colors={['#56CCF2', '#2F80ED']} style={styles.square1}> 
          <TouchableOpacity
            style={styles.square1}
            onPress={() => router.navigate('/MatchWithMentor')}
          >
            <Text style={styles.text}>Mentor Match</Text>
            <Image source={require('./images/Match.png')} style={styles.MatchPic} />
          </TouchableOpacity>
            </LinearGradient>
                <LinearGradient colors={['#0cebeb', '#20e3b2']} style={styles.square1}>
          <TouchableOpacity
            style={styles.square1}
            onPress={() => router.navigate('/GuidedSession')}
          >
            <Text style={styles.text}>Guided Sessions</Text>
            <Image source={require('./images/MentalCare.png')} style={styles.MentalCarePic} />
          </TouchableOpacity>
</LinearGradient>
              </View>
              <View style={styles.row}>
              <LinearGradient colors={['#1CD8D2', '#93EDC7']} style={styles.square1}>
          <TouchableOpacity
            style={styles.square1}
            onPress={() => router.navigate('/ExerciseRoutine')}
          >
            <Text style={styles.text}>Exercise Routines</Text>
            <Image source={require('./images/Exercise.png')} style={styles.ExercisePic} />
          </TouchableOpacity>
</LinearGradient>
                <LinearGradient colors={['#65C7F7', '#1cefff']} style={styles.square1}>
          <TouchableOpacity
            style={styles.square1}
            onPress={() => router.navigate('/Resources')}
          >
            <Text style={styles.text}>Other Resources</Text>
            <Image source={require('./images/Resources.png')} style={styles.ResourcesPic} />
          </TouchableOpacity>
          </LinearGradient>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      <NavBar />


        </View>
      );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    title: {
    fontSize: 26, // Larger font size for the main title
    fontWeight: 'bold',
    color: '#444', // Slightly lighter than black for a softer look
    margin: 16, // Margin around the title for spacing
  },
    full:{
      flex:1,
      alignContent:'center',
      justifyContent:'space-evenly',
    },
    row:{
      flex:1,
      flexDirection:'row',
      justifyContent:'center',
      marginLeft:15,
      marginRight:15
    },
    
    square1: {
      width: '50%',
      aspectRatio: 1,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      margin:7,
      shadowColor: "#111", // Adding shadow for elevation effect
    },

    TrackerPic: {
      width: 200,
      height: 100,
      marginTop: 10,
      resizeMode: 'contain',
    },

    JournalPic: {
      width: 200,
      height: 100,
      marginTop: 5,
      resizeMode: 'contain',
    },

    MatchPic: {
      width: 200,
      height: 97,
      marginTop: 11,
      resizeMode: 'contain',
    },

    MentalCarePic: {
      width: 200,
      height: 100,
      marginTop: 4,
      resizeMode: 'contain',
    },

    ExercisePic: {
      width: 200,
      height: 95,
      marginTop: 15,
      resizeMode: 'contain',
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
      color: 'black',
    },
  });



