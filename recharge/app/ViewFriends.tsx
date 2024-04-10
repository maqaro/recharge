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
      if (friends == null){
        return <Text style={styles.title}>You have no friends</Text>
      }
        if (friends.length == 0){
            return <Text style={styles.title}>You have no friends</Text>
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
        if (requests.length==0){
            return <Text style={styles.title}>You currently do not have any requests</Text>
        }
        else{
            return(
                <View>
                {requests?.map(item => (
                    <View style={styles.inneritem}>
                        <Text style={styles.title}>{item}</Text>

                        {/* <Button title="Accept" onPress={() =>acceptRequest(item)}></Button> */}

                        <TouchableOpacity
                            style={[styles.accept]}
                            onPress={() => acceptRequest(item)}>
                            <Text style={styles.aanddtext}>Accept</Text>
                        </TouchableOpacity>

                        {/* <Button title="Deny" onPress={() =>denyRequest(item)}></Button> */}

                        <TouchableOpacity
                            style={[styles.deny]}
                            onPress={() => denyRequest(item)}>
                            <Text style={styles.aanddtext}>Decline</Text>
                        </TouchableOpacity>

                        
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
            console.log(userid)

            const { data: data2, error: error2 } = await supabase
            .from('employee')
            .select('username')
            .eq('employee_id', userid);

            let myUsername = "";

            if (data2){            
              myUsername = Object.values(data2[0])[0];
            }

            if (friends == null){
              setFriends([])
            }

            console.log(name);
            console.log(friends);
            console.log(friends.concat(name));
        
            const { error: updateError } = await supabase
            .from('employee')
            .update({
              'friends': friends.concat(name)
            })
            .eq('employee_id', userid);

            const { error: updateError2 } = await supabase
            .from('employee')
            .update({
              'friends': friends.concat(myUsername)
            })
            .eq('username', name);

            const { error: update2Error } = await supabase
            .from('employee')
            .update({
              'friends': friends.concat(name)
            })
            .eq('employee_id', userid);

            console.log("Requests updated");

            const { error: deleteError } = await supabase
            .from('employee')
            .update({
              'requests': requests.filter((req) => {req != name})
            })
            .eq('employee_id', userid);

            console.log("Friends updated");
    
          if (updateError) {
            console.error('Error updating friend data:', updateError.message);
            return;
          }
        } 
        catch{
            console.log("Error logging friend data")
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        await Promise.all([getFriends(), getRequests()]);
    };

    return (
      <View style={styles.container}>
        <LinearGradient colors={['lightblue', 'lightblue']} style={{height:'100%', width:'100%'}}>
        <ScrollView >
      
        {/* <View style={styles.addbutton}>
          <Button title="Add Friends" onPress={() => router.navigate('./Friends')}></Button>
        </View> */}

        <TouchableOpacity
              style={[styles.topicButton && styles.activeButtonf]}
              onPress={() => router.navigate('./Friends')}>
              <Text style={styles.friends}>Add Friends</Text>
          </TouchableOpacity>

        <Text style={styles.header}>Requests:</Text>
        <View style={styles.item}>
            {displayRequests()}
            </View>

        <Text style={styles.header}>Friends:</Text>
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

        marginTop: 5,
      },

      title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        color: 'black',
      },
    
      // details: {
      //   fontSize: 15,
      //   fontWeight: "bold",
      //   marginBottom: 5,
      //   color: 'black',
      //   borderColor:'transparent',
      //   borderBottomWidth:1,
      // },
      header: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 35,
        color: 'black',
        alignSelf:'center',
        marginTop: 35,
       
      },

      addbutton:{
        marginTop: 20,
        top: 0,
        textAlign: 'center',
      },
      topicButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 37,
        marginRight: 5,
      },

      activeButtonf: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginRight: 295,
        textAlign: 'center',
        left: 147,
        top: 10,
        marginBottom: 10,

        shadowColor: 'white',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
      },

      friends:{
        fontSize: 18,
        fontWeight: "bold",
        color: 'black',
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'center',
      },

      accept:{
        backgroundColor: '#44BA67',
        marginRight: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        marginLeft: 120,
      },

      deny:{
        backgroundColor: '#F53649',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 11,
      },

      aanddtext:{
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
      }

    
  
  });
