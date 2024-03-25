import React, { useEffect, useState, useRef }  from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import storeEmotion from './EmotionTracker';
import { supabase } from '../lib/supabase';



const EmotionTracker = () => {
    const [userid, setUserid] = useState<string | undefined>();
    const [emotion, setEmotion] = useState('sad');
    const [isdataStored, setisDataStored] = useState(false);


const handlePressSubmit = async () => {
  try {
    const { data: {user}, error } = await supabase.auth.getUser(); // Get the authenticated user

    if (error) {
      console.error('Error fetching user data:', error.message);
      return;
    }
    let today = new Date().toISOString().split('T')[0]; 

    const { data, error: insertError } = await supabase.from('emotiontracker').upsert([
      { emotion: emotion, user_id: user?.id, date: today },
    ], { onConflict: 'date' });
    setisDataStored(true)

    if (insertError) {
      console.error('Error inserting emotion data:', insertError.message);
    } 
  } catch (error) {
    console.error('Error inserting emotion data:', error);
  }
};

useEffect(() => {
    handlePressSubmit();
  }, [emotion]);

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#1a7373', '#e37b60']} style={{height:'100%', width:'100%'}}>
            <Text style={styles.hello}>Hello User,</Text>
            <Text style={styles.question}>How are you feeling today?</Text>

            <Text style={styles.selectText}>Select your Emotion</Text>
 
            <ScrollView contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={true} horizontal>
                <TouchableOpacity style={[styles.imageContainer]} onPress={() => setEmotion('Terrible')}>
                <Image source={require('./images/Mood1.png')} style={styles.image}/>
                    <Text style={styles.terrible}>Terrible</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.imageContainer]} onPress={() => setEmotion('Sad')}>
                    <Image source={require('./images/Mood2.png')} style={styles.image}/>
                    <Text style={styles.sad}>Sad</Text>
                </TouchableOpacity>
            </ScrollView>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={true} horizontal>
                <TouchableOpacity style={[styles.imageContainer]} onPress={() => setEmotion('Okay')}>
                    <Image source={require('./images/Mood3.png')} style={styles.image}/>
                    <Text style={styles.okay}>Okay</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.imageContainer]} onPress={() => setEmotion('Happy')}>
                    <Image source={require('./images/Mood4.png')} style={styles.image}/>
                    <Text style={styles.happy}>Happy</Text>
                </TouchableOpacity>
            </ScrollView>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={true} horizontal>
                <TouchableOpacity style={[styles.imageContainer]} onPress={() => setEmotion('Great')}>
                    <Image source={require('./images/Mood5.png')} style={styles.image}/>
                    <Text style={styles.great}>Great</Text>
                </TouchableOpacity>
            </ScrollView>
  </LinearGradient>
        </View>
    )
};


const styles = StyleSheet.create({

    container: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },

    scrollContainer: {
        flexGrow: 1,
        width: '100%',
        justifyContent: 'space-around',
    },

    hello: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        marginTop: 30,
    },

    question: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        marginBottom: 50,
        marginTop: 20,
    },

    selectText: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        right: 90,
        color: 'white',
        marginTop: 0,
    },

    imageContainer: {
        marginTop: 20,
        marginLeft: 10,
    },

    image: {
        width: 100,
        height: 150,
        resizeMode: 'contain',
    },

    terrible: {
        color: '#E48389',
        fontWeight: 'bold',
        marginLeft: 23,
        fontSize: 15,
    },

    sad: {
        color: '#E29B70',
        fontWeight: 'bold',
        marginLeft: 36,
        fontSize: 15,
    },

    okay: {
        color: '#DDB654',
        fontWeight: 'bold',
        marginLeft: 32,
        fontSize: 15,
    },

    happy: {
        color: '#92AC62',
        fontWeight: 'bold',
        marginLeft: 26,
        fontSize: 15,
    },

    great: {
        color: '#56A273',
        fontWeight: 'bold',
        marginLeft: 30,
        fontSize: 15,
    },

});



export default EmotionTracker;