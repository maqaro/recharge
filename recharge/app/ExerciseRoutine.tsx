import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabase';

const ExerciseRoutine: React.FC = () => {
    const [routine, setRoutine] = useState<Record<string, any[]>>({});

    useEffect(() => {
        const fetchExerciseRoutine = async () => {
          let { data: exerciseroutine, error } = await supabase
            .from('exerciseroutine')
            .select(`
                *,
                exercise:exercise_id (id, Exercise_Name, muscle_gp, Exercise_Image),
                routine:routine_id (id, name, recommended_by)
            `);

            if (error && !exerciseroutine) {
                console.error('Error fetching exercise routine:', error);
            } else {
                const groupedByRoutine = exerciseroutine?.reduce((accumulator, current) => {
                    const routineId = current.routine_id;
                    if (!accumulator[routineId]) {
                        accumulator[routineId] = [];
                    }
                    accumulator[routineId].push(current);
                    return accumulator;
                }, {});
                console.log(groupedByRoutine);
                setRoutine(groupedByRoutine);
            }
        };

        fetchExerciseRoutine();
    }, []);

    return (
      <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
              {Object.entries(routine).map(([routineId, exercises]) => (
                  <View key={routineId} style={styles.routineContainer}>
                      <Text style={styles.routineTitle}>
                          {exercises[0].routine.name} (Routine ID: {routineId})
                      </Text>
                      {exercises.map((exercise, index) => (
                          <View key={index} style={styles.exerciseBox}>
                              <Text style={styles.exerciseName}>
                                  {exercise.exercise.Exercise_Name}
                              </Text>
                              <Text style={styles.detail}>
                                  Muscle Group: {exercise.exercise.muscle_gp}
                              </Text>
                              {exercise.exercise.Exercise_Image && (
                                  <Image
                                      source={{ uri: exercise.exercise.Exercise_Image }}
                                      style={styles.image}
                                  />
                              )}
                          </View>
                      ))}
                  </View>
              ))}
          </ScrollView>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      padding: 20,
  },
  scrollView: {
      width: '100%',
  },
  routineContainer: {
      marginBottom: 20,
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      padding: 10,
  },
  routineTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
  },
  exerciseBox: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EFEFEF', // Light grey background for each exercise box
      padding: 10, // Padding inside the exercise box
      borderRadius: 8, // Rounded corners for the exercise box
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
      marginBottom: 10, // Space between each exercise box
  },
  exerciseName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#444',
      marginBottom: 5,
  },
  detail: {
      fontSize: 14,
      color: '#666',
      marginBottom: 5,
  },
  image: {
      width: 100,
      height: 100,
      borderRadius: 5,
      marginBottom: 5,
  },
});


export default ExerciseRoutine;
