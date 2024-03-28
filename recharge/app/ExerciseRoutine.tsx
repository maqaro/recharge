import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { supabase } from '../lib/supabase';

const ExerciseRoutine: React.FC = () => {
    const [routines, setRoutines] = useState<Record<string, any[]>>({});
    const [selectedRoutine, setSelectedRoutine] = useState<string | null>(null);

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

    const renderRoutine = ({ item }) => (
        <TouchableOpacity 
            onPress={() => setSelectedRoutine(item)}
            style={[styles.routineTab, selectedRoutine === item ? styles.selectedTab : null]}
        >
            <Text style={styles.routineTabText}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
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
              <View key={index} style={styles.exerciseCard}>
                  <View style={styles.exerciseImage}>
                    <Image
                        source={
                            exercise.exercise.Exercise_Image
                                ? { uri: exercise.exercise.Exercise_Image }
                                : require('../assets/placeholder.jpg') // Adjust the path to where your placeholder image is located
                        }
                        style={styles.exerciseImage}
                    />
                  </View>
                  
                  <View style={styles.exerciseContent}>
                      <Text style={styles.exerciseTitle}>
                          {exercise.exercise.Exercise_Name}
                      </Text>
                      <Text style={styles.exerciseInfo}>
                          Muscle Group: {exercise.exercise.muscle_gp}
                      </Text>
                  </View>
              </View>
          ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({

    flatListStyle: {
      height: 5
    },
    exerciseCard: {
        flexDirection: 'row',
        alignItems: 'flex-start', // Align items to the start of the flex direction
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    exerciseImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    exerciseContent: {
        flex: 1,
        justifyContent: 'center', // Center the content vertically
        marginTop: -5, // Adjust if necessary to align the content with the top of the image
    },

    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    routineTabsContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    routineTab: {
        marginRight: 10,
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 20,
    },
    selectedTab: {
        backgroundColor: '#DDD',
    },
    routineTabText: {
        fontSize: 16,
        color: '#333',
    },
    scrollView: {
        flex: 1,
    },
    exerciseTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
    },
    exerciseInfo: {
        fontSize: 14,
        color: '#666',
    },
    exerciseDuration: {
        fontSize: 14,
        color: '#666',
    },
});

export default ExerciseRoutine;
