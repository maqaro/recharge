// Homepage.tsx

import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';

const ViewFriends = () => {
    const [userid, setUserid] = useState<string | undefined>();
    const [friends, setFriends] = useState<any[]>([]);
    const [pending, setPending] = useState<any[]>([]);
    const [requests, setRequests] = useState<any[]>([]);
    const [name, setName] = useState<any[]>([]);

    useEffect(() => {
        getFriends();
        getFriendsName();
        getPending();
        getRequests();
    }, [])

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
            } else {
                if (friend) {
                    setFriends(Object.values(friend[0])[0]); // Update state with the fetched sleep data
                    console.log(Object.values(friend[0])[0]);
                }
            }
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
      };

      const getPending = async () => {
        try {
            const { data: { user }, } = await supabase.auth.getUser();
            setUserid(user?.id);
        
            let { data: pending, error } = await supabase
                .from('employee')
                .select('pending_friends')
                .eq('employee_id', user?.id);
            if (error) {
                console.error('Error fetching employee data inner:', error);
            } else {
                if (pending) {
                    setPending(Object.values(pending[0])[0]); // Update state with the fetched sleep data
                }
            }
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
      };

      const getRequests = async () => {
        try {
            const { data: { user }, } = await supabase.auth.getUser();
            setUserid(user?.id);
        
            let { data: requests, error } = await supabase
                .from('employee')
                .select('friend_requests')
                .eq('employee_id', user?.id);
            if (error) {
                console.error('Error fetching employee data inner:', error);
            } else {
                if (requests) {
                    setRequests(Object.values(requests[0])[0]); // Update state with the fetched sleep data
                }
            }
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
      };

    const getName = async (userid: string): Promise<any> => {
        let { data: name, error } = await supabase
                .from('employee')
                .select('username')
                .eq('employee_id', userid);
            if (error) {
                console.error('Error fetching employee data inner:', error);
            } else {
                if (name) {
                    console.log(Object.values(name[0])[0]);
                    setName(Object.values(name[0])[0]); // Update state with the fetched sleep data
                    
                }
                else{
                    return "";
                }
    }
}

const getFriendsName = () =>{
    let friendsNames: React.SetStateAction<any[]> = [];
    let counter = 0;

    friends.map(item => (
        friendsNames[counter] = getName(friends[counter])
    ))

    setFriends(friendsNames);
}

    return (
        <LinearGradient colors={['#1a7373', '#e37b60']} style={{height:'100%', width:'100%'}}>
        <View>
        <Text style={styles.details}>Friends: </Text>
        <View style={styles.item}>
            {friends?.map(item => (
                <View>
                    <Text style={styles.title}>{getName(item).toString()}</Text>
            </View>
            ))}
            </View>
        <Text style={styles.details}>Requests: </Text>
        <View style={styles.item}>
            {requests?.map(item => (
                <View>
                    <Text style={styles.title}>{JSON.stringify(getName(item))}</Text>
            </View>
            ))}
            </View>
        <Text style={styles.details}>Pending: </Text>
        <View style={styles.item}>
            {pending?.map(item => (
                <View>
                    <Text style={styles.title}>{JSON.stringify(getName(item))}</Text>
            </View>
            ))}
            </View>
        </View>
        </LinearGradient>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      },
  
      item: {
          margin: 30,
          borderBottomWidth: 2,
          borderBottomColor: "lightgrey",
        },
        title: {
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 5,
          fontStyle: "italic",
          color: 'white',
        },
      
        details: {
          fontSize: 15,
          fontWeight: "bold",
          marginBottom: 5,
          fontStyle: "italic",
          color: 'white',
        },
  });

  export default ViewFriends;