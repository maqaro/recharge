import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Entypo } from '@expo/vector-icons';

interface StreakProps {}

const Streak: React.FC<StreakProps> = () => {
    const [userid, setUserid] = useState<string | undefined>();
    const [streakCount, setStreakCount] = useState<number>(0);
    const [lastSevenDays, setLastSevenDays] = useState<(string | null)[]>(new Array(7).fill(null));


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                const id = user?.id;
                setUserid(id);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchStreakCount = async () => {
            try {
                if (!userid) return;

                let currentDate = new Date().toISOString().split('T')[0];
                let streak = 0;

                while (true) {
                    const { data, error } = await supabase
                        .from('emotiontracker')
                        .select('date')
                        .eq('user_id', userid)
                        .eq('date', currentDate)

                    if (error) {
                        throw error;
                    }

                    if (!data || data.length === 0) {
                        break; // Streak broken
                    }

                    streak++;
                    
                    // Move to previous day
                    const prevDate = new Date(currentDate);
                    prevDate.setDate(prevDate.getDate() - 1);
                    currentDate = prevDate.toISOString().split('T')[0];
                }

                setStreakCount(streak);
            } catch (error) {
                console.error('Error fetching streak count:', error);
            }
        };

        fetchStreakCount();
    }, [userid]);

    useEffect(() => {
        const fetchLastSevenDays = async () => {
            try {
                if (!userid) return;

                let currentDate = new Date().toISOString().split('T')[0];
                const lastSevenDaysData: (string | null)[] = [];

                for (let i = 0; i < 7; i++) {
                    const { data, error } = await supabase
                        .from('emotiontracker')
                        .select('date')
                        .eq('user_id', userid)
                        .eq('date', currentDate)
                        .single();

                    if (error) {
                        throw error;
                    }

                    lastSevenDaysData.push(data ? data.date : null);

                    const prevDate = new Date(currentDate);
                    prevDate.setDate(prevDate.getDate() - 1);
                    currentDate = prevDate.toISOString().split('T')[0];
                }

                setLastSevenDays(lastSevenDaysData.reverse());
            } catch (error) {
            }
        };

        fetchLastSevenDays();
    }, [userid]);

    return (
        <View style={styles.container}>
            <Text style={styles.streakText}>Streak Count: {streakCount}</Text>
            <View style={{flexDirection: 'row', padding: 10}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.circleContainer}>
                    {[...Array(7)].map((_, index) => {
                        const reversedIndex = 6 - index;
                        return (
                        <View key={index} style={[styles.circle, streakCount > reversedIndex ? styles.greenCircle : styles.redCircle]}>
                            {streakCount > reversedIndex ? (
                            <Entypo style={{alignSelf:'center', marginTop:2}} name="trophy" size={35} color="gold" />
                            ) : (
                            <Entypo style={{alignSelf:'center'}} name="circle-with-cross" size={40} color="red" />
                            )}
                        </View>
                        );
                    })}
                    </View>
                </ScrollView>
            </View>   
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginBottom: 10,
        borderColor:'black',
        borderBottomWidth:0.5,
    },
    circleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
        marginTop:10
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginHorizontal: 5,
    },
    greenCircle: {
        backgroundColor:'white',
        borderRadius:20,
    },
    redCircle: {
        backgroundColor:'white',
        borderRadius:20,
    },
    streakText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:15,
        marginLeft:10,
        color:'white',

    },
});

export default Streak;

