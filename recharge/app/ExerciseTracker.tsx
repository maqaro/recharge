import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { supabase } from '../lib/supabase';
import TrackerButton from './trackerbutton';

const ExerciseTracker = () => {
    const [userid, setUserid] = React.useState<string | undefined>();
    const [exercises, setExercises] = React.useState<any[]>([]);

    React.useEffect(() => {        
        const fetchExerciseData = async () => {

            const { data: { user } } = await supabase.auth.getUser();
            console.log("User:", user?.id);
            setUserid(user?.id);

            let { data: exercisetracker, error } = await supabase
            .from('exercisetracker')
            .select(` 
                *, 
                exercise:exercise_id (id, Exercise_Name,muscle_gp,Exercise_Image)
            `)
            .eq('user_id', user?.id);
            console.log("User ID:", user?.id);
        
            if (error) {
                console.error('Error fetching exercise data:', error);
            } else {
                if (exercisetracker) {
                    console.log(exercisetracker);
                    const groupedByDate = exercisetracker.reduce((acc, cur) => {
                        // Assuming 'cur.date' exists and is a string representing the date
                        const date = cur.date;
                        if (!acc[date]) {
                            acc[date] = [];
                        }
                        acc[date].push(cur);
                        return acc;
                    }, {});
                
                    setExercises(groupedByDate); // Update state with the grouped data
                    console.log(groupedByDate); // Log the grouped data for verification

                }
            }
        };

        fetchExerciseData();
    }, []);




    return (
        <View style={styles.container}>
            <TrackerButton/>


            <Text style={styles.title}>Exercise Tracker</Text>
            <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.navigate('/ExerciseLogger')}
                >
                    <Text style={styles.buttonText}>Log new Exercise</Text>
            </TouchableOpacity>
            <ScrollView style={styles.scrollView}>
            {Object.entries(exercises).sort(([date1], [date2]) => date2.localeCompare(date1)).map(([date, exercisesForDate]) => (
                <View key={date} style={styles.dateContainer}>
                    <Text style={styles.dateText}>{date}</Text>
                    {exercisesForDate.map((exercise:any) => (
                        <View key={exercise.id} style={styles.exerciseContainer}>
                            <Text style={styles.exerciseName}>{exercise.exercise.Exercise_Name}</Text>
                            <View style={styles.detailsRow}>
                                <Text style={styles.detail1}>Muscle Group: {exercise.exercise.muscle_gp}</Text>
                                <Text style={styles.detail}>Sets: {exercise.sets}</Text>
                                <Text style={styles.detail}>Reps: {exercise.reps}</Text>
                                <Text style={styles.detail}>Weight: {exercise.weights}kg</Text>
                                <Image
                                    source={{ uri: exercise.exercise.Exercise_Image }}
                                    style={styles.image}
                                />
                            </View>
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>          
            {/* Add your components and logic here */}
        </View>
        
    );
};

const styles = StyleSheet.create({
    image: {
        width: 300, // Adjust the width as needed
        height: 200, // Adjust the height as needed
        resizeMode: 'contain', // This ensures the image scales correctly within the given dimensions
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    dateContainer: {
        marginVertical: 8,
        paddingHorizontal: 32,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A90E2',
        marginBottom: 8,
    },
    exerciseContainer: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 8,
    },
    exerciseName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 4,
    },
    detailsRow: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    detail: {
        fontSize: 14,
        color: '#666',
    },
    detail1: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
    },
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4c669f',
    },
});

export default ExerciseTracker;