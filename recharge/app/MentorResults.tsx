// Homepage.tsx

import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';
import { Alert } from 'react-native';
import { set } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';

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

  const BackButton = () => (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => router.navigate('/MatchWithMentorForm')}
    >
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );


    return (
      <LinearGradient colors={['#85D4D5', '#85D4D5']} style={{height:'100%', width:'100%'}}>
      <BackButton />
      <View>
          <Text style={styles.details}>Please Select One Of The Mentors Below: </Text>
      <View>
          {mentorDetails?.map((item: {id: any, name: any, issues: {key: any, value: any}, specialty_id: any}) => (
              <TouchableOpacity onPress={() => mentorSelected(item.id)}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.issue}>{Object.values(item.issues)}</Text>
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
  
  backButton: {
    position: 'absolute',
    top: 22, 
    left: 20,
    zIndex: 10,
  },

  item: {
      borderBottomWidth: 2,
      borderBottomColor: "white",
  },
  
  title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5,
      color: '#02017D',
      paddingLeft: 20,
  },
  
  details: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 25,
    color: 'black',
    textAlign: 'center',
    marginLeft: 50,
    marginTop: 21,
    paddingLeft: 18,
    paddingRight: 20,
  },

  issue:{
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 25,
    color: 'black',

   
    // marginLeft: 50,
    // marginTop: 21,
    paddingLeft: 20,
    // paddingRight: 20,
  }


  });

  export default MentorResults;