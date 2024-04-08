// Homepage.tsx

import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, ImageBackground, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../lib/supabase';
import NavBar from './NavBar';
import WaterTracker from './WaterTracker';
import { set } from 'date-fns';
import { ProgressBar } from 'react-native-paper';
import { Icon } from 'react-native-elements';

export default function Homepage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | undefined>();
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];
  const [exercise, setExercise] = useState(0);

  const [water, setWater] = useState(false);
  const [waterGoal, setWaterGoal] = useState<number | undefined>(undefined);
  const [waterDrank, setWaterDrank] = useState<number | undefined>(undefined);

  const [sleep, setSleep] = useState(false);
  const [sleepHour, setSleepHour] = useState(0);

  const [emotion, setEmotion] = useState(false);
  const [emotionValue, setEmotionValue] = useState("");
  const emotionsSuggestingMentor = ["Sad", "Angry", "Anxious", "Frustrated"];


  const [journal, setJournal] = useState(false);

  const [error, setError] = useState<string | undefined>();





  const fetchTrackerData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.id) throw new Error('User not found');

    setUserId(user.id);
    try {

      let { data: exerciseTracker } = await supabase
        .from('exercisetracker')
        .select(`
        *
      `)
        .eq('user_id', user.id)
        .eq('date::date', currentDate);

      if (error) throw error;

      console.log(exerciseTracker);
      if (exerciseTracker?.length !== 0) {
        console.log('Exercise Tracker is true');
        setExercise(1);
        console.log(exerciseTracker);
      }
      else {
        console.log('Exercise Tracker is false');
        setExercise(0);
      }
    } catch (error) {
      console.error('Error fetching exercise data:', error);
      setError('Failed to fetch exercise data.');
    }

    try {
      let { data: waterTracker } = await supabase
        .from('watertracker')
        .select(`
            *
          `)
        .eq('user_id', user.id)
        .eq('date::date', currentDate);
      console.log(waterTracker);
      if (waterTracker?.length !== 0) {
        console.log('Water Tracker ', waterTracker);
        setWaterDrank(waterTracker[0]?.water_intake_ml);
        setWaterGoal(waterTracker[0]?.water_intake_goal);
        setWater(true);
        console.log('Water Tracker is true');
      }

    } catch (error) {
      setError('Failed to fetch water data.');
      console.error('Error fetching water data:', error);
    }

    try {
      let { data: sleepTracker } = await supabase
        .from('sleeptracker')
        .select(`
            *
          `)
        .eq('user_id', user.id)
        .eq('date::date', currentDate);
      console.log(sleepTracker);
      if (sleepTracker?.length !== 0) {
        console.log('Sleep Tracker is true');
        setSleep(true);
        const sleepStart = new Date(sleepTracker[0].sleep_start);
        const sleepEnd = new Date(sleepTracker[0].sleep_end);
        const sleepDuration = (sleepEnd.getTime() - sleepStart.getTime()) / (1000 * 60 * 60);
        const sleepHours = sleepDuration.toFixed(1);
        console.log(sleepHours);
        setSleepHour(sleepHours);

      }
    }
    catch (error) {
      setError('Failed to fetch sleep data.');
      console.error('Error fetching sleep data:', error);
    }

    try {
      let { data: emotionTracker } = await supabase
        .from('emotiontracker')
        .select(`
        *
      `)
        .eq('user_id', user.id)
        .eq('date::date', currentDate);
      console.log(emotionTracker);
      if (emotionTracker?.length !== 0) {
        console.log('Emotion Tracker is true', emotionTracker[0].emotion);
        setEmotion(true);
        setEmotionValue(emotionTracker[0].emotion);
      }
    } catch (error) {
      setError('Failed to fetch emotion data.');
      console.error('Error fetching emotion data:', error);
    }
    try {
      let { data: journalTracker } = await supabase
        .from('dailyjournal')
        .select(`
        *
      `)
        .eq('user_id', user.id)
        .eq('date::date', currentDate);
      console.log(journalTracker);
      if (journalTracker?.length !== 0 && journalTracker) {
        console.log('Journal Tracker is true');
        setJournal(true);
      }
    } catch (error) {
      setError('Failed to fetch journal data.');
      console.error('Error fetching journal data:', error);
    }
    // try {
    //   let {data: article} = await supabase
    //   .from('resources')
    //   .select(`
    //     *
    //   `)

    // }

  }, []);

  useEffect(() => {
    fetchTrackerData();
  }, [fetchTrackerData]);


  return (
    <View style={styles.container}>
      <View ><Text style={styles.title}>Home Page</Text></View>


      <LinearGradient colors={['#FFFFFF', '#FFFFFF']} style={{ height: '85%', width: '100%' }} >

        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#268394', margin: 16, alignContent: 'center', textAlign: 'center' }}>Let's Recharge, John</Text>

        <ScrollView>
          <View style={styles.full}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#268394', margin: 8, textAlign: 'center' }}>Your Day at a Glance</Text>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.overview}
                onPress={() => router.navigate('/EmotionTracker')}
              >
                <Icon name="emoji-emotions" color="#268394" size={30} style={{ alignItems: 'flex-start' }} />
                <Text style={styles.dataLabel}>Mood:</Text>
                <Text style={styles.dataValue}>{emotion ? `You're feeling ${emotionValue} today` : 'How are you feeling? Tap to share.'}</Text>
                {emotion && emotionsSuggestingMentor.includes(emotionValue) && (
                  <Text style={styles.recommendation}>
                    Feeling {emotionValue.toLowerCase()}? It might be helpful to talk to a mentor about it.
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.overview}
                onPress={() => router.navigate('/ExerciseTracker')}
              >
                <Icon name="fitness-center" color="#268394" size={30} style={{ alignItems: 'flex-start' }} />
                <Text style={styles.dataLabel}>Exercise:</Text>
                <Text style={styles.dataValue}>{exercise ? 'Awesome job! Tap to see your workout details.' : 'Get moving! Log your exercise here.'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.overview}
                onPress={() => router.navigate('/WaterTracker')}
              >
                <Icon name="water-drop" color="#268394" size={30} style={{ alignItems: 'flex-start' }} />
                <Text style={styles.dataLabel}>Hydration:</Text>
                <ProgressBar progress={water ? waterDrank / waterGoal : 0} color="#268394" />
                <Text></Text>
                <Text style={styles.dataValue}>{water ? `${waterDrank}ml down, only ${waterGoal - waterDrank}ml to go!` : 'Tap to track your water intake.'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.overview}
                onPress={() => router.navigate('/SleepTracker')}
              >
                <Icon name="bedtime" color="#268394" size={30} style={{ alignItems: 'flex-start' }} />
                <Text style={styles.dataLabel}>Sleep:</Text>
                <Text style={styles.dataValue}>{sleep ? `${sleepHour} hours of restful sleep` : 'How did you sleep? Log it here.'}</Text>
                {sleep && sleepHour < 7 && (
                <Text style={styles.recommendation}>
                  Speak to a mentor today on improving your sleep habits.
                </Text>)}
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.overview}
                onPress={() => router.navigate('/DailyJournal')}
              >
                <Icon name="book" color="#268394" size={30} style={{ alignItems: 'flex-start' }} />
                <Text style={styles.dataLabel}>Journal:</Text>
                <Text style={styles.dataValue}>{journal ? 'Reflective! View your entries here.' : 'Share your thoughts. Tap to journal.'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.overview}
                onPress={() => router.navigate('/MatchWithMentor')}
              >
                <Icon name="people" color="#268394" size={30} style={{ alignItems: 'flex-start' }} />
                <Text style={styles.dataLabel}>Mentor Match: </Text>
                <Text style={styles.dataValue}>Talk to a mentor about anything!</Text>
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#268394', margin: 8, textAlign: 'center' }}>Explore More</Text>

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
  recommendation: {
    fontSize: 14,
    color: '#DAA520', // Example color: golden for attention
    marginTop: 8,
  },
  container: {
    flex: 1,
  },
  dataLabel: {
    fontSize: 16,
    fontWeight: 'normal',
    fontWeight: 'bold',
    paddingBottom: 8,
    color: '#268394', // Teal color for consistency
    marginBottom: 4, // Spacing between label and value
  },
  dataValue: {
    fontSize: 13,
    color: '#105763', // A darker shade of teal for emphasis
  },
  overview: {
    flex: 1,
    width: '50%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    margin: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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



