
// ExerciseTracker.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput, ScrollView} from 'react-native';
import { useRouter } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';
import { supabase } from '../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';
type DropdownItem = {
    label: string;
    value: string;
};

const ExerciseTracker: React.FC = () => {
    const router = useRouter();

    const handleStartExercise = () => {
        // Logic for starting exercise
    };

    const [searchQuery, setSearchQuery] = React.useState('');
    const [exerciseData, setExerciseData] = React.useState<string[]>([]);
    const [selectedSet, setSelectedSet] = React.useState('1'); // Default to 1 set
    const [reps, setReps] = React.useState(''); // Reps input by the user
    const [weight, setWeight] = React.useState(''); // Weight input by the user

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [items, setItems] = React.useState<DropdownItem[]>([]);


    
    
    const filteredExercises = exerciseData.filter(exercise =>
        exercise.toLowerCase().includes(searchQuery.toLowerCase())
    );
    React.useEffect(() => {
        const fetchExerciseData = async () => {
            let { data: exercise, error } = await supabase
                .from('exercise')
                .select('Exercise_Name');
            if (error) {
                console.error('Error fetching exercise data:', error);
            } else {
                if (exercise) {
                    const formattedItems: DropdownItem[] = exercise.map((item: any) => ({
                        label: item.Exercise_Name,
                        value: item.Exercise_Name,
                    }));
                    setItems(formattedItems);
                }
            }
        };

        fetchExerciseData();
    }, []);
    

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
                    //onChangeValue={(value:string) => {
                    //    console.log("Selected exercise:", value);
                        // Additional logic for when an item is selected
                    //}}
                />
                <TextInput style={styles.textInputStyle} placeholder="Reps" onChangeText={setReps} value={reps} />

                
                

                <TextInput style={styles.textInputStyle} placeholder="Weight" onChangeText={setWeight} value={weight} />



 

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

export default ExerciseTracker;