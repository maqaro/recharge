import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList, Keyboard } from 'react-native';
import { supabase } from '../lib/supabase';

const Challenges: React.FC = () => {
    const [userid, setUserid] = useState<string | undefined>();
    const [friends, setFriends] = useState<any[]>([]);
    const [filteredFriends, setFilteredFriends] = useState<any[]>([]);
    const [selectedFriend, setSelectedFriend] = useState<any>('Select a friend');
    const [challengeTitle, setChallengeTitle] = useState<string>('');
    const [challengeDetail, setChallengeDetail] = useState<string>('');
    const [challengePoints, setChallengePoints] = useState<string>('');
    const [challengeday, setChallengeday] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);

    useEffect(() => {
        getFriends();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filtered = friends.filter(friend =>
                friend.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredFriends(filtered);
        } else {
            setFilteredFriends(friends);
        }
    }, [searchQuery, friends]);

    const getFriends = async () => {
        try {
            const { data: { user }, } = await supabase.auth.getUser();
            setUserid(user?.id);
        
            let { data: friend, error } = await supabase
                .from('employee')
                .select('friends')
                .eq('employee_id', user?.id);
            if (error) {
                console.error('Error fetching employee data inner:', error);
                return;
            } 
            if (friend && friend.length > 0) {
                setFriends(Object.values(friend[0])[0]);
                setFilteredFriends(Object.values(friend[0])[0]);
            }
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };

    const handleFriendSelect = (friend) => {
        setSelectedFriend(friend);
        setIsPickerVisible(false);
        setSearchQuery('');
        Keyboard.dismiss();
    };
    const resetForm = () => {
        // Reset all form fields to their initial state
        setSelectedFriend('Select a friend');
        setChallengeTitle('');
        setChallengeDetail('');
        setChallengePoints('');
        setChallengeday('');
        setSearchQuery('');
    
        // Close any open modals
        setIsPickerVisible(false);
    };
    

    const handleSubmit = async () => {
        if (!selectedFriend || !challengeTitle || !challengeDetail || !challengePoints || !challengeday) {
            alert("Please fill in all the fields.");
            return;
        }
        console.log(selectedFriend,"  ", challengeTitle,"  ", challengeDetail,"  ", challengePoints,"  ", challengeday,"  ", userid);
    
        // Converting challengePoints to a number and challengeday to an integer
        const pointsNum = parseInt(challengePoints, 10);
        const daysNum = parseInt(challengeday, 10);
    
        if (isNaN(pointsNum) || isNaN(daysNum)) {
            alert("Please enter valid numbers for points and days.");
            return;
        }
    
        // Calculate the end date
        const startDate = new Date(); // Assuming the start date is the current date
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + daysNum); // Add the days to complete to get the end date
    
        try {

            let { data: employee, error: employeeError } = await supabase
            .from('employee')
            .select('employee_id')
            .eq('username', selectedFriend)
            .single();
            console.log(employee);

            if (employeeError) throw employeeError;

            if (!employee) {
                alert("Could not find the selected friend.");
                return;
            }
            const { data, error } = await supabase
                .from('challenges')
                .insert([
                    {
                        receiver: employee.employee_id,
                        sender: userid,
                        title: challengeTitle,
                        detail: challengeDetail,
                        points: pointsNum,
                        end: endDate.toISOString(), // Store the end date in ISO format
                    },
                ]);
    
            if (error) throw error;
    
            alert("Challenge submitted successfully!");
            console.log("Inserted data:", data);
            resetForm(); // Reset form and close modal
        } catch (error) {
            alert(`Error submitting challenge: ${error.message}`);
            console.error("Error inserting data:", error);
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Challenge a Friend</Text>
            <TouchableOpacity onPress={() => setIsPickerVisible(true)} style={styles.dropdownButton}>
                <Text style={styles.dropdownButtonText}>{selectedFriend}</Text>
            </TouchableOpacity>
            <Modal visible={isPickerVisible} transparent={true} animationType="slide">
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsPickerVisible(false)}>
                    <View style={styles.modalView} onStartShouldSetResponder={() => true}>
                        <TextInput
                            autoFocus
                            style={styles.searchBar}
                            placeholder="Search friends..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        <FlatList
                            data={filteredFriends}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleFriendSelect(item)} style={styles.listItem}>
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
            <TextInput
                style={styles.input}
                placeholder="Challenge Title"
                onChangeText={setChallengeTitle}
                value={challengeTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Challenge Detail"
                onChangeText={setChallengeDetail}
                value={challengeDetail}
            />
            <TextInput
                style={styles.input}
                placeholder="Days to complete challenge"
                keyboardType="numeric"
                onChangeText={setChallengeday}
                value={challengeday}
            />
            <TextInput
                style={styles.input}
                placeholder="Challenge Points"
                keyboardType="numeric"
                onChangeText={setChallengePoints}
                value={challengePoints}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Send Challenge</Text>
            </TouchableOpacity>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F7F7F7',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    dropdownButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    dropdownButtonText: {
        fontSize: 16,
        color: '#333',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '90%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    searchBar: {
        height: 40,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    input: {
        height: 40,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    submitButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Challenges;
