import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import {supabase} from '../lib/supabase';

const ExerciseRoutine: React.FC = () => {
    const [routine, setRoutine] = React.useState<any[]>([]);
    useEffect(() => {
        const fetchExerciseRoutine = async () => {
            
            let { data: exerciseroutine, error } = await supabase
            .from('exerciseroutine')
            .select(`
                *,
                exercise:exercise_id (id, Exercise_Name,muscle_gp,Exercise_Image)
            `)
        
            //console.log("Exercise Routine:", exerciseroutine);
            if (error && !exerciseroutine){
                console.error('Error fetching exercise routine:', error);
            } else{
                const groupedByRoutine = exerciseroutine?.reduce((accumulator, current) => {
                    const routineId = current.routine_id;
                  
                    // If the routine_id doesn't exist in the accumulator, initialize it
                    if (!accumulator[routineId]) {
                      accumulator[routineId] = [];
                    }
                  
                    // Add the current exercise to the appropriate routine_id group
                    accumulator[routineId].push(current);
                    return accumulator;
                }, {});
                setRoutine(groupedByRoutine);
            }
        };
        
        fetchExerciseRoutine(); 


        
    }, []);

    return (


            <ScrollView style={styles.container}>
                {Object.keys(routine).map((routineId) => (
                    <View key={routineId} style={styles.routineContainer}>
                    <Text style={styles.routineTitle}>Routine {routineId}</Text>
                    {routine[routineId].map((exercise:any, index:any) => (
                        <View key={index} style={styles.exerciseContainer}>
                        {exercise.exercise.Exercise_Image && (
                            <Image
                            source={{ uri: exercise.exercise.Exercise_Image }}
                            style={styles.exerciseImage}
                            />
                        )}
                        <Text style={styles.exerciseName}>{exercise.exercise.Exercise_Name}</Text>
                        <Text style={styles.muscleGroup}>{exercise.exercise.muscle_gp}</Text>
                        </View>
                    ))}
                    </View>
                ))}
            </ScrollView>

        
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    routineContainer: {
      marginBottom: 20,
    },
    routineTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    exerciseContainer: {
      marginBottom: 10,
      alignItems: 'center',
    },
    exerciseImage: {
      width: 100,
      height: 100,
      borderRadius: 5, // Circular images
      marginBottom: 5,
    },
    exerciseName: {
      fontSize: 16,
      fontWeight: '500',
    },
    muscleGroup: {
      fontSize: 14,
      color: 'gray',
    },
});

export default ExerciseRoutine;