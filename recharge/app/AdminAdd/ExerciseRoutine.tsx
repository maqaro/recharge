import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { supabase } from '../../lib/supabase';


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

    const handleDeleteExercise = async (exerciseId: number) => {
        try {
            const { error } = await supabase.from('exerciseroutine').delete().eq('exercise_id', exerciseId);
            if (error) {
                throw error;
            }
            // Update the routines state after deletion
            const updatedRoutines = { ...routines };
            Object.keys(updatedRoutines).forEach((routineKey) => {
                updatedRoutines[routineKey] = updatedRoutines[routineKey].filter((exercise) => exercise.exercise_id !== exerciseId);
            });
            setRoutines(updatedRoutines);
        } catch (error) {
            console.error('Error deleting exercise:', error);
        }
    };

    const confirmDeleteExercise = (exerciseId: number) => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this exercise?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => handleDeleteExercise(exerciseId) },
            ]
        );
    };

    const renderRoutine = ({ item }) => (
        <TouchableOpacity
            onPress={() => setSelectedRoutine(item)}
            style={[styles.routineTab, selectedRoutine === item ? styles.selectedTab : null]}
        >
            <Text style={[styles.routineTabText, selectedRoutine === item ? styles.selectedTabText : null]}>
                {item}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
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
                {selectedRoutine ? (
                    routines[selectedRoutine].map((exercise, index) => (
                        <View key={index} style={styles.exerciseCard}>
                            <Image source={exercise.exercise.Exercise_Image ? { uri: exercise.exercise.Exercise_Image } : require('../../assets/placeholder.jpg')} style={styles.exerciseImage} />
                            <View style={styles.exerciseContent}>
                                <Text style={styles.exerciseTitle}>
                                    {exercise.exercise.Exercise_Name}
                                </Text>
                                <Text style={styles.exerciseInfo}>
                                    Muscle Group: {exercise.exercise.muscle_gp}
                                </Text>
                                <TouchableOpacity onPress={() => confirmDeleteExercise(exercise.exercise_id)}>
                                    <Text style={styles.deleteButton}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                ) : (
                    Object.keys(routines).map((routineName, index) => (
                        routines[routineName].map((exercise, index) => (
                            <View key={index} style={styles.exerciseCard}>
                                <Image source={exercise.exercise.Exercise_Image ? { uri: exercise.exercise.Exercise_Image } : require('../../assets/placeholder.jpg')} style={styles.exerciseImage} />
                                <View style={styles.exerciseContent}>
                                    <Text style={styles.exerciseTitle}>
                                        {exercise.exercise.Exercise_Name}
                                    </Text>
                                    <Text style={styles.exerciseInfo}>
                                        Muscle Group: {exercise.exercise.muscle_gp}
                                    </Text>
                                    <TouchableOpacity onPress={() => confirmDeleteExercise(exercise.exercise_id)}>
                                        <Text style={styles.deleteButton}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    flatListStyle: {
        maxHeight: 60,
        padding: 10,
        marginVertical: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        marginTop: 30,
    },
    exerciseCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    exerciseImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 15,
    },
    exerciseContent: {
        flex: 1,
        justifyContent: 'center',
    },
    exerciseTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    exerciseInfo: {
        fontSize: 14,
        color: '#666',
    },
    routineTab: {
        marginRight: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#bfbfbf',
        borderRadius: 10,
        borderWidth: 0,
    },
    selectedTab: {
        backgroundColor: '#000000',
    },
    selectedTabText: {
        color: '#FFFFFF',
    },
    routineTabText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
    },
    deleteButton: {
        color: 'red',
        marginTop: 5,
    },
});

export default ExerciseRoutine;
