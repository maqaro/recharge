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
        <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={true}>

          <BackButton />
            <Text style={styles.header}>Chats</Text>
        <View style={styles.item}>
            {details?.map((item: {id:any, mentor_id: any, issue_id: any, issues: {key: any, value: any}, mentors: {key: any, value: any}}) => (
              <TouchableOpacity style={styles.mentor} onPress={() => router.push({pathname: '/ChatRoom', params: {chatID: item.id}})}>
                <Image source={require('./images/Match.png')} style={styles.face}/>
                <Text style={styles.title}>{Object.values(item.mentors)}</Text>
                <Text style={styles.details}>Speciality: {Object.values(item.issues)}</Text>
                <Text style={styles.description}>"Hey, I am here to help manage your stress better"</Text>
                <Text style={styles.experience}>4+ years experience</Text>
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
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#fff',
      },

      scrollview: {
        height: '200%',
        flexGrow: 1,
        
        marginLeft: '2.5%',
        marginRight: '2.5%',
        marginBottom: 80,
        paddingBottom: '50%',
      },

      header: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 15,
        color: 'black',
        alignSelf:'center',
        marginTop: 20,

      },

      backButton: {
        position: 'absolute',
        top: 22, 
        left: 20,
        zIndex: 10,
      },
  
      item: {
        flexDirection:'column',
        flexWrap:'nowrap',
      },
      mentor:{
        marginTop:10,
        borderColor:'black',
        borderWidth: 2,
        width:'80%',
        backgroundColor:'white',
        color:'black',
        padding:10,
        borderRadius:10,
        elevation:10,
        alignSelf:'center',
      },
      title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 5,
        color: '#02017D',
        alignSelf:'center',
      },
    
      details: {
        fontSize: 15,
        marginBottom: 10,
        color: 'black',
        alignSelf:'center',
        fontWeight: 'bold',
      },
      face:{
        width: 200,
        height: 100,
        marginTop: 4,
        marginLeft: 46,
        marginBottom: 4,
        resizeMode: 'contain',
      },
      description:{
        fontSize: 13,
        textAlign:'center',
        color: '#183E4C',
        marginBottom: 4,
      },
      experience: {
        fontSize: 10,
        alignSelf:'center',
        marginTop:5,

      },
  });

  export default ViewMentors;