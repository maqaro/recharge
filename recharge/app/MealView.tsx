// Homepage.tsx

import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';
import { Alert } from 'react-native';
import { set } from 'date-fns';

let descriptionValue = "";
let brandNameValue = "";
let ingredientsValue = "";
let foodNutrientsValue = "";

export const updateValues = (description: any, brandName: any, ingredients: any, foodNutrients: any) => {
  console.log("This function is running");
  descriptionValue = description;
  brandNameValue = brandName;
  ingredientsValue = ingredients;
  foodNutrientsValue = foodNutrients;
}

const MealView = () =>{
  const router = useRouter();
  const [userid, setUserid] = useState<string | undefined>();
  const [mentorDetails, setMentorDetails] = useState<any[]>([]);
  const [description, setDescription] = useState(descriptionValue);
  const [brandName, setBrandName] = useState(brandNameValue);
  const [ingredients, setIngredients] = useState(ingredientsValue);
  const [foodNutrients, setFoodNutrients] = useState(foodNutrientsValue);
  const [calories, setCalories] = useState("");

  useEffect(() => {
    setDescription(descriptionValue);
    setBrandName(brandNameValue);
    setIngredients(ingredientsValue);
    setFoodNutrients(foodNutrientsValue);
    //console.log(foodNutrientsValue);
    
    setCalories(Object.values(Object.values(foodNutrientsValue)[3])[2]);
  }, [])

  const addMeal = async () => {
    try {

        const { data: { user }, error: userError } = await supabase.auth.getUser(); // Get the authenticated user
    
        if (userError) {
          console.error('Error fetching user data:', userError.message);
          return;
        }
    
        let today = new Date().toISOString().split('T')[0];

          // No row exists for the current date, insert a new row
          const { error: insertError } = await supabase.from('dietCalories').insert([
            { calories: calories, user_id: user?.id, date: today },
          ]);
    
          if (insertError) {
            console.error('Error inserting water data:', insertError.message);
          }
          Alert.alert('Meal Added')
          router.navigate('./DietTracker')
    }
    catch{
        console.log("Error inserting meal");
    }
    }




    return (
      <LinearGradient colors={['#1a7373', '#e37b60']} style={{height:'100%', width:'100%'}}>
      <View>
          <Text style={styles.details}>Meal Details: </Text>
      <View style={styles.item}>
        <Text style={styles.title}>{description}</Text>
        <Text style={styles.details}>{brandName}</Text>
        <Text style={styles.details}>Calories: {calories} kcal</Text>
        <Text style={styles.details}>{ingredients}</Text>
        <Button title="Add Meal" onPress={() => {addMeal()}}></Button>
        <Button title="Back to Search" onPress={() => {router.navigate('./MealSearch')}}></Button>
      </View>
      </View>
      </LinearGradient>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  item: {
      margin: 30,
      borderBottomWidth: 2,
      borderBottomColor: "lightgrey",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5,
      fontStyle: "italic",
      color: 'white',
    },
  
    details: {
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 5,
      fontStyle: "italic",
      color: 'white',
    },


  });

  export default MealView;