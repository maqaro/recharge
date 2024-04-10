import React, {useState} from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import { supabase } from '../lib/supabase';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MentorResults, { updateSpecialty } from './MentorResults';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

const AddMeal = () => {
  const { control, handleSubmit } = useForm();
  const [userid, setUserid] = useState<string | undefined>();
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  
  const router = useRouter();

  const onSubmit = async () => {
    try {

        const { data: { user }, error: userError } = await supabase.auth.getUser(); // Get the authenticated user
    
        if (userError) {
          console.error('Error fetching user data:', userError.message);
          return;
        }
    
        let today = new Date().toISOString().split('T')[0];

          const { error: insertError } = await supabase.from('dietCalories').insert([
            { calories: calories, user_id: user?.id, date: today },
          ]);
    
          if (insertError) {
            console.error('Error inserting diet data:', insertError.message);
          }
          Alert.alert('Meal Added')
          router.navigate('./DietTracker')
    }
    catch{
        console.log("Error inserting meal");
    }
    }


const BackButton = () => (
  <TouchableOpacity
    style={styles.backButton}
    onPress={() => router.navigate('/DietTracker')}
  >
    <Ionicons name="arrow-back" size={24} color="black" />
  </TouchableOpacity>
);

  return (
    <LinearGradient colors={['#85D4D5', '#85D4D5']} style={{height:'100%', width:'100%'}} >
      <BackButton />
    <View style={styles.container}>
    <View style={styles.header}>
        <Text style={styles.title}>Add Meal</Text>
      </View>
      <Text>Name: </Text>
      <TextInput
        style={styles.textbox}
        placeholder="Enter a brief explanation of what you wish to discuss"
        onChangeText={newText => setName(newText)}
        defaultValue={name}
      />
        <Text>Calories: </Text>
      <TextInput
        style={styles.textbox}
        placeholder="Enter a brief explanation of what you wish to discuss"
        onChangeText={newText => setCalories(newText)}
        defaultValue={calories}
      />

      {/* <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}

      <TouchableOpacity onPress={() => onSubmit()} style={styles.submit}>
      <Text style={styles.buttonText}>Submit</Text>
    </TouchableOpacity>

    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 20,
    paddingRight: 20,
    paddingLeft: 20,
    // paddingTop:10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to the start of the row
    width: '100%', // Ensure the header takes up the full width
    paddingHorizontal: 20, // Add some padding to the sides
    marginBottom: 5,
  },
  backButton: {
    position: 'absolute',
    top: 22, 
    left: 20,
    zIndex: 10,
  },
  backIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'black',
    alignSelf:'center',
    marginBottom: 10,
    marginTop: -79,
    marginLeft: 84,

  },
  input: {
    marginBottom: 10,
    marginTop: 40,
    width: '100%',
    color:'white',
    fontWeight:'bold',
  },
  textbox: {
    marginTop: 40,
    height:100,
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    textAlignVertical:'top',
    backgroundColor:'white',
    marginBottom:30,
    padding:10
  },
  subtitle:{
    color:'black',
    alignSelf:'center',
    textAlign:'center',
    fontSize: 20,
    paddingBottom: 30,
  },

  submit:{
    backgroundColor: '#2BC0E4',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
   },


});

export default AddMeal;