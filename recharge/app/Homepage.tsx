// Homepage.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import TrackerNav from './TrackerNav';


export default function Homepage() {
    const router = useRouter();
    return (
      <View style={styles.container}>

        <LinearGradient colors={['#eccbaa', '#65AAB3']} style={{ height: '100%', width: '100%' }} >
        <Text style={styles.title}>Home Page</Text>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#268394', margin: 16, alignContent:'center'}}>Let's Recharge, John</Text>

          <ScrollView>
            <View style={styles.full}>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.square1}
                  onPress={() => router.navigate('/Trackers')}
                >
                  <Text style={styles.text}>Trackers</Text>
                  <Image source={require('./images/Tracker.png')} style={styles.TrackerPic} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.square2}
                  onPress={() => router.navigate('/DailyJournal')}
                >
                  <Text style={styles.text}>Daily Journal</Text>
                  <Image source={require('./images/Journal.png')} style={styles.JournalPic} />
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.square3}
                //onPress={() => .........
                >
                  <Text style={styles.text}>Mentor Match</Text>
                  <Image source={require('./images/Match.png')} style={styles.MatchPic} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.square4}
                //onPress={() => ........
                >
                  <Text style={styles.text}>Guided Sessions</Text>
                  <Image source={require('./images/MentalCare.jpg')} style={styles.MentalCarePic} />
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.square5}
                  onPress={() => router.navigate('/ExerciseRoutine')}
                >
                  <Text style={styles.text}>Exercise Routines</Text>
                  <Image source={require('./images/Exercise.png')} style={styles.ExercisePic} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.square6}
                >
                  <Text style={styles.text}>Other Resources</Text>
                  <Image source={require('./images/Resources.png')} style={styles.ResourcesPic} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <TrackerNav />
        </LinearGradient>

      </View>
      );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26, // Larger font size for the main title
    fontWeight: 'bold',
    color: '#444', // Slightly lighter than black for a softer look
    margin: 16, // Margin around the title for spacing
  },
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
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
    },
    square1: {
      width: '45%',
      aspectRatio: 1,
      backgroundColor: 'white',
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
    
    square2: {
      width: '45%',
      aspectRatio: 1, // Square aspect ratio
      backgroundColor: 'white',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      margin:7,


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
      backgroundColor: 'white',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      margin:7,
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
      backgroundColor: 'white',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      margin:7,
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
      backgroundColor: 'white',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      margin:7,
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
      backgroundColor: 'white',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      margin:7,
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



