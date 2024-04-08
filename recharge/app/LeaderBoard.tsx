// Homepage.tsx

import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../lib/supabase';
import NavBar from './NavBar';

const Leaderboard = () => {
    const [userid, setUserid] = useState<string | undefined>();
    const [details, setDetails] = useState<any[]>([]);

    const router = useRouter();

    useEffect(() => {
        getAll();
    }, [])

    const getAll = async () => {
        try {
            const { data: { user }, } = await supabase.auth.getUser();
            setUserid(user?.id);
        
            let { data: detail, error } = await supabase
                .from('employee')
                .select('username, points')
                .order('points', { ascending: false });
            if (error) {
                console.error('Error fetching  employee data inner:', error);
            } else {
                if (detail) {
                  console.log("Getting all")
                    setDetails(detail); // Update state with the fetched sleep data
                }
            }
        } catch (error) {
            console.error('Error fetching mentor data:', error);
        }
      };

      const getFriends = async () => {
        try {
            const { data: { user }, } = await supabase.auth.getUser();
            setUserid(user?.id);
        
            let { data: detail, error } = await supabase
                .from('employee')
                .select('username, points')
                .contains('friends', [user?.id])
                .order('points', { ascending: false });
            if (error) {
                console.error('Error fetching  employee data inner:', error);
            } else {
                if (detail) {
                  console.log("Getting friends")
                    setDetails(detail); // Update state with the fetched sleep data
                }
            }
        } catch (error) {
            console.error('Error fetching mentor data:', error);
        }
      };

    return (
        <LinearGradient colors={['#eccbaa', '#65AAB3']} style={{height:'100%', width:'100%'}}>
        <View>
            <Text style={styles.header}>Current Leaderboard: </Text>
        <ScrollView style={styles.item}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.topicButton && styles.activeButton]}
              onPress={() => getAll()}>
              <Text>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.topicButton && styles.activeButton]}
              onPress={() => getFriends()}>
              <Text>Friends</Text>
            </TouchableOpacity>
          </View>
            {details?.map((item: {username: string, points: number}) => (
                <View style={styles.mentor}>
                    <Text style={styles.title}>{Object.values(item.username)}</Text>
                    <Text style={styles.details}>Points: {item.points}</Text>
                </View>
            ))}
        </ScrollView>
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
        height: 100,
      },
      header: {
        fontSize: 35,
        fontWeight: "bold",
        marginBottom: 5,
        fontStyle: "italic",
        color: 'white',
        alignSelf:'center',
        textDecorationLine:'underline',
      },
  
      item: {
        flexDirection:'column',
        flexWrap:'nowrap',
        marginBottom: 10,

      },
      mentor:{
        marginTop:10,
        borderColor:'black',
        borderWidth:1,
        width:'80%',
        borderBottomWidth: 2,
        borderBottomColor: "lightgrey",
        backgroundColor:'white',
        color:'black',
        padding:10,
        borderRadius:10,
        elevation:10,
        alignSelf:'center',
      },
      title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        fontStyle: "italic",
        color: 'black',
        alignSelf:'center',
      },
    
      details: {
        fontSize: 12,
        marginBottom: 5,
        fontStyle: "italic",
        color: 'black',
        alignSelf:'center',
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

  });

  export default Leaderboard;