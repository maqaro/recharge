import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import { Tracker } from './classes/Tracker';
import TrackerNav from './TrackerNav';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '../lib/supabase';


const ExerciseHistory: React.FC = () => {
    const [exercisetracker, setExercisetracker] = React.useState<Tracker[]>([]);
    
    const { exerciseID } = useLocalSearchParams();
    useEffect(() => {
        
            const fetchData = async () => {
                try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user?.id) throw new Error('User not found');
                let { data: exercisetrackerData, error } = await supabase
                .from('exercisetracker')
                .select(`
                  *, 
                  exercise:exercise_id(
                    Exercise_Image
                  )
                `)
                .eq('exercise_id', exerciseID)
                .eq('user_id', user.id);

                if (error) {
                    console.error('Error fetching data: ', error);
                } else {
                    console.log(exercisetrackerData);
                    setExercisetracker(exercisetrackerData as Tracker[]); // Add type assertion here
                }
                } catch (error) {
                    console.error('Error fetching exercise data:', error);
                }
    }

    fetchData();
    }, []);

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Exercise History</Text>


            <TrackerNav />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default ExerciseHistory;