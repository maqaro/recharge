import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { supabase } from '../lib/supabase';
import WaterTracker from './WaterTracker';
import { ProgressBar } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { useRouter } from 'expo-router';
import NavBar from './NavBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';


export default function DashBoard() {
    const router = useRouter();

    const [userId, setUserId] = useState<string | undefined>();
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const [exercise, setExercise] = useState(0);

    const [water, setWater] = useState(false);
    const [waterGoal, setWaterGoal] = useState<number | undefined>(undefined);
    const [waterDrank, setWaterDrank] = useState<number | undefined>(undefined);

    const [sleep, setSleep] = useState(false);
    const [sleepHour, setSleepHour] = useState(0);

    const [emotion, setEmotion] = useState(false);
    const [emotionValue, setEmotionValue] = useState("");
    const emotionsSuggestingMentor = ["Sad", "Angry", "Anxious", "Frustrated"];


    const [journal, setJournal] = useState(false);

    const [error, setError] = useState<string | undefined>();





    const fetchTrackerData = useCallback(async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user?.id) throw new Error('User not found');

        setUserId(user.id);
        try {

            let { data: exerciseTracker } = await supabase
                .from('exercisetracker')
                .select(`
          *
        `)
                .eq('user_id', user.id)
                .eq('date::date', currentDate);

            if (error) throw error;

            console.log(exerciseTracker);
            if (exerciseTracker?.length !== 0) {
                console.log('Exercise Tracker is true');
                setExercise(1);
                console.log(exerciseTracker);
            }
            else {
                console.log('Exercise Tracker is false');
                setExercise(0);
            }
        } catch (error) {
            console.error('Error fetching exercise data:', error);
            setError('Failed to fetch exercise data.');
        }

        try {
            let { data: waterTracker } = await supabase
                .from('watertracker')
                .select(`
              *
            `)
                .eq('user_id', user.id)
                .eq('date::date', currentDate);
            console.log(waterTracker);
            if (waterTracker?.length !== 0) {
                console.log('Water Tracker ', waterTracker);
                setWaterDrank(waterTracker[0].water_intake_ml);
                setWaterGoal(waterTracker[0].water_intake_goal);
                setWater(true);
                console.log('Water Tracker is true');
            }

        } catch (error) {
            setError('Failed to fetch water data.');
            console.error('Error fetching water data:', error);
        }

        try {
            let { data: sleepTracker } = await supabase
                .from('sleeptracker')
                .select(`
              *
            `)
                .eq('user_id', user.id)
                .eq('date::date', currentDate);
            console.log(sleepTracker);
            if (sleepTracker?.length !== 0) {
                console.log('Sleep Tracker is true');
                setSleep(true);
                const sleepStart = new Date(sleepTracker[0]?.sleep_start);
                const sleepEnd = new Date(sleepTracker[0]?.sleep_end);
                const sleepDuration = (sleepEnd.getTime() - sleepStart.getTime()) / (1000 * 60 * 60);
                const sleepHours = sleepDuration.toFixed(1);
                console.log(sleepHours);
                setSleepHour(sleepHours);

            }
        }
        catch (error) {
            setError('Failed to fetch sleep data.');
            console.error('Error fetching sleep data:', error);
        }

        try {
            let { data: emotionTracker } = await supabase
                .from('emotiontracker')
                .select(`
          *
        `)
                .eq('user_id', user.id)
                .eq('date::date', currentDate);
            console.log(emotionTracker);
            if (emotionTracker?.length !== 0) {
                console.log('Emotion Tracker is true', emotionTracker[0].emotion);
                setEmotion(true);
                setEmotionValue(emotionTracker[0].emotion);
            }
        } catch (error) {
            setError('Failed to fetch emotion data.');
            console.error('Error fetching emotion data:', error);
        }
        try {
            let { data: journalTracker } = await supabase
                .from('dailyjournal')
                .select(`
          *
        `)
                .eq('user_id', user.id)
                .eq('created_on', currentDate);
            console.log("jounral ", journalTracker);
            if (journalTracker?.length !== 0 && journalTracker) {
                console.log('Journal Tracker is true');
                setJournal(true);
            }
        } catch (error) {
            setError('Failed to fetch journal data.');
            console.error('Error fetching journal data:', error);
        }
    }, [currentDate]);
    useEffect(() => {
        fetchTrackerData();
    }, [fetchTrackerData]);

    return (
        <View style={styles.full}>
            <TouchableOpacity style={{paddingLeft:30, width:100}}onPress={() => router.navigate('/Homepage')}>

                <Ionicons name="chevron-back-circle-outline" size={30}  color="black" />
                <Text>Back</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#268394', margin: 8, textAlign: 'center' }}>Your Day at a Glance</Text>
            
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.overview}
                        onPress={() => router.navigate('/EmotionTracker')}
                    >
                        <Icon name="emoji-emotions" color="#268394" size={30} style={{ alignItems: 'flex-start' }} />
                        <Text style={styles.dataLabel}>Mood:</Text>
                        <Text style={styles.dataValue}>{emotion ? `You're feeling ${emotionValue} today` : 'How are you feeling? Tap to share.'}</Text>
                        {emotion && emotionsSuggestingMentor.includes(emotionValue) && (
                            <Text style={styles.recommendation}>
                                Feeling {emotionValue.toLowerCase()}? It might be helpful to talk to a mentor about it.
                            </Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.overview}
                        onPress={() => router.navigate('/ExerciseTracker')}
                    >
                        <Icon name="fitness-center" color="#268394" size={30} style={{ alignItems: 'flex-start' }} />
                        <Text style={styles.dataLabel}>Exercise:</Text>
                        <Text style={styles.dataValue}>{exercise ? 'Awesome job! Tap to see your workout details.' : 'Get moving! Log your exercise here.'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.overview}
                        onPress={() => router.navigate('/WaterTracker')}
                    >
                        <Icon name="water-drop" color="#268394" size={30} style={{ alignItems: 'flex-start' }} />
                        <Text style={styles.dataLabel}>Hydration:</Text>
                        <ProgressBar progress={water ? waterDrank / waterGoal : 0} color="#268394" />
                        <Text></Text>
                        <Text style={styles.dataValue}>{water ? `${waterDrank}ml down, only ${waterGoal - waterDrank}ml to go!` : 'Tap to track your water intake.'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.overview}
                        onPress={() => router.navigate('/SleepTracker')}
                    >
                        <Icon name="bedtime" color="#268394" size={30} style={{ alignItems: 'flex-start' }} />
                        <Text style={styles.dataLabel}>Sleep:</Text>
                        <Text style={styles.dataValue}>{sleep ? `${sleepHour} hours of restful sleep` : 'How did you sleep? Log it here.'}</Text>
                        {sleep && sleepHour < 7 && (
                            <Text style={styles.recommendation}>
                                Speak to a mentor today on improving your sleep habits.
                            </Text>)}
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.overview}
                        onPress={() => router.navigate('/DailyJournal')}
                    >
                        <Icon name="book" color="#268394" size={30} style={{ alignItems: 'flex-start' }} />
                        <Text style={styles.dataLabel}>Journal:</Text>
                        <Text style={styles.dataValue}>{journal ? 'Reflective! View your entries here.' : 'Share your thoughts. Tap to journal.'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.overview}
                        onPress={() => router.navigate('/MatchWithMentor')}
                    >
                        <Icon name="people" color="#268394" size={30} style={{ alignItems: 'flex-start' }} />
                        <Text style={styles.dataLabel}>Mentor Match: </Text>
                        <Text style={styles.dataValue}>Talk to a mentor about anything!</Text>
                    </TouchableOpacity>
                </View>
            <NavBar />
        </View>
    );
};

const styles = StyleSheet.create({
    recommendation: {
        fontSize: 14,
        color: '#DAA520', // Example color: golden for attention
        marginTop: 8,
    },
    overview: {
        flex: 1,
        width: '50%',
        aspectRatio: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        margin: 7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    full: {
        flex: 1,
        alignContent: 'center',
    },
    row: {
         flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 15,
        marginRight: 15
    },

    dataLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 8,
        color: '#268394', // Teal color for consistency
        marginBottom: 4, // Spacing between label and value
    },
    dataValue: {
        fontSize: 13,
        color: '#105763', // A darker shade of teal for emphasis
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});


