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
      <LinearGradient colors={['#74CA91', '#74CA91']} style={{height:'100%', width:'100%'}}>
      <View>
          <Text style={styles.meal}>Meal Details: </Text>
      <View style={styles.item}>
        <Text style={styles.title}>{description}</Text>
        <Text style={styles.details}>{brandName}</Text>
        <Text style={styles.details}>Calories: {calories} kcal</Text>
        <Text style={styles.details}>{ingredients}</Text>

        {/* <Button title="Add Meal" onPress={() => {addMeal()}}></Button> */}

        <TouchableOpacity onPress={() => {addMeal()}}>
               <Text style={styles.addmealb}>Add Meal</Text>
          </TouchableOpacity>

        {/* <Button title="Back to Search" onPress={() => {router.navigate('./MealSearch')}}></Button> */}

        <TouchableOpacity onPress={() => {router.navigate('./MealSearch')}}>
               <Text style={styles.searchb}>Back To Search</Text>
          </TouchableOpacity>

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

    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5,
      color: '#183E4C',
    },

    meal:{
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 10,
      color: 'white',
      marginTop: 20,
      textAlign: 'center',
    },
    
  
    details: {
      fontSize: 15,

      marginBottom: 5,
      color: '#183E4C',
    },

    addmealb:{
      color: 'black',
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 25,
        textAlign: 'center',
    },

    searchb:{
      color: 'black',
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 25,
        textAlign: 'center',
    },

  });

  export default MealView;