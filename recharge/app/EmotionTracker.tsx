import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import storeEmotion from './EmotionTracker';

const EmotionTracker: React.FC = () => {
    

    // const handleEmotionSelect = async (emotion: string) => {
    //     const userId = '99141f80-9898-4bc4-8651-07f1de9d4377';

    //     try {
    //         console.log('Storing emotion...');
    //         await storeEmotion(userId, emotion);
    //         console.log('Emotion stored successfully');
    //     } catch (error: Error) {
    //         console.error('Error storing emotion:', error.message);
    //     }
    // };

// const EmotionTracker = () => {

//     const router = useRouter();
    return (
        <View style={styles.container}>
            <Text style={styles.hello}>Hello User,</Text>
            <Text style={styles.question}>How are you feeling today?</Text>

            <Text style={styles.selectText}>Select your Emotion</Text>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={true} horizontal> 
                <TouchableOpacity style={[styles.imageContainer]} onPress={() => handleEmotionSelect('Terrible')}>
                    <Image source={require('./Mood1.png')} style={styles.image}/>
                    <Text style={styles.terrible}>Terrible</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.imageContainer]} onPress={() => handleEmotionSelect('Sad')}>
                    <Image source={require('./Mood2.png')} style={styles.image}/>
                    <Text style={styles.sad}>Sad</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.imageContainer]} onPress={() => handleEmotionSelect('Okay')}>
                    <Image source={require('./Mood3.png')} style={styles.image}/>
                    <Text style={styles.okay}>Okay</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.imageContainer]} onPress={() => handleEmotionSelect('Happy')}>
                    <Image source={require('./Mood4.png')} style={styles.image}/>
                    <Text style={styles.happy}>Happy</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.imageContainer]} onPress={() => handleEmotionSelect('Great')}>
                    <Image source={require('./Mood5.png')} style={styles.image}/>
                    <Text style={styles.great}>Great</Text>
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
        height: '50%',
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
    },

    terrible: {
        color: '#E48389',
        fontWeight: 'bold',
        marginLeft: 23,
        fontSize: 15,
    },

    sad: {
        color: '#E29B70',
        fontWeight: 'bold',
        marginLeft: 36,
        fontSize: 15,
    },

    okay: {
        color: '#DDB654',
        fontWeight: 'bold',
        marginLeft: 32,
        fontSize: 15,
    },

    happy: {
        color: '#92AC62',
        fontWeight: 'bold',
        marginLeft: 26,
        fontSize: 15,
    },

    great: {
        color: '#56A273',
        fontWeight: 'bold',
        marginLeft: 30,
        fontSize: 15,
    },

});



export default EmotionTracker;