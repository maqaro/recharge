// Homepage.tsx

import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';

const ViewMentors = () => {
    const [userid, setUserid] = useState<string | undefined>();
    const [details, setDetails] = useState<any[]>([]);

    useEffect(() => {
        getMentors();
    }, [])

    const getMentors = async () => {
        try {
            const { data: { user }, } = await supabase.auth.getUser();
            setUserid(user?.id);
        
            let { data: detail, error } = await supabase
                .from('chats')
                .select('mentor_id, issue_id, issues(name), mentors(name)')
                .eq('employee_id', user?.id);
            if (error) {
                console.error('Error fetching chat room data inner:', error);
            } else {
                if (detail) {
                    setDetails(detail); // Update state with the fetched sleep data
                }
            }
        } catch (error) {
            console.error('Error fetching mentor data:', error);
        }
      };

    return (
        <LinearGradient colors={['#1a7373', '#e37b60']} style={{height:'100%', width:'100%'}}>
        <View>
            <Text style={styles.details}>Below are your mentors: </Text>
        <View style={styles.item}>
            {details?.map((item: {mentor_id: any, issue_id: any, issues: {key: any, value: any}, mentors: {key: any, value: any}}) => (
                <View>
                    <Text style={styles.title}>{Object.values(item.mentors)}</Text>
                    <Text style={styles.details}>{Object.values(item.issues)}</Text>
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

  export default ViewMentors;