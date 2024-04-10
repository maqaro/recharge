import React, { useEffect, useState, useRef }  from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import storeEmotion from './EmotionTracker';
import { supabase } from '../lib/supabase';
import { Button } from 'react-native-elements';
import NavBar from './NavBar';
import { Ionicons } from '@expo/vector-icons';



const DietTracker = () => {
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
              <Text style={styles.diet}>Diet Tracker</Text>
              <Text style={styles.info}>Track your diet easily: search or add meals and keep an eye on your total calorie intake!</Text>
              <Text style={styles.hello}>So far you have consumed:{"\n"} {totalCalories} calories</Text>
            <TouchableOpacity style={styles.buttons} onPress={() => router.navigate('/MealSearch')}> 
                <Text style={styles.buttontext}>Search Meal</Text> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={() => router.navigate('/AddMeal')}>
                <Text style={styles.buttontext}>Add Meal</Text>  
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

    diet:{
      color: 'black',
      fontSize: 28,
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: 15,
    },

    info:{
      color: 'black',
      fontSize: 18,
      textAlign: 'center',
      marginTop: 40,
      paddingLeft: 40,
      paddingRight: 40,
    },

    buttons: { 
        height: 100,
        padding: 10,
        alignItems: 'center',
        marginTop: 40,
        marginRight: 50,
        marginLeft: 50,
        backgroundColor: 'white',
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
        marginTop: 130,
    },

    buttontext:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 25,
    }



});



export default DietTracker;