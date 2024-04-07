// EmotionTracker.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, Image, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { supabase } from '../lib/supabase'; 
import { useRouter } from 'expo-router';
import EmotionChart from './Emotions/EmotionChart';
import { Ionicons } from '@expo/vector-icons';
import EmotionCalendar from './Emotions/EmotionCalendar';
import YearInPixels from './YearInPixels';
import Streak from './Emotions/Streak';
import { LinearGradient } from 'expo-linear-gradient';

const emotions: { [key: string]: { backgroundColor: string; image: any } } = {
  Happy: { backgroundColor: '#FFFF00',  image: require('./Emotions/happy.jpg') },
  Sad: { backgroundColor: '#4682BF', image: require('./Emotions/sad.jpg')  },
  Angry: { backgroundColor: '#FF0000',image: require('./Emotions/angry.jpg') },
  Anxious: { backgroundColor: '#A9A9A9',  image: require('./Emotions/anxious.jpg') },
  Fustrated: { backgroundColor: '#FFA500', image: require('./Emotions/fustrated.jpg')  },
  Love: { backgroundColor: '#FF69B4',image: require('./Emotions/love.jpg') },
  Calm: { backgroundColor: '#008000',  image: require('./Emotions/calm.jpg') },
  Excited: { backgroundColor: '#800080', image: require('./Emotions/excited.jpg')  },
  Embarassed: { backgroundColor: '#8B4513',image: require('./Emotions/embarassed.jpg') },
  Disgust: { backgroundColor: '#98FB98', image: require('./Emotions/disgust.jpg')  },
  Bored: { backgroundColor:  '#E6E6FA',image: require('./Emotions/bored.jpg') },
};

const EmotionTracker: React.FC = () => {
    const [currentEmotion, setCurrentEmotion] = useState<string | null>(null);
    const router = useRouter();
    const [userid, setUserid] = useState<string | undefined>();
    const [emotionData, setEmotionData] =  useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modal2Visible, setModal2Visible] = useState<boolean>(false);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          const id = user?.id;
          setUserid(id);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserData();
    }, []);
  
    useEffect(() => {
      if (userid) {
        const fetchEmotion = async () => {
          try {
            const currentDate = new Date().toISOString().split('T')[0];
  
            const { data, error } = await supabase
              .from('emotiontracker')
              .select('*')
              .eq('user_id', userid)
              .eq('date', currentDate)
              .single();
  
            if (error) {
              throw error;
            }
            if (data) {
              setCurrentEmotion(data.emotion);
              setEmotionData(data);
              console.log(emotionData);
            }
          } catch (error) {
            console.error('Error fetching emotion:', error);
          }
        };
  
        fetchEmotion();
        console.log('year: ',selectedYear);
      }
    }, [userid, selectedYear]);

  const handlePress = () => {
    router.navigate('/AddEmotion');
  };


  const handlePressYearInPixels = () => {
    setModalVisible(true);
  };

  const handlePressYearInColours = () => {
    setModal2Visible(true);
  };

  return (
    <LinearGradient colors={['#ffcba4', '#fae588']} style={{height:'100%', width:'100%'}} >
    
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate('/Homepage')}>
          <Ionicons name="chevron-back-circle-outline" size={40} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Emotion Tracker</Text>
      </View>

      

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today you are feeling:</Text>
        <TouchableOpacity style={styles.emotionContainer} onPress={handlePress}>
        {currentEmotion && currentEmotion in emotions ? (
          <Image source={emotions[currentEmotion].image} style={styles.emotionImage} />
        ) : (
          <Text style={styles.emotionText}>Add today's emotion</Text>
        )}
        </TouchableOpacity>
      </View>

      <Streak/>


      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePressYearInColours}>
          <Text style={styles.buttonText}>Calender</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={ handlePressYearInPixels}>
          <Text style={styles.buttonText}>A Year in Pixels</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

            <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={{marginRight:80, marginTop:50}} onPress={() => setModalVisible(false)}>
                <Ionicons name="chevron-down-circle-outline" size={40} color="black" />
              </TouchableOpacity>
              
              <Picker
                selectedValue={selectedYear}
                onValueChange={(itemValue) => setSelectedYear(itemValue as number)}
                style={styles.yearPicker}
                placeholder='2024'
              >
              {Array.from({ length: 5 }, (_, index) => new Date().getFullYear() - index).map((year) => (
                <Picker.Item key={year} label={year.toString()} value={year} />
              ))}
              </Picker>
            </View>

            <YearInPixels selectedYear={selectedYear} />
            </View>
          </View>
          
        </Modal>


        <Modal
          animationType="slide"
          transparent={true}
          visible={modal2Visible}
          style={{paddingTop:10}}
          onRequestClose={() => {
            setModal2Visible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

            <View style={styles.yearPickerContainer}>
              <TouchableOpacity  style={{marginRight:8, paddingTop:50}} onPress={() => setModal2Visible(false)}>
                <Ionicons name="chevron-down-circle-outline" size={40} color="black" />
              </TouchableOpacity>
              
                <Picker
                selectedValue={selectedYear}
                onValueChange={(itemValue) => setSelectedYear(itemValue as number)}
                style={styles.yearPicker}
                placeholder='2024'
                >
                {Array.from({ length: 10 }, (_, index) => new Date().getFullYear() - index).map((year) => (
                  <Picker.Item key={year} label={year.toString()} value={year} />
                ))}
                </Picker>
                </View>
              <EmotionCalendar selectedYear={selectedYear} />
            </View>
          </View>
        </Modal>
      </View>
      
      <EmotionChart/>
      
      </ScrollView>
    </View>
    </LinearGradient>
    
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 2,
    
    
  },
  container: {
    flex: 1,
    
  },
  header:{
    flexDirection:'row',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'white',
    marginLeft:'15%',
  },
  section: {
    alignItems: 'center',
    marginBottom: 10,
    // borderBottomColor: 'black',
    // borderBottomWidth:0.5,
    
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'white',
  },
  emotionContainer: {
    padding: 10,
    borderRadius: 10,
  },
  emotionText: {
    fontSize: 18,
    marginBottom:20,
    padding:10,
    borderColor:'black',
    borderWidth:1,
    color:'white',
    borderRadius:20,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '90%',
    alignSelf:'center',
    // borderBottomWidth:0.5,
    backgroundColor:'white',
    paddingTop:15,
    borderRadius:10,
  },
  button: {
    backgroundColor: '#ffefc1',
    width:'80%',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom:15,
    alignSelf:'center',
    elevation:10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)', 
  },
  modalView: {
    // margin: 10,
    backgroundColor: 'white', 
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginVertical:0,
    paddingVertical:0,
    alignSelf: 'baseline',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  yearPickerContainer: {
    flexDirection: 'row',
    width:'100%',
    height:100
},
yearPicker: {
    width: 120,
    marginTop:0,
    paddingTop:0,
},
emotionImage: {
  width: 100,
  height: 100,
  resizeMode: 'contain',
},

});

export default EmotionTracker;