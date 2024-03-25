import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Button, ScrollView } from 'react-native';
import { supabase } from '../lib/supabase';
import AddSleep from './Sleep/AddSleep'; 
import Filter from './Sleep/Filter';
import SleepChart from './Sleep/SleepChart';
import {format} from 'date-fns';

const SleepTracker = () => {
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
    };

    const formatDate = (date: Date) => {
        return format(date, 'MM/dd/yyyy');
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
            <Text>Recent Entries</Text>
            {sleepData.length > 0 ? (
            <ScrollView style={styles.sleepEntries}>
                {sortedSleepData.map(sleepEntry => (
                    <View key={sleepEntry.id} style={styles.rowContainer}>
                        <View style={styles.rowItem}>
                            <Text>Start: {formatDate(new Date(sleepEntry.sleep_start))} {formatTime(new Date(sleepEntry.sleep_start))}</Text>
                        </View>
                        <View style={styles.rowItem}>
                            <Text>End: {formatDate(new Date(sleepEntry.sleep_end))} {formatTime(new Date(sleepEntry.sleep_end))}</Text>
                        </View>
                        <View style={styles.rowItem}>
                            <Text>Total: {calculateTotalSleep(new Date(sleepEntry.sleep_start), new Date(sleepEntry.sleep_end))}</Text>
                        </View>
                        <View style={styles.rowItem}>
                            <TouchableOpacity onPress={() => deleteSleepEntry(sleepEntry.id)}>
                                <Text style={styles.deleteButton}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
            ) : (
            <Text>No sleep data found.</Text>
            )}

            <Filter onDateChange={handleDateChange}/>
            <SleepChart filterStartDate={startDate} filterEndDate={endDate} sleepData={sleepData} />

            {/* Button to add sleep */}
            <TouchableOpacity style={styles.addButton} onPress={handleAddSleep}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>

            {/* Modal for AddSleep */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showAddSleepModal}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                        <Text style={styles.closeButtonText}>x</Text>
                    </TouchableOpacity>
                    <AddSleep />
                </View>
            </Modal>

        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },

    sleepEntries:{
        flex:3,
        width:'100%',
        overflow:'hidden',
    },

    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },

    rowItem: {
        flex: 1,
    },

    deleteButton: {
        color: 'red',
    },

    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default SleepTracker;

