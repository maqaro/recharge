// Homepage.tsx

import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { router, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';
import NavBar from './NavBar';

const ViewChatRooms = () => {
    const [userid, setUserid] = useState<string | undefined>();
    const [chatrooms, setChatrooms] = useState<any[]>([]);

    useEffect(() => {
        getDetails();
    }, [])

    const getDetails = async () => {
        try {
            const { data: { user }, } = await supabase.auth.getUser();
            setUserid(user?.id);
        
            let { data: chatroom, error } = await supabase
                .from('chats')
                .select('id ,mentor_id, issue_id, issues(name), mentors(name)')
                .eq('employee_id', user?.id);
            if (error) {
                console.error('Error fetching chat room data inner:', error);
            } else {
                if (chatroom) {
                    setChatrooms(chatroom); // Update state with the fetched sleep data
                }
            }
        } catch (error) {
            console.error('Error fetching mentor data:', error);
        }
      };

    return (
        <LinearGradient colors={['#F5F5F5', '#F5F5F5']} style={{height:'100%', width:'100%'}}>
        <View>
            <Text style={styles.header}>Chats</Text>
        <View>
            {chatrooms?.map((item: {id: any,mentor_id: any, issue_id: any, issues: {key: any, value: any}, mentors: {key: any, value: any}}) => (
                <TouchableOpacity  style={styles.item} onPress={() => router.push({ pathname: '/ChatRoom', params: { chatID: item.id } })}>
                    <Text style={styles.title}>{Object.values(item.mentors)}</Text>
                    <Text style={styles.details}>{Object.values(item.issues)}</Text>
            </TouchableOpacity>
            ))}
            
        </View>
        </View>
        <NavBar/>
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
    // box:{
    //     borderColor:'gray',
    //     borderWidth:1,
    //     margin:5,
    //     minHeight:500,
    // },

    item: {
        margin: 10,
        borderBottomWidth: 2,
        borderBottomColor: "lightgrey",
        backgroundColor:'white',
        color:'black',
        padding:10,
        borderRadius:10,
        elevation:10,
      },
      title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        // fontStyle: "italic",
        color: '#02017D',
        marginLeft: 5,
      },
    
      details: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
        // fontStyle: "italic",
        color:'#444',
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginLeft: 5,
      },
      header: {
        fontSize: 35,
        fontWeight: "bold",
        marginBottom: 20,
        color: '#444',
        marginLeft: 24,
        marginTop: 35,
      },

  });

  export default ViewChatRooms;