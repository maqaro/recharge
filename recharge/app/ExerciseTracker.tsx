import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { supabase } from '../lib/supabase';

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
                exercise:exercise_id (id, Exercise_Name)
            `)
            .eq('user_id', user?.id);
            console.log("User ID:", user?.id);
        
            if (error) {
                console.error('Error fetching exercise data:', error);
            } else {
                if (exercisetracker) {
                    setExercises(exercisetracker);
                    console.log(exercisetracker);
                    console.log("exercise", exercises);

                }
            }
        };

        fetchExerciseData();
    }, []);




    return (
        <View style={styles.container}>

            <Text style={styles.title}>Exercise Tracker</Text>
            <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.navigate('/ExerciseLogger')}
                >
                    <Text style={styles.buttonText}>Log new Exercise</Text>
            </TouchableOpacity>
            
            {/* Add your components and logic here */}
        </View>
    );
};

const styles = StyleSheet.create({

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