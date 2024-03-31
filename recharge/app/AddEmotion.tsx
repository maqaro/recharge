// AddEmotion.tsx

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, PanResponder, Animated, TouchableOpacity, Alert, Pressable, Image } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { supabase } from '../lib/supabase';
import { useRouter } from 'expo-router';
import Back from 'react-native-vector-icons/Ionicons';

interface Emotion {
  name: string;
  backgroundColor: string;
  image: any;
}

const emotions: Emotion[] = [
  { name: 'Happy', backgroundColor: '#cfb108', image: require('./Emotions/happy.jpg') },
  { name: 'Sad', backgroundColor: '#4682BF', image: require('./Emotions/sad.jpg') },
  { name: 'Angry', backgroundColor: '#7d1204', image: require('./Emotions/angry.jpg') },
  { name: 'Anxious', backgroundColor: '#c4830a', image: require('./Emotions/anxious.jpg') },
  { name: 'Fustrated', backgroundColor: '#7b5887', image: require('./Emotions/fustrated.jpg') },
  { name: 'Love', backgroundColor: '#ab445c', image: require('./Emotions/love.jpg') },
  { name: 'Calm', backgroundColor: '#769476', image: require('./Emotions/calm.jpg') },
  { name: 'Excited', backgroundColor: '#b8533e', image: require('./Emotions/excited.jpg') },
  { name: 'Embarassed', backgroundColor: '#5e5959', image: require('./Emotions/embarassed.jpg') },
  { name: 'Disgust', backgroundColor: '#65781c', image: require('./Emotions/disgust.jpg') },
  { name: 'Bored', backgroundColor: '#592963', image: require('./Emotions/bored.jpg') },
  // Add more emotions if needed
];

const AddEmotion: React.FC = () => {
  const [emotionIndex, setEmotionIndex] = useState<number>(0);
  const emotion = emotions[emotionIndex];
  const [userid, setUserid] = useState<string | undefined>();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const id = user?.id;
        setUserid(id);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);


  const handleSelect = async () => {
    if (!userid) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      console.log("User:", user?.id);
      setUserid(user?.id);

      const currentDate = new Date().toISOString().split('T')[0];
      console.log('current date:', currentDate);

      // Check if there is an existing entry for the current user and date
      const { data: existingEmotion, error: queryError } = await supabase
        .from('emotiontracker')
        .select('*')
        .eq('user_id', userid)
        .eq('date', currentDate)

      if (queryError) {
        throw queryError;
      }

      console.log(existingEmotion);

      if (existingEmotion && existingEmotion.length > 0) {
        // Update existing entry
        console.log('in update');
        const { error: updateError } = await supabase
          .from('emotiontracker')
          .update({ emotion: emotion.name, tracked_date: new Date() })
          .eq('user_id', userid)
          .eq('date',currentDate);
          
        if (updateError) {
          throw updateError;
        }
        Alert.alert('Success', 'Emotion updated successfully!');
      } else {
        // Insert new entry
        console.log('in new entry');
        const { error: insertError } = await supabase
          .from('emotiontracker')
          .insert([
            {
              user_id: userid,
              emotion: emotion.name,
              tracked_date: new Date(),
              date: currentDate,
            },
          ]);
        if (insertError) {
          throw insertError;
        }
        Alert.alert('Success', 'Emotion added successfully!');
      }
    } catch (error) {
      console.error('Error handling emotion:', error);
      Alert.alert('Error', 'Failed to handle emotion. Please try again.');
    }
  };
  



  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dx > 180) {
        // Swiped right
        if (emotionIndex > 0) {
          setEmotionIndex(emotionIndex - 1);
        }
      } else if (gestureState.dx < -180) {
        // Swiped left
        if (emotionIndex < emotions.length - 1) {
          setEmotionIndex(emotionIndex + 1);
        }
      }
    },
  });

  return (
    <View style={[styles.container, { backgroundColor: emotion.backgroundColor }]} {...panResponder.panHandlers}>
      <Pressable style={styles.back} onPress={() => router.navigate('/EmotionTracker')}>
        <Back name="chevron-back-circle-outline" size={30} color="white"/>
      </Pressable>
      <Text style={styles.title}>How are you feeling today?</Text>
      <Text style={styles.subtitle}>Swipe to change emotion</Text>
      <Text style={styles.emotion}>{emotion.name}</Text>
      <View style={styles.imageContainer}>
        <Image source={emotion.image} style={styles.emotionImage} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}  onPress={handleSelect}>
          <Text style={styles.buttonText}>Select</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  back:{
    position:'absolute',
    top:10,
    left:10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf:'center',
    marginTop:50,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 10,
    alignSelf:'center',
  },
  emotion: {
    fontSize: 50,
    fontWeight: 'bold',
    alignSelf:'center',
    marginTop:30
  },
  buttonContainer: {
    marginTop:40,
    alignItems: 'center',
    alignSelf:'center',
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    
  },
  buttonText: {
    fontSize: 18,
  },

  emotionImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    alignSelf:'center',
    marginTop:20,
    borderRadius:30,
  },

  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 10, // Increased shadow radius
    shadowOffset: {
      width: 0,
      height: 5, // Adjusted shadow offset
    },
    elevation: 10, // for Android shadow
  },
});

export default AddEmotion;
