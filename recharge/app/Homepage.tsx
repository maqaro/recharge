// Homepage.tsx

import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, ImageBackground, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../lib/supabase';
import NavBar from './NavBar';
import { overlay } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

export default function Homepage() {
  const router = useRouter();
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuote = async () => {
    setIsLoading(true);
    try {
      const url = `https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json`;
      const response = await axios.get(url);
      console.log('Quote response:', response.data);

      setQuote(response.data.quoteText);
      setAuthor(response.data.quoteAuthor || 'Unknown');
    } catch (error) {
      console.error('Error fetching quote:', error);
      // Handle the error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote(); // Fetch a quote when the component mounts
  }, []);
  return (
    <View style={styles.container}>
      <View ><Text style={styles.title}>Home Page</Text></View>


      <LinearGradient colors={['#FFFFFF', '#FFFFFF']} style={{ height: '85%', width: '100%' }} >

        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#268394', margin: 16, alignContent: 'center', textAlign: 'center' }}>Let's Recharge, John</Text>


        <ScrollView>
          <View style={styles.full}>
            <TouchableOpacity style={styles.overview} onPress={fetchQuote}>
              <LinearGradient
                start={{x: 0, y: 0}} // Start at the top left
                end={{x: 1, y: 1}} // End at the bottom right
                colors={['#cad0ff', '#e3e3e3']}
                style={styles.overview1}
              >
                <Text style={{ marginBottom: 10, fontSize: 18, fontWeight: 'bold' }}>Thought of the Minute</Text>
                <Text style={{ fontSize: 16, fontStyle: 'italic', marginBottom: 10 }}>“{quote}”</Text>
                <Text style={{ marginBottom: 20, fontSize: 16 }}>— {author}</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.overview}
              onPress={() => router.navigate('/DashBoard')}
              >
                <LinearGradient
                  start={{x: 0, y: 0}} // Start at the top left
                  end={{x: 1, y: 1}} // End at the bottom right
                  colors={['#08AEEA', '#2AF598']}
                  style={styles.overview1}
                >
                    <Ionicons name="calendar" size={30} color="black" style={{paddingBottom:10}}/>
                    <Text style={styles.text}>Daily Snapshot</Text>
                </LinearGradient>

              </TouchableOpacity>


            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#268394', margin: 8}}>Explore</Text>

            <View style={styles.row}>

              <TouchableOpacity
                style={styles.square1}
                onPress={() => router.navigate('/Trackers')}
              >
                <LinearGradient colors={['#ff9966', '#ff5e62']} style={styles.square2}>
                  <Text style={styles.text}>Trackers</Text>
                  <Image source={require('./images/Tracker.png')} style={styles.TrackerPic} />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.square1}
                onPress={() => router.navigate('/DailyJournal')}
              >
                <LinearGradient colors={['#f2709c', '#ff9472']} style={styles.square2} >

                  <Text style={styles.text}>Daily Journal</Text>
                  <Image source={require('./images/Journal.png')} style={styles.JournalPic} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.square1}
                onPress={() => router.navigate('/MatchWithMentor')}
              >
                <LinearGradient colors={['#56CCF2', '#2F80ED']} style={styles.square2}>

                  <Text style={styles.text}>Mentor Match</Text>
                  <Image source={require('./images/Match.png')} style={styles.MatchPic} />
                </LinearGradient>

              </TouchableOpacity>

              <TouchableOpacity
                style={styles.square1}
                onPress={() => router.navigate('/GuidedSession')}
              >
                <LinearGradient colors={['#0cebeb', '#20e3b2']} style={styles.square2}>
                  <Text style={styles.text}>Guided Sessions</Text>
                  <Image source={require('./images/MentalCare.png')} style={styles.MentalCarePic} />
                </LinearGradient>
              </TouchableOpacity>

            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.square1}
                onPress={() => router.navigate('/ExerciseRoutine')}
              >
                <LinearGradient colors={['#1CD8D2', '#93EDC7']} style={styles.square2}>
                  <Text style={styles.text}>Exercise Routines</Text>
                  <Image source={require('./images/Exercise.png')} style={styles.ExercisePic} />
                </LinearGradient>

              </TouchableOpacity>
              <TouchableOpacity
                style={styles.square1}
                onPress={() => router.navigate('/Resources')}
              >
                <LinearGradient colors={['#65C7F7', '#1cefff']} style={styles.square2}>

                  <Text style={styles.text}>Other Resources</Text>
                  <Image source={require('./images/Resources.png')} style={styles.ResourcesPic} />
                </LinearGradient>
              </TouchableOpacity>
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
    textAlign: 'center', // Center the title
  },
  full: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15
  },
  overview: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 7,
    shadowColor: "#111",
    shadowOffset: {
      width: 1,
      height: 4
    },
    shadowRadius: 3,
    shadowOpacity: 0.4,
  },
  overview1: {
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    
  },
  square1: {
    width: '50%',
    aspectRatio: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 7,
    shadowColor: "#111",
    shadowOffset: {
      width: 1,
      height: 4
    },
    shadowRadius: 3,
    shadowOpacity: 0.4,
  },
  square2: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    justifyContent: 'center',
    opacity: 0.9,
    alignItems: 'center',
    margin: 7,
    shadowColor: "#111",
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
    textAlign: 'center',

  },
});



