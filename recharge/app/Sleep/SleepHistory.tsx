import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Button, ScrollView, Alert } from 'react-native';
import { supabase } from '../../lib/supabase';
import Filter from './Filter';
import {format} from 'date-fns';

const SleepHistory = () => {
    const [userid, setUserid] = useState<string | undefined>();
    const [sleepData, setSleepData] = useState<any[]>([]);
    const [showAddSleepModal, setShowAddSleepModal] = useState(false); // State to control the visibility of the AddSleep modal


    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const handleDateChange = (start: Date, end: Date) => {
        setStartDate(start);
        setEndDate(end);
    };

    const fetchSleepData = async () => {
        try {
           const { data: { user }, } = await supabase.auth.getUser();
            console.log("User:", user?.id);
            setUserid(user?.id);

            let { data: sleeptracker, error } = await supabase
                .from('sleeptracker')
                .select('*')
                .eq('user_id', user?.id);

            if (error) {
                console.error('Error fetching sleep data:', error);
            } else {
                if (sleeptracker) {
                    setSleepData(sleeptracker); // Update state with the fetched sleep data
                }
            }
        } catch (error) {
            console.error('Error fetching sleep data:', error);
        }
    };

    useEffect(() => {   
        fetchSleepData();
    }, [showAddSleepModal]); // Refetch sleep data when showAddSleepModal changes

    const handleAddSleep = () => {
        setShowAddSleepModal(true);
    };

    const handleCloseModal = () => {
        setShowAddSleepModal(false);
    };

    const deleteSleepEntry = async (entryId: any) => {
        // Show confirmation message
        Alert.alert(
            'Confirmation',
            'Are you sure you want to delete this entry?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            const { error } = await supabase.from('sleeptracker').delete().eq('id', entryId);
    
                            if (error) {
                                console.error('Error deleting sleep entry:', error.message);
                            } else {
                                console.log('Sleep entry deleted successfully.');
                                // Fetch sleep data again after deletion
                                fetchSleepData();
                            }
                        } catch (error) {
                            console.error('Error deleting sleep entry:', error);
                        }
                    }
                }
            ]
        );
    };

    const formatDate = (date: Date) => {
        return format(date, 'MM/dd');
    };

    const formatTime = (time: Date) => {
        return format(time, 'HH:mm');
    };

    const calculateTotalSleep = (start: Date, end: Date) => {
        const startTime = start.getTime();
        const endTime = end.getTime();
        const totalSleepMinutes = (endTime - startTime) / (1000 * 60); // Convert milliseconds to minutes
    
        const hours = Math.floor(totalSleepMinutes / 60);
        const minutes = Math.round(totalSleepMinutes % 60);
    
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`; // Format as HH:MM
    };

    const sortedSleepData = sleepData.slice().sort((a, b) => {
        const dateA = new Date(a.sleep_start);
        const dateB = new Date(b.sleep_start);
        return dateB.getTime() - dateA.getTime(); 
    });

    return (
        <View style={styles.container}>
            <Filter trackerData={sleepData} onDateChange={handleDateChange}/>
            {/* <WeekChart filterStartDate={startDate} filterEndDate={endDate} sleepData={sleepData} /> */}
    
            
            <Text style={{color:'white', fontWeight:'bold', fontSize:16, marginLeft:10, marginBottom:10}}>Recent Records</Text>
            <View style={styles.header}>
                <Text style={styles.headerText}>Date</Text>
                <Text style={styles.headerText}>Start</Text>
                <Text style={styles.headerText}>End</Text>
                <Text style={styles.headerText}>Total</Text>
                <Text style={styles.headerText}>Actions</Text>
            </View>
            <ScrollView style={styles.sleepEntries}>
                {sleepData
            .sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB.getTime() - dateA.getTime();
            })
            .slice(0, 10)
            .map(sleepEntry => (
                    <View key={sleepEntry.id} style={styles.rowContainer}>
                        <Text style={styles.rowItem}>
                            {formatDate(new Date(sleepEntry.date))} {/* Display date */}
                        </Text>
                        <Text style={styles.rowItem}>
                            {formatTime(new Date(sleepEntry.sleep_start))}
                        </Text>
                        <Text style={styles.rowItem}>
                            {formatTime(new Date(sleepEntry.sleep_end))}
                        </Text>
                        <Text style={styles.rowItem}>
                            {calculateTotalSleep(new Date(sleepEntry.sleep_start), new Date(sleepEntry.sleep_end))}
                        </Text>
                        <TouchableOpacity onPress={() => deleteSleepEntry(sleepEntry.id)}>
                            <Text style={[styles.rowItem, styles.deleteButton]}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            {sleepData.length === 0 && <Text>No sleep data found.</Text>}
        </View>
    );
};
    



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#9678B4',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        paddingVertical:10,
        backgroundColor:'white',
        width:'90%',
        alignSelf:'center',
        borderTopRightRadius:5,
        borderTopLeftRadius:5,
    },
    headerText: {
        flex: 1,
        fontWeight: 'bold',
        borderRightWidth: 1,
        borderColor: 'lightgray',
        marginLeft:10,

    },
    sleepEntries: {
        height: 200, 
        borderWidth: 1,
        borderColor: '#ccc',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: 'white',
        width:'90%',
        alignSelf:'center',
        marginBottom:20,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
    },
    rowItem: {
        flex: 1,
    },
    deleteButton: {
        color: 'red',
        textAlign: 'center', 
        borderColor:'red',
        borderWidth:1,
        borderRadius:30,
        padding:2,
    },
});

export default SleepHistory;