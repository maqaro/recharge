// Homepage.tsx

import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../lib/supabase';
import NavBar from './NavBar';
import { useRouter } from 'expo-router';

const ViewFriends = () => {
    const [userid, setUserid] = useState<string | undefined>();
    const [friends, setFriends] = useState<any[]>([]);
    const [requests, setRequests] = useState<any[]>([]);
    const [name, setName] = useState<any[]>([]);

    const router = useRouter();

    useEffect(() => {
        getFriends();
        getRequests();
    }, [])

    const getFriends = async () => {
        try {
            const { data: { user }, } = await supabase.auth.getUser();
            setUserid(user?.id);
        
            let { data: friend, error } = await supabase
                .from('employee')
                .select('friends')
                .eq('employee_id', user?.id)
            if (error) {
                console.error('Error fetching employee data inner:', error);
            } else {
                if (friend) {
                    setFriends(Object.values(friend[0])[0]);
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
            .select('requests')
            .eq('employee_id', user?.id)
        if (error) {
            console.error('Error fetching employee data inner:', error);
        } else {
            if (requests) {
                setRequests(Object.values(requests[0])[0]);
            }
        }
    } catch (error) {
        console.error('Error fetching employee data:', error);
    }
};

     const displayFriends = () =>{
        if (friends.length == 0){
            return <Text style={styles.title}>You have no friends lol</Text>
        }
        else{
            return(
                <View>
                {friends?.map(item => (
                    <View style={styles.inneritem}>
                        <Text style={styles.title}>{item}</Text>
                </View>
                ))}
                </View>
            )
        }
      };

      const displayRequests = () =>{
        if (requests.length == 0){
            return <Text style={styles.title}>You currently do not have any requests.</Text>
        }
        else{
            return(
                <View>
                {requests?.map(item => (
                    <View style={styles.inneritem}>
                        <Text style={styles.title}>{item}</Text>
                        <Button title="Accept" onPress={() =>acceptRequest(item)}></Button>
                        <Button title="Deny" onPress={() =>denyRequest(item)}></Button>
                </View>
                ))}
                </View>
            )
        }
      };

      const acceptRequest = async (name: String) =>{
        try {
            const { data: { user }, } = await supabase.auth.getUser();
            setUserid(user?.id);
        
            const { error: updateError } = await supabase
            .from('employee')
            .update({
              'friends': friends.concat(name)
            })
            .eq('employee_id', user?.id);

            const { error: deleteError } = await supabase
            .from('employee')
            .update({
              'requests': requests.filter((req) => {req != name})
            })
            .eq('employee_id', user?.id);
    
          if (updateError) {
            console.error('Error updating friend data:', updateError.message);
            return;
          }
        } 
        catch{
            console.log("Error logging friend data")
    }
        Alert.alert("Friend Request Accepted");

        router.navigate("./Homepage")
        router.navigate("./ViewFriends")
      }

      const denyRequest = async (name: String) =>{
        try {
            const { data: { user }, } = await supabase.auth.getUser();
            setUserid(user?.id);

            const { error: deleteError } = await supabase
            .from('employee')
            .update({
              'requests': requests.filter((req) => {req != name})
            })
            .eq('employee_id', user?.id);
    
          if (deleteError) {
            console.error('Error updating friend data:', deleteError.message);
            return;
          }
        } 
        catch{
            console.log("Error logging friend data")
    }
        Alert.alert("Friend Request Denied");

        router.navigate("./Homepage")
        router.navigate("./ViewFriends")
        
      }



    return (
        <View style={styles.container}>
        <LinearGradient colors={['#eccbaa', '#65AAB3']} style={{height:'100%', width:'100%'}}>
        <ScrollView >
        <Button title="Add Friends" onPress={() => router.navigate('./Friends')}></Button>
        <Text style={styles.header}>Requests: </Text>
        <View style={styles.item}>
            {displayRequests()}
            </View>
        <Text style={styles.header}>Friends: </Text>
        <View style={styles.item}>
            {displayFriends()}
            </View>
        </ScrollView>
        </LinearGradient>
        <NavBar/>
        </View>
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
        height: '100%',
      },
    item: {
        margin: 10,
        borderBottomWidth: 2,
        borderBottomColor: "lightgrey",
        backgroundColor:'white',
        color:'black',
        padding:10,
        borderRadius:10,
        elevation:10,
        display: 'flex',
        marginBottom: 50,
      },

      inneritem: {
        display: 'flex',
        flexDirection: 'row',
      },

      title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        fontStyle: "italic",
        color: 'black',
      },
    
      details: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
        fontStyle: "italic",
        color: 'black',
        borderColor:'gray',
        borderBottomWidth:1,
      },
      header: {
        fontSize: 35,
        fontWeight: "bold",
        marginBottom: 35,
        color: 'white',
        alignSelf:'center',
        marginTop: 35,
      },
    
  
  });

  export default ViewFriends;
