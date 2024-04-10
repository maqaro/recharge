// ExerciseTracker.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput, Image} from 'react-native';
import { useRouter } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';
import { supabase } from '../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert } from 'react-native';
import { useState } from 'react';
import NavBar from './NavBar';
import { Ionicons } from '@expo/vector-icons';


type DropdownItem = {
    label: string;
    value: string;
};
let globalUser = null;



const ExerciseLogger: React.FC = () => {
    const router = useRouter();

    

    const [searchQuery, setSearchQuery] = useState('');
    const [exerciseData, setExerciseData] = useState<string[]>([]);
    const [set, setSet] = useState(""); // Default to 1 set
    const [reps, setReps] = useState(""); // Reps input by the user
    const [weight, setWeight] = useState(''); // Weight input by the user
    const [userid, setUserid] = useState<string | undefined>(); // Change initial value to undefined
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState<DropdownItem[]>([]);
    const [exercise, setExercise] = useState('');
    const [selectedExerciseImage, setSelectedExerciseImage] = useState('');
    const [selectedExerciseName, setSelectedExerciseName] = useState('');
    const [selectedExerciseMuscleGroup, setSelectedExerciseMuscleGroup] = useState('');
    const [selectedExerciseEquipment, setSelectedExerciseEquipment] = useState('');

    const handleLogExercise = async () => {
        console.log("Logging exercise: ${exercise}, Reps: ${reps}, Sets: ${set}, Weight: ${weight}, User: ${userid}");
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
            router.navigate('/ExerciseLogger');
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
                .select('id, Exercise_Name, Exercise_Image, muscle_gp, Equipment'); 
            if (error) {
                console.error('Error fetching exercise data:', error);
            } else {
                if (exercise) {
                    const formattedItems = exercise.map(item => ({
                        label: item.Exercise_Name, 
                        value: item.id,
                        image: item.Exercise_Image, 
                        muscle_gp: item.muscle_gp, // Assuming your database column names
                        Equipment: item.Equipment,
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

    const BackButton = () => (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.navigate('/ExerciseTracker')}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      );


    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#05999E', '#1E5B53']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.background}
            >

            <BackButton />

          


                <Text style={styles.title}>Exercise Logger</Text>
                <View style={{ height: 15 }} />
                <View>

                    {selectedExerciseImage ? (
                        <Image
                            source={{ uri: selectedExerciseImage }}
                            style={styles.exerciseImage}
                        />
                    ) : (
                        <Text>Select an exercise to see the image.</Text>
                    )}
                    {selectedExerciseName ? (
                        <Text style={styles.detail}>
                            {selectedExerciseName}
                        </Text>
                    ) : null}
                    {selectedExerciseMuscleGroup ? (
                        <Text style={styles.detail}>
                            Muscle Group: {selectedExerciseMuscleGroup}
                        </Text>
                    ) : null}
                    {selectedExerciseEquipment ? (
                        <Text style={styles.detail}>
                            Equipment: {selectedExerciseEquipment}
                        </Text>
                    ) : null}
                </View>
                <View style={{ height: 15}} />
                        
                <DropDownPicker
                    style={styles.pickerStyle}
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
                    onChangeValue={(selectedId) => {
                        console.log("Selected exercise ID:", selectedId);
                        setExercise(selectedId || '');
                
                        // Find the selected item based on the ID
                        const selectedItem = items.find(item => item.value === selectedId);
                        console.log("Selected item:", selectedItem);
                        setSelectedExerciseName(selectedItem?.label || '');
                        setSelectedExerciseMuscleGroup(selectedItem?.muscle_gp || '');
                        setSelectedExerciseEquipment(selectedItem?.Equipment || '');
                
                        // Find and set the selected exercise's image URL
                        const selectedImage = selectedItem?.image; // Assuming your items include an 'image' property
                        setSelectedExerciseImage(selectedImage || '');
                    }}
                />
                <View style={{ height: 15 }} />



                <TextInput style={styles.textInputStyle} placeholder="Sets or time" onChangeText={setSet} value={set} />
                <TextInput style={styles.textInputStyle} placeholder="Reps" onChangeText={setReps} value={reps} />
                <TextInput style={styles.textInputStyle} placeholder="Weight (kg)" onChangeText={setWeight} value={weight} />

                <View style={{ height: 15 }} />
                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
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
                </View>

                    
                    {/* Add your components and logic here */}

                
            </LinearGradient>
            <NavBar />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    detail:{
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 8,
    },
    exerciseImage: {
        width: 300, 
        height: 200,
        resizeMode: 'contain',
        borderRadius: 10, 
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
        width: '37%',
        backgroundColor: 'lightblue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginLeft: 10,
    },
    button: {
        width: '37%',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 10,
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
        justifyContent: 'center',
        height: 50,
        width: '80%',
        backgroundColor: '#ffffff',
        marginBottom: 20,
        marginLeft: 43,
    },
    textInputStyle: {
        marginRight: 20,
        marginLeft: 20,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        textAlign: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
     backButton: {
      position: 'absolute',
      top: 32, 
      left: 20,
      zIndex: 10,
    },
});

export default ExerciseLogger;