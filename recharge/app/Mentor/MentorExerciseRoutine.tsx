import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { supabase } from '../../lib/supabase';
import { router } from 'expo-router';
import MentorNavBar from './MentorNavBar';
import { Ionicons } from '@expo/vector-icons';

const MentorExerciseRoutine: React.FC = () => {
    const [routines, setRoutines] = useState<Record<string, any[]>>({});
    const [selectedRoutine, setSelectedRoutine] = useState<string | null>(null);
    const [username, setUsername] = useState<any>();


    useEffect(() => {
        const fetchExerciseRoutine = async () => {
            let { data: exerciseroutine, error } = await supabase
                .from('exerciseroutine')
                .select(`
                    *,
                    exercise:exercise_id (id, Exercise_Name, muscle_gp, Exercise_Image),
                    routine:routine_id (id, name)
                `);
            if (error && !exerciseroutine) {
                console.error('Error fetching exercise routine:', error);
            } else {
                //console.log(exerciseroutine);
                const groupedByRoutine = exerciseroutine?.reduce((accumulator, current) => {
                    const routineName = current.routine.name;
                    if (!accumulator[routineName]) {
                        accumulator[routineName] = [];
                    }
                    accumulator[routineName].push(current);
                    return accumulator;
                }, {});
                setRoutines(groupedByRoutine);
                if (Object.keys(groupedByRoutine).length > 0) {
                    setSelectedRoutine(Object.keys(groupedByRoutine)[0]);
                }
            }
        };

        fetchExerciseRoutine();
    }, []);

    
    const recommedResource = async (title: string) => {
      try {
        console.log(title);
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) {
          console.error('Error fetching user:', userError);
          return;
        }
        let userId = (userData?.user?.id ?? null);
        console.log(userId)

      const{data: usernameData, error: errorData} = await supabase
      .from('mentors')
      .select('name')
      .eq('id', userId);

      if (usernameData){
        console.log(Object.values(usernameData[0])[0])
        setUsername(Object.values(usernameData[0])[0])
      }
      else{
        console.log(errorData)
      }

      const { data: resourcesData, error } = await supabase
      .from('exercise')
      .update({ 'recommendedBy': username})
      .eq('Exercise_Name', title);

      Alert.alert("Resource Recommended");
    }
    catch{
      console.log("Error recommending resource");
    }
  }

    const renderRoutine = ({ item }: any) => (
        <TouchableOpacity
            onPress={() => setSelectedRoutine(item)}
            style={[styles.routineTab, selectedRoutine === item ? styles.selectedTab : null]}
        >
            <Text style={[styles.routineTabText, selectedRoutine === item ? styles.selectedTabText : null]}>
            {item}
            </Text>
        </TouchableOpacity>
    );

    const BackButton = () => (
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.navigate('/Mentor/MentorHomepage')}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
          <BackButton />
            <Text style={styles.title}>Exercise Routines</Text>
          
            <FlatList 
                horizontal
                data={Object.keys(routines)}
                renderItem={({ item }) => renderRoutine({ item })}
                keyExtractor={(item) => item}
                showsHorizontalScrollIndicator={false}
                style={styles.flatListStyle}
            />
            <ScrollView style={styles.scrollView}>
            {selectedRoutine && routines[selectedRoutine].map((exercise, index) => (
              <TouchableOpacity onPress={() => router.push({ pathname: '/ExerciseHistory', params: { exerciseID: exercise.exercise_id } })}>
              <View key={index} style={styles.exerciseCard}>
                  <View style={styles.exerciseImage}>
                    <Image source={exercise.exercise.Exercise_Image ? { uri: exercise.exercise.Exercise_Image } : require('../../assets/placeholder.jpg')} style={styles.exerciseImage}/>

                  </View>
                  
                  <View style={styles.exerciseContent}>
                      <Text style={styles.exerciseTitle}>
                          {exercise.exercise.Exercise_Name}
                      </Text>
                      <Text style={styles.exerciseInfo}>
                          Muscle Group: {exercise.exercise.muscle_gp}
                      </Text>
                      {/* <Button title="Recommend Resource" onPress={() => {recommedResource(exercise.exercise.Exercise_Name)}}></Button> */}

                      <TouchableOpacity onPress={() => {recommedResource(exercise.exercise.Exercise_Name)}}>
                        <Text style={styles.recommend}>Recommend Resource</Text>
                      </TouchableOpacity>


                  </View>
              </View>
              </TouchableOpacity>
          ))}
            </ScrollView>
            <MentorNavBar/> 
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5', // A softer shade for background
    },
    flatListStyle: {
      maxHeight: 60, // Keeping the FlatList contained
      padding: 10,
      marginVertical: 10, // Add some space above and below the FlatList
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
      marginTop: 30,
    },
    backButton: {
      position: 'absolute',
      top: 32, 
      left: 20,
      zIndex: 10,
    },
    exerciseCard: {
      flexDirection: 'row',
      alignItems: 'center', // Align items to the center of the flex direction for a neater look
      padding: 15,
      marginHorizontal: 10, // Give some horizontal space
      marginBottom: 15,
      backgroundColor: '#FFFFFF',
      borderRadius: 12, // More pronounced rounded corners
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5, // Slightly elevated shadow for depth
    },
    exerciseImage: {
      width: 100, // Slightly larger for emphasis
      height: 100,
      borderRadius: 10,
      marginRight: 15, // Increase space between the image and the text
    },
    exerciseContent: {
      flex: 1,
      justifyContent: 'center',
    },
    exerciseTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#333', // Darker text for better readability
    },
    exerciseInfo: {
      fontSize: 14,
      color: '#666',
    },
    routineTab: {
      marginRight: 10,
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: '#bfbfbf', // Softer background for tabs
      borderRadius: 10,
      borderWidth: 0, // Remove border to simplify
    },
    selectedTab: {
      backgroundColor: '#000000', // A light, pleasant color for selected tabs
    },
    selectedTabText: {
        color: '#FFFFFF', // White text for better contrast
    },
    routineTabText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    scrollView: {
      flex: 1, // Ensure ScrollView takes the remaining space
    },
    recommend:{
      color: 'blue',
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 5,
    }
  });

export default MentorExerciseRoutine;
