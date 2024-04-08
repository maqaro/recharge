// Homepage.tsx

import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../lib/supabase';
import NavBar from './NavBar';
import { useRouter } from 'expo-router';

const ViewFriends = () => {
    const [userid, setUserid] = useState<string | undefined>();
    const [friends, setFriends] = useState<any[]>([]);
    const [pending, setPending] = useState<any[]>([]);
    const [requests, setRequests] = useState<any[]>([]);
    const [name, setName] = useState<any[]>([]);

    const router = useRouter();

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
      }

      const displayPending = () =>{
        if (pending.length == 0){
            return <Text style={styles.title}>You currently do not have any pending requests.</Text>
        }
        else{
            return(
                <View>
                {pending?.map(item => (
                    <View style={styles.inneritem}>
                        <Text style={styles.title}>{item}</Text>
                </View>
                ))}
                </View>
            )
        }
      }

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
                        <Button title="Deny"></Button>
                </View>
                ))}
                </View>
            )
        }
      }

      const acceptRequest = async (name: String) =>{
        try {
            const { data: { user }, } = await supabase.auth.getUser();
            setUserid(user?.id);
        
            const { error: updateError } = await supabase
            .from('friends')
            .update({
              status:'friends'
            })
            .eq('employee1_name', name)
            .eq('employee2_id', user?.id);
    
          if (updateError) {
            console.error('Error updating friend data:', updateError.message);
            return;
          }
        } 
        catch{
            console.log("Error logging friend data")
    }
    try {
        const { data: { user }, } = await supabase.auth.getUser();
        setUserid(user?.id);
    
        const { error: updateError } = await supabase
        .from('friends')
        .update({
          status:'friends'
        })
        .eq('employee2_name', name)
        .eq('employee1_id', user?.id);

      if (updateError) {
        console.error('Error updating friend data:', updateError.message);
        return;
      }
    } 
    catch{
        console.log("Error logging friend data")
}
        router.navigate('./');
      }

      const denyRequest = async (name: String) =>{
        try {
            const { data: { user }, } = await supabase.auth.getUser();
            setUserid(user?.id);
        
            const { error: updateError } = await supabase
            .from('friends')
            .delete()
            .eq('employee1_name', name)
            .eq('employee2_id', user?.id);
    
          if (updateError) {
            console.error('Error updating friend data:', updateError.message);
            return;
          }
        } 
        catch{
            console.log("Error logging friend data")
    }
    try {
        const { data: { user }, } = await supabase.auth.getUser();
        setUserid(user?.id);
    
        const { error: updateError } = await supabase
        .from('friends')
        .delete()
        .eq('employee2_name', name)
        .eq('employee1_id', user?.id);

      if (updateError) {
        console.error('Error updating friend data:', updateError.message);
        return;
      }
    } 
    catch{
        console.log("Error logging friend data")
}
        router.navigate('./');
      }



    return (
        <View style={styles.container}>
        <LinearGradient colors={['#eccbaa', '#65AAB3']} style={{height:'100%', width:'100%'}}>
        <ScrollView >
        <Button title="Add Friends" onPress={() => router.navigate('./Friends')}></Button>
        <Text style={styles.header}>Friends: </Text>
        <View style={styles.item}>
            {displayFriends()}
            </View>
        <Text style={styles.header}>Requests: </Text>
        <View style={styles.item}>
            {displayRequests()}
            </View>
            <Text style={styles.header}>Pending: </Text>
        <View style={styles.item}>
            {displayPending()}
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
