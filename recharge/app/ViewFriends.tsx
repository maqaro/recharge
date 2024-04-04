// Homepage.tsx

import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../lib/supabase';

const ViewFriends = () => {
    const [userid, setUserid] = useState<string | undefined>();
    const [friends, setFriends] = useState<any[]>([]);
    const [pending, setPending] = useState<any[]>([]);
    const [requests, setRequests] = useState<any[]>([]);
    const [name, setName] = useState<any[]>([]);

    useEffect(() => {
        getFriends();
        getPending();
        getRequests();
    }, [])

    const getFriends = async () => {
        let listOfFriends: React.SetStateAction<any[]> = [];
        let counter = 0;
        try {
            const { data: { user }, } = await supabase.auth.getUser();
            setUserid(user?.id);
        
            let { data: friend, error } = await supabase
                .from('friends')
                .select('employee2_name')
                .eq('status', 'friend')
                .eq('employee1_id', user?.id);
            if (error) {
                console.error('Error fetching employee data inner:', error);
            } else {
                if (friend) {
                    friend.map(item=>{
                        listOfFriends[counter] = (Object.values(friend[counter]));
                        counter += 1;
                    })
                }
            }
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
      try {
        const { data: { user }, } = await supabase.auth.getUser();
        setUserid(user?.id);
    
        let { data: friend2, error } = await supabase
            .from('friends')
            .select('employee1_name')
            .eq('status', 'friend')
            .eq('employee2_id', user?.id);
        if (error) {
            console.error('Error fetching employee data inner:', error);
        } else {
            if (friend2) {
                let counter2 =0;
                friend2.map(item=>{
                    listOfFriends[counter] = (Object.values(friend2[counter2]));
                    counter += 1;
                    counter2 += 1;
                })
            }
        }
    } catch (error) {
        console.error('Error fetching employee data:', error);
    }

    setFriends(listOfFriends);
  };

      const getPending = async () => {
        let listOfPending: React.SetStateAction<any[]> = [];
        let counter = 0;
        try {
            const { data: { user }, } = await supabase.auth.getUser();
            setUserid(user?.id);
        
            let { data: friend, error } = await supabase
                .from('friends')
                .select('employee2_name')
                .eq('status', 'pending')
                .eq('employee1_id', user?.id);
            if (error) {
                console.error('Error fetching employee data inner:', error);
            } else {
                if (friend) {
                    friend.map(item=>{
                        listOfPending[counter] = (Object.values(friend[counter]));
                        counter += 1;
                    })
                }
            }
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }

        setPending(listOfPending);
      };

      const getRequests = async () => {
        let listOfRequests: React.SetStateAction<any[]> = [];
        let counter = 0;
        try {
            const { data: { user }, } = await supabase.auth.getUser();
            setUserid(user?.id);
        
            let { data: friend, error } = await supabase
                .from('friends')
                .select('employee1_name')
                .eq('status', 'pending')
                .eq('employee2_id', user?.id);
            if (error) {
                console.error('Error fetching employee data inner:', error);
            } else {
                if (friend) {
                    friend.map(item=>{
                        listOfRequests[counter] = (Object.values(friend[counter]));
                        counter += 1;
                    })
                }
            }
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
        setRequests(listOfRequests);
      };

      const displayFriends = () =>{
        if (friends.length == 0){
            return <Text style={styles.details}>You have no friends lol</Text>
        }
        else{
            return(
                <View style={styles.item}>
                {friends?.map(item => (
                    <View>
                        <Text style={styles.title}>{item}</Text>
                </View>
                ))}
                </View>
            )
        }
      }

      const displayPending = () =>{
        if (pending.length == 0){
            return <Text style={styles.details}>You currently do not have any pending requests.</Text>
        }
        else{
            return(
                <View style={styles.item}>
                {pending?.map(item => (
                    <View>
                        <Text style={styles.title}>{item}</Text>
                </View>
                ))}
                </View>
            )
        }
      }

      const displayRequests = () =>{
        if (requests.length == 0){
            return <Text style={styles.details}>You currently do not have any requests.</Text>
        }
        else{
            return(
                <View style={styles.item}>
                {requests?.map(item => (
                    <View>
                        <Text style={styles.title}>{item}</Text>
                </View>
                ))}
                </View>
            )
        }
      }


    return (
        <LinearGradient colors={['#1a7373', '#e37b60']} style={{height:'100%', width:'100%'}}>
        <View>
        <Text style={styles.details}>Friends: </Text>
        <View style={styles.item}>
            {displayFriends()}
            </View>
        <Text style={styles.details}>Requests: </Text>
        <View style={styles.item}>
            {displayRequests()}
            </View>
            <Text style={styles.details}>Pending: </Text>
        <View style={styles.item}>
            {displayPending()}
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
