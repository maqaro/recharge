
// ExerciseTracker.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput, ScrollView} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';


const ExerciseTracker: React.FC = () => {
    const router = useRouter();

    const handleStartExercise = () => {
        // Logic for starting exercise
    };
    const [selectedExercise, setSelectedExercise] = React.useState<string | null>(null);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [exerciseData, setExerciseData] = React.useState<string[]>([]);
    
    const filteredExercises = exerciseData.filter(exercise =>
        exercise.toLowerCase().includes(searchQuery.toLowerCase())
    );
    

    React.useEffect(() => {
        const fetchExerciseData = async () => {
            let { data: exercise, error } = await supabase
                .from('exercise')
                .select('Exercise_Name');
            console.log(exercise);
            if (error) {
                console.error('Error fetching exercise data:', error);
            } else {
                if (exercise) {
                    setExerciseData(exercise.map((item: any) => item.Exercise_Name));
                }
            }
        };

        fetchExerciseData();
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.background}
            >
                <Text style={styles.title}>Exercise Tracker</Text>
                <Text style={styles.title}>Exercise Tracker</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for an exercise"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <ScrollView style={styles.exerciseList}>
                    {filteredExercises.map((exercise, index) => (
                        <TouchableOpacity key={index} style={styles.exerciseItem}>
                            <Text style={styles.exerciseText}>{exercise}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

 

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleStartExercise}
                >
                    <Text style={styles.buttonText}>Start Exercise</Text>
                </TouchableOpacity>


            </LinearGradient>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4c669f',
    },
    dropdown: {
        width: '80%', // Example width
        height: 50, // Set a fixed height for the picker
        backgroundColor: 'white', // Assuming you want a white background
        borderColor: '#ccc', // Light grey border
        borderWidth: 1, // One pixel border width
        borderRadius: 5, // Rounded corners
        marginBottom: 20, 
        
    },
    // Existing styles...
    searchInput: {
        height: 40,
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        color: 'black',
        marginBottom: 20,
    },
    exerciseList: {
        width: '80%',
    },
    exerciseItem: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    exerciseText: {
        color: 'black',
    },
});

export default ExerciseTracker;