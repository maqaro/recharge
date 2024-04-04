import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';


const GuidedSession = () => {
  const router = useRouter();


  return (
    <View style={styles.container}>
        <LinearGradient style={styles.LinearGradient} colors={['#eccbaa', '#65AAB3']} >
                <Text style={styles.title}>Guided Sessions</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.navigate('/BreathingExercises')}>
                <Text style={styles.buttonText}>Breathing Exercises</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => router.navigate('/Meditation')}>
                <Text style={styles.buttonText}>Meditation</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => router.navigate('/Yoga')}>
                <Text style={styles.buttonText}>Yoga</Text>
            </TouchableOpacity>
        </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    LinearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height:'100%', 
        width:'100%',
    },
    title: {
        fontSize: 44,
        fontWeight: 'bold',
        marginBottom: '75%',
    },
    button: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        padding: 15,
        borderRadius: 10,
        marginBottom: '5%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        padding: '2%',
    },
});

export default GuidedSession;