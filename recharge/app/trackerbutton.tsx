import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';



const TrackerButton = () => {
    return (
        <TouchableOpacity
        style={styles.button}
        onPress={() => router.navigate('/Homepage')}
        >
        <Text style={styles.buttonText}>Home page</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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

export default TrackerButton;