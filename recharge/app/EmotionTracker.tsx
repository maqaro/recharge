import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const EmotionTracker = () => {

    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text style={styles.hello}>Hello User,</Text>
            <Text style={styles.question}>How are you feeling today?</Text>

            <Text style={styles.selectText}>Select your Emotion</Text>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={true} horizontal> 
                <TouchableOpacity style={[styles.imageContainer]} onPress={() => console.log('Rectangle 1 clicked')}>
                    <Image source={require('./images/Mood1.png')} style={styles.image}/>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.imageContainer]} onPress={() => console.log('Rectangle 1 clicked')}>
                    <Image source={require('./images/Mood2.png')} style={styles.image}/>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.imageContainer]} onPress={() => console.log('Rectangle 1 clicked')}>
                    <Image source={require('./images/Mood3.png')} style={styles.image}/>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.imageContainer]} onPress={() => console.log('Rectangle 1 clicked')}>
                    <Image source={require('./images/Mood4.png')} style={styles.image}/>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.imageContainer]} onPress={() => console.log('Rectangle 1 clicked')}>
                    <Image source={require('./images/Mood5.png')} style={styles.image}/>
                </TouchableOpacity>

            </ScrollView>

            <Text style={styles.selectText}>Select your Emotion</Text>

        </View>
    );
};


const styles = StyleSheet.create({

    container: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },

    scrollContainer: {
        flexGrow: 1,
    },

    hello: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        marginTop: 30,
    },

    question: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        marginBottom: 50,
        marginTop: 20,
    },

    selectText: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        right: 90,
        color: 'black',
        marginTop: 0,
    },

    imageContainer: {
        marginTop: 20,
        marginLeft: 10,
    },

    image: {
        width: 100,
        height: 150,
        resizeMode: 'contain',
    }

});



export default EmotionTracker;