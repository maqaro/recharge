
// ExerciseTracker.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput, ScrollView} from 'react-native';
import { useRouter } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';
import { supabase } from '../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert } from 'react-native';

type DropdownItem = {
    label: string;
    value: string;
};
let globalUser = null;



const ExerciseLogger: React.FC = () => {
    const router = useRouter();

    

    const [searchQuery, setSearchQuery] = React.useState('');
    const [exerciseData, setExerciseData] = React.useState<string[]>([]);
    const [set, setSet] = React.useState(""); // Default to 1 set
    const [reps, setReps] = React.useState("1"); // Reps input by the user
    const [weight, setWeight] = React.useState(''); // Weight input by the user
    const [userid, setUserid] = React.useState<string | undefined>(); // Change initial value to undefined
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [items, setItems] = React.useState<DropdownItem[]>([]);
    const [exercise, setExercise] = React.useState('');

    const handleLogExercise = async () => {
        console.log(`Logging exercise: ${exercise}, Reps: ${reps}, Sets: ${set}, Weight: ${weight}, User: ${userid}`);
        const date = new Date().toISOString(); // Current date-time in ISO format
    
        try {
            const { data, error } = await supabase
                .from('exercisetracker')
                .insert([
                    { exercise_id: exercise, user_id: userid, sets: set, reps: reps, weights: weight, date: date },
                ]);
    
            if (error) throw error;
    
            console.log('Added exercise log:', data);
            Alert.alert("Success", "Exercise logged successfully!");
            // Handle successful insertion, e.g., updating UI or state to reflect the new exercise log
        } catch (error) {
            console.error('Error logging exercise:', error);
            // Handle any errors, e.g., displaying an error message to the user
        }
    }

    const filteredExercises = exerciseData.filter(exercise =>
        exercise.toLowerCase().includes(searchQuery.toLowerCase())
    );
    React.useEffect(() => {
        const fetchExerciseData = async () => {
            let { data: exercise, error } = await supabase
                .from('exercise')
                .select('id,Exercise_Name');
            if (error) {
                console.error('Error fetching exercise data:', error);
            } else {
                if (exercise) {
                    const formattedItems: DropdownItem[] = exercise.map((item: any) => ({
                        label: item.Exercise_Name, // This is what the user sees
                        value: item.id,
                    }));
                    setItems(formattedItems);
                }
            }
        };

    
        fetchExerciseData();
        fetchUser();
    }, []);
    
    
    
    const fetchUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        console.log("User:", user?.id);
        setUserid(user?.id);
        return user?.id;
    };



    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.background}
            >
                <Text style={styles.title}>Exercise Logger</Text>

                <DropDownPicker
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    searchable={true}
                    searchPlaceholder="Search exercises..."
                    placeholder="Select an exercise"
                    zIndex={1000} // Ensure dropdown appears above other content; adjust as needed
                    zIndexInverse={1000} // Adjust as needed based on your layout
                    onChangeValue={(selectedId) => {
                        console.log("Selected exercise ID:", selectedId);
                        setExercise(selectedId || '');

                        const selectedExerciseName = items.find(item => item.value === selectedId)?.label;
                        console.log("Selected exercise name:", selectedExerciseName);
                    }}
                />
                <View style={{ height: 15 }} />

                <TextInput style={styles.textInputStyle} placeholder="Reps" onChangeText={setReps} value={reps} />
                <TextInput style={styles.textInputStyle} placeholder="Sets or time" onChangeText={setSet} value={set} />
                <TextInput style={styles.textInputStyle} placeholder="Weight" onChangeText={setWeight} value={weight} />

                <View style={{ height: 15 }} />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogExercise}
                >
                    <Text style={styles.buttonText}>Log Exercise</Text>
                
                </TouchableOpacity>
                <View style={{ height: 20 }} />
                <TouchableOpacity
                    style={styles.button2}
                    onPress={() => router.navigate('/ExerciseTracker')}
                >
                    <Text style={styles.buttonText}>View exercises</Text>
                </TouchableOpacity>

                    
                    {/* Add your components and logic here */}


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
    button2: {
        backgroundColor: 'lightblue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
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
        pickerStyle: {
        height: 50,
        width: 150,
        backgroundColor: '#ffffff',
        marginBottom: 20,
    },
    textInputStyle: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        textAlign: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default ExerciseLogger;