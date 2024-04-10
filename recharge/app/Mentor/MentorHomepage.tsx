// Homepage.tsx

import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, ImageBackground, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../lib/supabase';
import MentorNavBar from './MentorNavBar';

export default function MentorHomepage() {
    const router = useRouter();
    const [username, setUsername] =  useState<string | null>(null);

    useEffect(() => {
      const fetchUser = async () => {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) {
          console.error('Error fetching user:', userError);
          return;
        }
        let userId = (userData?.user?.id ?? null);
    
        const{data, error} = await supabase
        .from('employee')
        .select('username')
        .eq('employee_id', userId);
    
        if (data){
            setUsername(Object.values(data[0])[0])
        }
    
      };
    
      fetchUser();
    }, []);

    return (
      <View style={styles.container}>
        <View ><Text style={styles.title}>Mentor Home Page</Text></View>


        <LinearGradient colors={['#FFFFFF', '#FFFFFF']} style={{height: '85%',width: '100%' }} >

        <Text style={{fontSize: 25, fontWeight: 'bold', color: '#268394', margin: 16, alignContent:'center'}}>Let's Help Recharge, {username}</Text>

          <ScrollView>
            <View style={styles.full}>
              <View style={styles.row}>
              </View>
              <View style={styles.row}>
                <LinearGradient colors={['#56CCF2', '#2F80ED']} style={styles.square1}> 
          <TouchableOpacity
            style={styles.square1}
            onPress={() => router.navigate('/Mentor/MentorViewChatrooms')}
          >
            <Text style={styles.text}>EmployeeMatch</Text>
            <Image source={require('../images/Match.png')} style={styles.MatchPic} />
          </TouchableOpacity>
            </LinearGradient>
                <LinearGradient colors={['#0cebeb', '#20e3b2']} style={styles.square1}>
          <TouchableOpacity
            style={styles.square1}
            onPress={() => router.navigate('/Mentor/MentorGuidedSession')}
          >
            <Text style={styles.text}>Guided Sessions</Text>
            <Image source={require('../images/MentalCare.png')} style={styles.MentalCarePic} />
          </TouchableOpacity>
</LinearGradient>
              </View>
              <View style={styles.row}>
              <LinearGradient colors={['#1CD8D2', '#93EDC7']} style={styles.square1}>
          <TouchableOpacity
            style={styles.square1}
            onPress={() => router.navigate('/Mentor/MentorExerciseRoutine')}
          >
            <Text style={styles.text}>Exercise Routines</Text>
            <Image source={require('../images/Exercise.png')} style={styles.ExercisePic} />
          </TouchableOpacity>
</LinearGradient>
                <LinearGradient colors={['#65C7F7', '#1cefff']} style={styles.square1}>
          <TouchableOpacity
            style={styles.square1}
            onPress={() => router.navigate('/Mentor/MentorResources')}
          >
            <Text style={styles.text}>Other Resources</Text>
            <Image source={require('../images/Resources.png')} style={styles.ResourcesPic} />
          </TouchableOpacity>
          </LinearGradient>
              </View>
            </View>
            <Text></Text>
            <Text></Text>
          </ScrollView>
        </LinearGradient>
        <MentorNavBar/>
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
      textAlign: 'center',

    },
  });



