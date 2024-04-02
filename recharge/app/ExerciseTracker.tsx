import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router'; // Keeping router as it was
import { supabase } from '../lib/supabase';
import TrackerButton from './trackerbutton';
import TrackerNav from './TrackerNav';

type Exercise = {
  id: string;
  date: string;
  sets: number;
  reps: number;
  weights: number;
  exercise: {
    Exercise_Name: string;
    muscle_gp: string;
    Exercise_Image: string;
  };
};

const ExerciseTracker = () => {
  const [userId, setUserId] = useState<string | undefined>();
  const [exercises, setExercises] = useState<{ [key: string]: Exercise[] }>({});
  const [error, setError] = useState<string | undefined>();

  const fetchExerciseData = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.id) throw new Error('User not found');
      
      setUserId(user.id);

      let { data: exerciseTracker, error } = await supabase
        .from('exercisetracker')
        .select(`
          *, 
          exercise:exercise_id (id, Exercise_Name, muscle_gp, Exercise_Image)
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const groupedByDate = (exerciseTracker || []).reduce((acc, cur) => {
        const date = cur.date;
        acc[date] = acc[date] ? [...acc[date], cur] : [cur];
        return acc;
      }, {});

      setExercises(groupedByDate);
    } catch (error) {
      console.error('Error fetching exercise data:', error);
      setError('Failed to fetch exercise data.');
    }
  }, []);

  const handlePressExercise = (exercise) => {
    // Navigate to the ExerciseDetail screen with parameters
    router.navigate('/ExerciseDetail', { exerciseData: exercise.history });
  };

  useEffect(() => {
    fetchExerciseData();
  }, [fetchExerciseData]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise Tracker</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.navigate('/ExerciseLogger')} // Using router as originally provided
      >
        <Text style={styles.buttonText}>Log new Exercise</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        {Object.entries(exercises).sort(([date1], [date2]) => date2.localeCompare(date1)).map(([date, exercisesForDate]) => (
          <View key={date} style={styles.dateContainer}>
            <Text style={styles.dateText}>{date}</Text>
            {exercisesForDate.map(exercise => (
              <View key={exercise.id} style={styles.exerciseContainer}>
                <Text style={styles.exerciseName}>{exercise.exercise.Exercise_Name}</Text>
                <View style={styles.exerciseDetail}>
                <View style={styles.detailsRow}>
                  <Text style={styles.detail1}>Muscle Group: {exercise.exercise.muscle_gp}</Text>
                  <Text style={styles.detail}>Sets: {exercise.sets}</Text>
                  <Text style={styles.detail}>Reps: {exercise.reps}</Text>
                  <Text style={styles.detail}>Weight: {exercise.weights}kg</Text>
                </View>
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
      <TrackerNav />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0', // Lighter background for better contrast
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 16,
        textAlign: 'center', // Center title for better aesthetics
        color: '#333', // Darker color for better readability
    },
    button: {
        backgroundColor: '#4A90E2', // Use a more vibrant color for the button
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center', // Center button horizontally
        marginBottom: 20, // Add some margin below the button
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF', // White text for better contrast on the button
        textAlign: 'center', // Ensure text is centered within the button
    },
    scrollView: {
        flex: 1,
        marginHorizontal: 10, // Add some horizontal margin
    },
    exerciseDetail: {
        margin: 8, // Add margin around the details for better separation
        flexDirection: 'row', // Align details in a row for better layout
        marginVertical: 8, // Add vertical margin for better separation
    },  
    dateContainer: {
        marginVertical: 8,
        paddingHorizontal: 12, // Reduce padding for more content space
        backgroundColor: '#FFFFFF', // Ensure background is white for each date container
        borderRadius: 8, // Rounded corners for modern look
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1, // Lighter shadow for subtlety
        shadowRadius: 3.84,
        elevation: 3, // Slight elevation for a soft shadow effect
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A90E2', // Color to match the button for consistency
        marginVertical: 8, // Add vertical margin
    },
    exerciseContainer: {
        backgroundColor: '#EFEFEF', // Slightly off-white for distinction
        padding: 16,
        borderRadius: 8,
        marginBottom: 10,
    },
    exerciseName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 4,
    },
    detailsRow: {
        width: '70%', // Ensure details take up full width
        flexDirection: 'column', // Change to row for a more compact display
        justifyContent: 'space-between', // Distribute space evenly
        marginTop: 4,
        padding: 4, // Add padding for spacing
    },
    detail: {
        fontSize: 14,
        color: '#666666',
        margin: 2, // Add margin for spacing
    },
    detail1: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666666',
        margin: 2, // Consistent margin with detail
    },
    image: {
        width: 100, // Adjust the width to be smaller for compact layout
        height: 100, // Adjust the height to be smaller
        resizeMode: 'contain',
        borderRadius: 8, // Add rounded corners to the image
        marginTop: 8, // Separate the image from the details
    },
});

export default ExerciseTracker;