// Homepage.tsx

import React, {useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, FlatList, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SearchBar from './SearchBar';
import { supabase } from '../lib/supabase';
import { set } from 'date-fns';
import { router } from 'expo-router';
import NavBar from './NavBar';
import { ScrollView } from 'react-native-gesture-handler';

//const [userName, setUserName] = useState<any>();


const Friends = () => {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [userID, setUserID] = useState<string | null>(null);
    const [userName, setUserName] = useState("");
    const [requests, setRequests] = useState<any[]>([]);


    useEffect(() => {
      const fetchUser = async () => {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) {
          console.error('Error fetching user:', userError);
          return;
        }
        setUserID(userData?.user?.id ?? null);
      };
  
      fetchUser();
    }, []);
  
    useEffect(() => {
      const fetchEmployees = async () => {
  
        const { data, error } = await supabase
          .from('employee')
          .select('username')
          //.like('username', '%'.concat(searchPhrase))
          .order('username', { ascending: true });
  
        if (error) {
          console.error('Error fetching employee data:', error);
          return;
        }
  
        if(data){
          console.log(data);
          setData(data);
        }
      };

      fetchEmployees();
    }, []);

  const setPhrase = (value: any) =>{
    //console.log(data);
    setSearchPhrase(value);
  }

  const sendRequest = async (username: string) =>{

    console.log("Target username:", username)
    const { data: data1, error: error1 } = await supabase
    .from('employee')
    .select('requests')
    //.like('username', '%'.concat(searchPhrase))
    .eq('username', username);

  if (error1) {
    console.error('Error fetching employee data:', error1);
    return;
  }

  if(data1){
    console.log('Requests ', Object.values(data1[0])[0])
    setRequests(Object.values(data1[0])[0]);
  }

  let reqs = Object.values(data1[0])[0];

    const { data: data2, error: error2 } = await supabase
    .from('employee')
    .select('username')
    .eq('employee_id', userID);

  if (error2) {
    console.error('Error fetching employee data:', error2);
    return;
  }

  if(data2){
    console.log('UserName: ',Object.values(data2[0])[0]);
    setUserName(Object.values(data2[0])[0]);
  }

  let name = Object.values(data2[0])[0];
  console.log(name)

  if (requests.length ==0){
    setRequests(requests.concat(name))
  }
  else{
    setRequests(requests.concat(name));
  }

    const { data, error } = await supabase
          .from('employee')
          .update({
            'requests': reqs.concat(name)
  })
          .eq('username', username);
  
        if (error) {
          console.error('Error fetching employee data:', error);
          return;
        }

        console.log(reqs.concat(username));
  
        if(data){
          console.log(data);
          setData(data);
        }
        Alert.alert("Friend Request Sent");
        router.navigate("./ViewFriends")
  }

    return (
    
        <SafeAreaView style={styles.container}>
          
             {!clicked && <Text style={styles.title}>Friend Search</Text>}
             
            <LinearGradient colors={['#1a7373', '#e37b60']} style={{height:'100%', width:'100%'}}>
            <SearchBar clicked={clicked} searchPhrase={searchPhrase} setPhrase={setPhrase} setClicked={setClicked} />
            
            {data?.map((item: {username: string}) => (
                <View style={styles.mentor}>
                  <TouchableOpacity>
                    <Text style={styles.title} onPress={() => {sendRequest(item.username)}}>{Object.values(item.username)}</Text>
                  </TouchableOpacity>
                </View>
            ))}
          
            </LinearGradient>
            
            <NavBar/>
        </SafeAreaView>
         
      );
      };

export default Friends;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      flexWrap:'nowrap',
      marginBottom: 0,
      paddingBottom: 40,
    },

    // searchBar: {
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     minWidth: 200,
    // },

    item: {
      flexDirection:'column',
      flexWrap:'nowrap',
      marginBottom: 10,

    },
    mentor:{
      // marginTop:10,
      // borderColor:'black',
      // borderWidth:1,
      // width:'80%',
      // borderBottomWidth: 2,
      // borderBottomColor: "lightgrey",
      // backgroundColor:'white',
      // color:'black',
      // padding:10,
      // borderRadius:10,
      // elevation:10,
      // alignSelf:'center',

      marginTop: 0,
      borderWidth: 1,
      paddingVertical: 10,
      borderColor: 'transparent',
      borderTopColor: 'lightgrey',
      borderTopWidth: 1,
      borderBottomWidth: 0,
      borderBottomColor: 'lightgrey',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',

      width:'99%',
      backgroundColor:'white',
      color:'black',
      padding: 5,
      borderRadius: 0,
      elevation:10,
      alignSelf:'center',

    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 15,
      color: 'black',
      alignSelf:'center',
      marginTop: 20,
    },
    username: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5,
      color: 'black',
      marginTop: 10,
      marginLeft: 30,
    },


    buttonContainer: {
      flexDirection: 'row',
      alignSelf:'center',
      flex: 1,
      marginBottom:10,
    },

    backButton: {
      position: 'absolute',
      top: 22, 
      left: 20,
      zIndex: 10,
    },

    topicButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      height: 37,
      marginRight: 5,
    },
    activeButton: {
      backgroundColor: '#FF5F6D',
    },

    gap:{
      marginBottom: 20,
    }

  });


