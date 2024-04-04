import React, { useEffect, useState, useRef }  from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import storeEmotion from './EmotionTracker';
import { supabase } from '../lib/supabase';
import { Button } from 'react-native-elements';
import NavBar from './NavBar';



const EmotionTracker = () => {
    const [userid, setUserid] = useState<string | undefined>();
    const [calories, setCalories] = useState(0);
    const [isdataStored, setisDataStored] = useState(false);

    const router = useRouter();


const handlePressSubmit = async () => {
  try {
    const { data: {user}, error } = await supabase.auth.getUser(); // Get the authenticated user

    if (error) {
      console.error('Error fetching user data:', error.message);
      return;
    }
    let today = new Date().toISOString().split('T')[0]; 

    const { data, error: insertError } = await supabase.from('diettracker').upsert([
      { total_calories: calories, user_id: user?.id, date: today },
    ], { onConflict: 'date' });
    setisDataStored(true)

    if (insertError) {
      console.error('Error inserting diet data:', insertError.message);
    } 
  } catch (error) {
    console.error('Error inserting diet data:', error);
  }
};

useEffect(() => {
    handlePressSubmit();
  }, [calories]);

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#1a7373', '#e37b60']} style={{height:'100%', width:'100%'}}>
            <TouchableOpacity style={styles.buttons} onPress={() => router.navigate('/MealSearch')}> 
                <Text>Search Meal</Text> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={() => router.navigate('/AddMeal')}>
                <Text>Add Meal</Text>  
            </TouchableOpacity>
  </LinearGradient>
  <NavBar/>
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

    buttons: {
        height: 100,
        color: 'white',
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'green',
        borderRadius: 50,

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