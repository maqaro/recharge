// Homepage.tsx

import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';
import NavBar from './NavBar';

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
        <LinearGradient colors={['#eccbaa', '#65AAB3']} style={{height:'100%', width:'100%'}}>
        <View>
            <Text style={styles.header}>Current mentors: </Text>
        <View style={styles.item}>
            {details?.map((item: {mentor_id: any, issue_id: any, issues: {key: any, value: any}, mentors: {key: any, value: any}}) => (
                <View style={styles.mentor}>
                    <Image source={require('./images/SleepWhite.png')} style={styles.face}/>
                    <Text style={styles.title}>{Object.values(item.mentors)}</Text>
                    <Text style={styles.details}>Speciality: {Object.values(item.issues)}</Text>
                    <Text style={styles.description}>"Hey, I am here to help manage your stress better"</Text>
                    <Text style={styles.experience}>4+ years experience</Text>
                </View>
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
      face:{
        width:'80%',
        height:150,
      },
      description:{
        fontSize:10,
        textAlign:'center',

      },
      experience: {
        fontSize:8,
        alignSelf:'center',
        marginTop:5,

      },
  });

  export default ViewMentors;