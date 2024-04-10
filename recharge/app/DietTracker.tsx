import React, { useEffect, useState, useRef }  from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import storeEmotion from './EmotionTracker';
import { supabase } from '../lib/supabase';
import { Button } from 'react-native-elements';
import NavBar from './NavBar';
import { Ionicons } from '@expo/vector-icons';



const EmotionTracker = () => {
    const [userid, setUserid] = useState<string | undefined>();
    const [calories, setCalories] = useState(0);
    const [isdataStored, setisDataStored] = useState(false);
    const [totalCalories, setTotalCalories] = useState(0);
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

const getTotalCalories = async() =>{
  try{
    const { data: {user}, error } = await supabase.auth.getUser(); // Get the authenticated user

    if (error) {
      console.error('Error fetching user data:', error.message);
      return;
    }
    let today = new Date().toISOString().split('T')[0]; 

    const { data, error: insertError } = await supabase
    .from('dietCalories')
    .select('calories')
    .eq('user_id', user?.id)
    .eq('date', today);

    if (insertError) {
      console.error('Error inserting diet data:', insertError.message);
    } 

    let total = 0;
    if (data){
      data.map(item => (
        total += Object.values(item)[0]
      ))
      setTotalCalories(total);

      const { data: updateData, error: updateError } = await supabase
      .from('diettracker')
      .upsert([
        { total_calories: total, user_id: user?.id, date: today },
      ], { onConflict: 'date' });
   
    if (updateError){
      console.log("Error inserting")
    }

 }
  } catch (error) {
    console.error('Error inserting diet data:', error);
  }
}

useEffect(() => {
    handlePressSubmit();
    getTotalCalories();
  }, [calories]);

  const BackButton = () => (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => router.navigate('/Trackers')}
    >
      <Ionicons name="chevron-back-circle-outline" size={35} color="black" />
    </TouchableOpacity>
  );

    return (
        <View style={styles.container}>
            <BackButton />
            <LinearGradient colors={['#74CA91', '#74CA91']} style={{height:'100%', width:'100%'}}>
              <Text style={styles.hello}>So far you have consumed: {totalCalories} calories</Text>
            <TouchableOpacity style={styles.buttons} onPress={() => router.navigate('/MealSearch')}> 
                <Text>Search Meal</Text> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={() => router.navigate('/AddMeal')}>
                <Text>Add Meal</Text>  
            </TouchableOpacity>
  </LinearGradient>
  {/* <NavBar/> */}
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
        marginTop: 140,
        backgroundColor: 'green',
        borderRadius: 50,
    },

    backButton: {
        position: 'absolute',
        top: 14, 
        left: 20,
        zIndex: 10,
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