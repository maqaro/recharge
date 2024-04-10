import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../lib/supabase';
import NavBar from './NavBar';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const ViewFriends = () => {
    const [userId, setUserId] = useState<string | undefined>();
    const [friends, setFriends] = useState<string[]>([]);
    const [requests, setRequests] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        await Promise.all([getFriends(), getRequests()]);
    };

    async function getFriends() {
        // Fetch Friends logic
    }

    async function getRequests() {
        // Fetch Requests logic
    }

    // Accept and Deny Request logic

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#6DD5FA" />
            <LinearGradient colors={['#6DD5FA', '#FFFFFF']} style={styles.gradient}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.addButtonContainer}>
                        <TouchableOpacity style={styles.addButton} onPress={() => router.navigate('./Friends')}>
                            <MaterialIcons name="person-add" size={24} color="white" />
                            <Text style={styles.addButtonText}>Add Friends</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Requests</Text>
                        {requests.length > 0 ? requests.map((request, index) => (
                            <View key={index} style={styles.listItem}>
                                <Text style={styles.listItemText}>{request}</Text>
                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={() => {/* Accept logic */}}>
                                        <Text style={styles.buttonText}>Accept</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.button, styles.denyButton]} onPress={() => {/* Deny logic */}}>
                                        <Text style={styles.buttonText}>Decline</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )) : <Text style={styles.emptyText}>No new requests</Text>}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Friends</Text>
                        {friends.length > 0 ? friends.map((friend, index) => (
                            <View key={index} style={styles.listItem}>
                                <Text style={styles.listItemText}>{friend}</Text>
                            </View>
                        )) : <Text style={styles.emptyText}>You have no friends</Text>}
                    </View>
                </ScrollView>
            </LinearGradient>
            <NavBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    scrollView: {
        padding: 20,
    },
    addButtonContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007bff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    addButtonText: {
        color: '#FFFFFF',
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '600',
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    listItem: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
    },
    listItemText: {
        color: '#333',
        fontSize: 16,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    button: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        marginLeft: 10,
    },
    acceptButton: {
        backgroundColor: '#28a745',
    },
    denyButton: {
        backgroundColor: '#dc3545',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    emptyText: {
        color: '#666',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default ViewFriends;
