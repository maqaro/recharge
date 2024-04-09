// Homepage.tsx

import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../lib/supabase';
import NavBar from './NavBar';
import { Circle } from 'react-native-svg';

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

    const getMentorColor = (index: number) => {
        const colors = ['#FFDC51', '#E5E6DA', '#F4AA6B'];
        if (index < colors.length) {
            return colors[index];
        }
        return 'white';
    };

    return (
        <LinearGradient colors={['lightblue', 'lightblue']} style={{height:'100%', width:'100%'}}>
        <View style={styles.item}>
        <ScrollView style={styles.item} showsVerticalScrollIndicator={true}>
          
        <Text style={styles.header}>Current Leaderboard: </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.topicButton && styles.activeButtona]}
              onPress={() => getAll()}>
              <Text style={styles.all}>All </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.topicButton && styles.activeButtonf]}
              onPress={() => getFriends()}>
              <Text style={styles.friends}>Friends</Text>
            </TouchableOpacity>
          </View>
            {details?.map((item: {username: string, points: number}, index:number) => (
                <View key={index} style={[styles.mentor, { backgroundColor: getMentorColor(index) }]}>

                    <Text style={styles.name}>{Object.values(item.username)}</Text>
                    <Text style={styles.points}>{item.points}</Text>

                    {/* <View style={styles.circle}>
                      {index >= 3 && <Text style={styles.badge}>{index + 1}</Text>}
                    </View> */}
                    {index === 0 && <Image source={require('./images/Trophy1.png')} style={styles.trophy} />}
                    {index === 1 && <Image source={require('./images/Trophy2.png')} style={styles.trophy} />}
                    {index === 2 && <Image source={require('./images/Trophy3.png')} style={styles.trophy} />}

                    {index >= 3 && (
                      <View style={styles.circle}>
                          <Text style={styles.badge}>{index + 1}</Text>
                      </View>
                    )}

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
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 15,
        color: 'black',
        alignSelf:'center',
        marginTop: 20,
      },
  
      item: {
        flexDirection:'column',
        flexWrap:'nowrap',
        marginBottom: 10,
        paddingBottom: 40,
      },
      mentor:{
        marginTop: 15,
        width:'80%',
        backgroundColor:'white',
        // color:'black',
        padding: 5,
        borderRadius: 20,
        elevation:10,
        alignSelf:'center',

        shadowColor: 'white',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
      
      },

      name: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        color: 'black',
        marginTop: 10,
        marginLeft: 50,
      },
    
      points: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: "bold",
        color: 'black',
        marginLeft: 267,
        marginTop: -25,
        top: -3.2,
        
      },

      trophy:{
        width: 50,
        height: 50,
        resizeMode: 'contain',
        position: 'absolute',
        top: 3,
        left: 2,
      },

      badge:{
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },

      circle:{
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: 'red',
        backgroundColor: '#F4821F',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 12,
        left: 12,
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
      
      activeButtona: {
        backgroundColor: 'white',
        right: 35,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,

        shadowColor: 'white',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
      },
      activeButtonf: {
        backgroundColor: 'white',
        left: 35,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,

        shadowColor: 'white',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
      },

      all:{
        fontSize: 18,
        fontWeight: "bold",
        color: 'black',
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'center',
      },

      friends:{
        fontSize: 18,
        fontWeight: "bold",
        color: 'black',
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'center',
      },

  });

  export default Leaderboard;