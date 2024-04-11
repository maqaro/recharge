// Homepage.tsx

import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';
import NavBar from './NavBar';
import { Ionicons } from '@expo/vector-icons';

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
                .select('id, mentor_id, issue_id, issues(name), mentors(name)')
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

    const router = useRouter();

    const BackButton = () => (
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.navigate('/MatchWithMentor')}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    );

    return (
        
        <View style={styles.container}>
          <LinearGradient colors={['#F5F5F5', '#F5F5F5']} style={{height:'100%', width:'100%'}}>
          <BackButton />
          <Text style={styles.header}>Chats</Text>


        <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={true}>

        <View style={styles.item}>
            {details?.map((item: {id:any, mentor_id: any, issue_id: any, issues: {key: any, value: any}, mentors: {key: any, value: any}}) => (
              <TouchableOpacity style={styles.mentor} onPress={() => router.push({pathname: '/ChatRoom', params: {chatID: item.id}})}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <Image source={require('./images/Match.png')} style={styles.face}/>
                  <View style={{width: "70%"}}>
                    <Text style={styles.title}>{Object.values(item.mentors)}</Text>
                    <Text style={styles.details}>Speciality: {Object.values(item.issues)}</Text>
                    <Text style={styles.description}>"I'm here to support you with {Object.values(item.issues)}. Together, we will overcome it."</Text>
                    <Text style={styles.experience}>4+ years experience</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            
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
      backgroundColor: '#F5F5F5',
    },
    scrollview: {
      flexGrow: 1,
      paddingHorizontal: '5%',
      paddingTop: 20,
      paddingBottom: 200, // Adjust based on your Footer/NavBar height
      marginBottom: 65,
    },
    header: {
      padding: 20,
      fontSize: 24,
      fontWeight: "600",
      color: 'black',
      alignSelf: 'center',
      marginBottom: 20,
    },
    backButton: {
      position: 'absolute',
      top: 40, // Adjust for status bar height if necessary
      left: 20,
      zIndex: 10,
    },
    item: {
      flexDirection: 'column',
    },
    mentor: {
      borderColor: '#ddd',
      borderWidth: 1,
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
      marginBottom: 20,
      alignItems: 'center', // Center the children
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: '#02017D',
      marginBottom: 10,
    },
    details: {
      fontSize: 14,
      color: 'black',
      fontWeight: 'bold',
      marginBottom: 10,
    },
    face: {
      alignContent: 'center',
      marginTop: 50,
      width: 60,
      height: 50,
      margin: 10,
      marginBottom: 10,
    },
    description: {
      fontSize: 14,
      color: '#183E4C',
      marginBottom: 10,
    },
    experience: {
      fontSize: 12,
      color: 'grey',
      marginTop: 5,
      textAlign: 'right',
    },
  });

  export default ViewMentors;
