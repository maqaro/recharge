// Homepage.tsx

import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';
import { Alert } from 'react-native';
import { set } from 'date-fns';

let specialtyValue = "";

export const updateSpecialty = (specialty: string) => {
  console.log("This function is running");
  specialtyValue = specialty;
}

const MentorResults = () =>{
  const router = useRouter();
  const [userid, setUserid] = useState<string | undefined>();
  const [mentorDetails, setMentorDetails] = useState<any[]>([]);
  const [specialty, setSpecialty] = useState(specialtyValue);

  useEffect(() => {
    setSpecialty(specialtyValue)
    getDetails();
  }, [])


  const getDetails = async () => {

    try {
        const { data: { user }, } = await supabase.auth.getUser();
        setUserid(user?.id);
    
        let { data: mentors, error } = await supabase
            .from('mentors')
            .select('id, name, issues(name), specialty_id')
            .eq('specialty_id', parseInt(specialty));
        if (error) {
            console.error('Error fetching mentor data inner:', error);
            console.log(specialty);
        } else {
            if (mentors) {
                setMentorDetails(mentors); // Update state with the fetched sleep data
                console.log(mentors)
            }
        }
    } catch (error) {
        console.error('Error fetching mentor data:', error);
    }
  };

  const mentorSelected = async (mentorid: string) => {
    try {
      const { data: {user}, error } = await supabase.auth.getUser(); // Get the authenticated user
  
      if (error) {
        console.error('Error fetching user data:', error.message);
        return;
      }
      let today = new Date().toISOString().split('T')[0]; 
  
      const { data, error: insertError } = await supabase.from('chats').insert([
        { mentor_id: mentorid, employee_id: user?.id, issue_id: specialty },
      ]);
  
      if (insertError) {
        console.error('Error inserting employee  data:', insertError.message);
      } 
    } catch (error) {
      console.error('Error inserting employee data:', error);
    }
    router.navigate('./ViewMentors')
  }

    return (
      <LinearGradient colors={['#1a7373', '#e37b60']} style={{height:'100%', width:'100%'}}>
      <View>
          <Text style={styles.details}>Please select one of the mentors below: </Text>
      <View style={styles.item}>
          {mentorDetails?.map((item: {id: any, name: any, issues: {key: any, value: any}, specialty_id: any}) => (
              <TouchableOpacity onPress={() => mentorSelected(item.id)}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.details}>{Object.values(item.issues)}</Text>
          </TouchableOpacity>
          ))}
          
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

  export default MentorResults;