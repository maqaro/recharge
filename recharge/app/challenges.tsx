import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList, Keyboard } from 'react-native';
import { supabase } from '../lib/supabase';

const Challenges = () => {
    const [userid, setUserid] = useState<string | undefined>();
    const [friends, setFriends] = useState<any[]>([]);
    const [filteredFriends, setFilteredFriends] = useState<any[]>([]);
    const [selectedFriend, setSelectedFriend] = useState<string>('Select a friend');
    const [challengeTitle, setChallengeTitle] = useState<string>('');
    const [challengeDetail, setChallengeDetail] = useState<string>('');
    const [challengePoints, setChallengePoints] = useState<string>('');
    const [challengeday, setChallengeday] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);
    const [receivedChallenges, setReceivedChallenges] = useState<any[]>([]);

    useEffect(() => {
        getFriends();
        fetchUserId();
    }, []);

    const fetchUserId = async () => {
        const session = supabase.auth.session();
        setUserid(session?.user?.id);
        fetchReceivedChallenges(session?.user?.id);
    };

    useEffect(() => {
        fetchReceivedChallenges(userid);
    }, [userid]);

    const fetchReceivedChallenges = async (id: string | undefined) => {
        if (!id) return;

        try {
            let { data: challenges, error } = await supabase
                .from('challenges')
                .select(`
                    *,
                    employee:sender (username)
                `) // Assuming 'sender' is a foreign key in 'challenges' pointing to 'employee'
                .eq('receiver', id);
            console.log("Challenges:", challenges);
            if (error) throw error;
            setReceivedChallenges(challenges);
            console.log("Received challenges:", challenges);
        } catch (error) {
            console.error("Error fetching received challenges:", error.message);
        }
    };

    useEffect(() => {
        const filtered = searchQuery
            ? friends.filter(friend => friend.toLowerCase().includes(searchQuery.toLowerCase()))
            : friends;
        setFilteredFriends(filtered);
    }, [searchQuery, friends]);

    const getFriends = async () => {
        try {
            const { data: { user }, } = await supabase.auth.getUser();
            if (!user) return;

            setUserid(user.id);
            let { data: friend, error } = await supabase
                .from('employee')
                .select('username') // Assuming 'username' holds the friend's name
                .not('id', 'eq', user.id); // Assuming you don't want to fetch the current user
            
            if (error) {
                console.error('Error fetching employee data:', error);
                return;
            }
            if (friend) {
                setFriends(friend.map(f => f.username)); // Assuming 'username' is the field you want
                setFilteredFriends(friend.map(f => f.username));
            }
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };

    const handleFriendSelect = (friend: string) => {
        setSelectedFriend(friend);
        setIsPickerVisible(false);
        setSearchQuery('');
        Keyboard.dismiss();
    };

    const resetForm = () => {
        setSelectedFriend('Select a friend');
        setChallengeTitle('');
        setChallengeDetail('');
        setChallengePoints('');
        setChallengeday('');
        setSearchQuery('');
        setIsPickerVisible(false);
    };

    const handleSubmit = async () => {
        if (!selectedFriend || !challengeTitle || !challengeDetail || !challengePoints || !challengeday) {
            alert("Please fill in all the fields.");
            return;
        }

        const pointsNum = parseInt(challengePoints, 10);
        const daysNum = parseInt(challengeday, 10);

        if (isNaN(pointsNum) || isNaN(daysNum)) {
            alert("Please enter valid numbers for points and days.");
            return;
        }

        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + daysNum);

        try {
            let { data: employee, error: employeeError } = await supabase
                .from('employee')
                .select('id')
                .eq('username', selectedFriend)
                .single();

            if (employeeError) throw employeeError;
            if (!employee) {
                alert("Could not find the selected friend.");
                return;
            }

            const { data, error } = await supabase
                .from('challenges')
                .insert([{
                    receiver: employee.id,
                    sender: userid,
                    title: challengeTitle,
                    detail: challengeDetail,
                    points: pointsNum,
                    end: endDate.toISOString(),
                }]);

            if (error) throw error;
            alert("Challenge submitted successfully!");
            resetForm();
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
            <View style={styles.container}>
                <Text style={styles.header}>Received Challenges</Text>
                <FlatList
                    data={receivedChallenges}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                    <View style={[styles.challengeItem, item.done ? styles.challengeDoneBackground : styles.challengePendingBackground]}>
                        <Text style={styles.challengeTitle}>{item.title.trim()}</Text>
                        <Text style={styles.challengeDetail}>Detail: {item.detail}</Text>
                        <Text style={styles.challengePoints}>Points: {item.points}</Text>
                        <Text style={styles.challengeEnd}>Due by: {item.end}</Text>
                        <Text style={styles.challengeStatus}>Status: {item.done ? 'Completed' : 'Pending'}</Text>
                        <Text style={styles.challengeSender}>From: {item.employee.username}</Text>
                    </View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F7F7F7', // Light gray background for the entire screen
    },
    header: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    challengeItem: {
        padding: 20,
        borderRadius: 10,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4.65,
        elevation: 7,
    },
    challengeDoneBackground: {
        backgroundColor: '#E8F5E9', // Soft green for completed challenges
    },
    challengePendingBackground: {
        backgroundColor: '#FFF3E0', // Soft orange for pending challenges
    },
    challengeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#424242',
        marginBottom: 8,
    },
    challengeDetail: {
        fontSize: 16,
        color: '#616161',
        marginBottom: 4,
    },
    challengePoints: {
        fontSize: 16,
        color: '#616161',
        marginBottom: 4,
    },
    challengeEnd: {
        fontSize: 16,
        color: '#616161',
        marginBottom: 4,
    },
    challengeStatus: {
        fontSize: 16,
        fontWeight: '500',
        color: '#424242',
    },
    challengeDone: {
        fontSize: 14,
        fontWeight: '500',
    },
    challengeText: {
        fontSize: 16,
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
