import React, { useEffect, useState}  from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../lib/supabase';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/Entypo';
import SunIcon from 'react-native-vector-icons/Octicons';
import Back from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import SleepStats from './Sleep/SleepStats';
import SmallChart from './Sleep/SmallChart';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import  DateTimePickerChangeEvent  from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

type DateTimePickerChangeEvent = {
  nativeEvent: {
    timestamp: number; // or any other properties you expect
  };
};

const Time1 = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
};

const SleepTracker = () => {

    const [chosenTime1, setChosenTime1] = useState(Time1());
    const [chosenTime2, setChosenTime2] = useState(new Date());
  
    const [showTimePicker1, setShowTimePicker1] = useState(false);
    const [showTimePicker2, setShowTimePicker2] = useState(false);
  
    const [timeDifference, setTimeDifference] = useState('0:00');
    const [updateCounter, setUpdateCounter] = useState(0);
  

  
    const onTimeChange1 = (event: DateTimePickerChangeEvent, selectedTime?: Date) => {
      setShowTimePicker1(false);
      if (selectedTime) {
        // Set the time part of selectedTime to chosenTime1, while setting the date to yesterday
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1); // Subtract 1 day
        const chosenDateTime = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), selectedTime.getHours(), selectedTime.getMinutes(), selectedTime.getSeconds());
        setChosenTime1(chosenDateTime);

        const difference = calculateDifference(chosenDateTime, chosenTime2);
        setTimeDifference(difference);
      }
    };
  
    const onTimeChange2 = (event: DateTimePickerChangeEvent, selectedTime?: Date) => {
      setShowTimePicker2(false);
      if (selectedTime) {
        // Set the time part of selectedTime to chosenTime2, while keeping today's date
        const today = new Date();
        const chosenDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), selectedTime.getHours(), selectedTime.getMinutes(), selectedTime.getSeconds());
        setChosenTime2(chosenDateTime);
        
        // Calculate difference
        const difference = calculateDifference(chosenTime1, chosenDateTime);
        setTimeDifference(difference);
      }
    };
    
  
    const showTimePickerComponent1 = () => {
      setShowTimePicker1(true);
    };
  
    const showTimePickerComponent2 = () => {
      setShowTimePicker2(true);
    };
  
    const calculateDifference = (dateTime1: Date, dateTime2: Date) => {
      let difference = dateTime2.getTime() - dateTime1.getTime();
      if (difference < 0) {
          return "ERROR, please check your entries";
      } else {
          let hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  
          // If difference is greater than or equal to 24 hours, keep subtracting 24 hours until it's less than 24 hours
          while (hours >= 24) {
              hours -= 24;
          }
  
          return `${hours}:${minutes.toString().padStart(2, '0')}`;
      }
  };


const formatTime = (time: Date) => {
  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const handlePressSubmit = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser(); // Get the authenticated user

    if (error) {
      console.error('Error fetching user data:', error.message);
      return;
    }

    const currentDate = new Date();
    const insertDate = new Date(currentDate); // Copy the current date
    insertDate.setDate(insertDate.getDate()); // Subtract 1 day
    const formattedInsertDate = insertDate.toISOString().split('T')[0];

    // Check if there's an existing row with the same date
    const { data: existingData, error: fetchError } = await supabase
      .from('sleeptracker')
      .select('id')
      .eq('user_id', user?.id)
      .eq('date', formattedInsertDate);

    if (fetchError) {
      console.error('Error fetching existing sleep data:', fetchError.message);
      return;
    }

    if (existingData.length > 0) {
      // If there's existing data, update it
      const { error: updateError } = await supabase
        .from('sleeptracker')
        .update({ sleep_start: chosenTime1, sleep_end: chosenTime2 })
        .eq('id', existingData[0].id);

      if (updateError) {
        console.error('Error updating sleep data:', updateError.message);
      } else {
        console.log('Sleep data updated successfully');
        setUpdateCounter(prevCounter => prevCounter + 1);
      }
    } else {
      // If there's no existing data, insert a new row
      const { error: insertError } = await supabase.from('sleeptracker').insert([
        { sleep_start: chosenTime1, sleep_end: chosenTime2, user_id: user?.id, date: formattedInsertDate },
      ]);

      if (insertError) {
        console.error('Error inserting sleep data:', insertError.message);
      } else {
        console.log('Sleep data inserted successfully');
        setUpdateCounter(prevCounter => prevCounter + 1);
      }
    }
  } catch (error) {
    console.error('Error inserting or updating sleep data:', error);
  }
};

const BackButton = () => (
  <TouchableOpacity
    style={styles.backButton}
    onPress={() => router.navigate('/Trackers')}
  >
    <Ionicons name="chevron-back-circle-outline" size={35} color="white" />
  </TouchableOpacity>
);




let today = new Date().toISOString().split('T')[0]; 
const router = useRouter();

return (
  
  <ScrollView style={{backgroundColor: '#9678B4', height:'100%'}}>
  <SafeAreaView style={styles.dailybackground}>

  <BackButton />


    <View style={styles.entryContainer}>
        <Text style={styles.entryTitle}>Today's Entry</Text>
        <Text style={styles.entryDate}>{today}</Text>

    <View style={styles.timesContainer}>
      <Icon name="moon" size={30} color="white" style={styles.icon} />
      <View style={styles.timeContainer}>
        <TouchableOpacity onPress={showTimePickerComponent1}>
          <Text style={styles.timefont}>
            {formatTime(chosenTime1)}
          </Text>
        </TouchableOpacity>

        {showTimePicker1 && (
                <DateTimePicker
                  value={chosenTime1}
                  mode="time"
                  is24Hour={true}
                  display="clock"
                  onChange={onTimeChange1}
                />
              )}
      </View>

      <Text style={styles.separator}>-</Text>

      <View style={styles.timeContainer}>
        <TouchableOpacity onPress={showTimePickerComponent2}>
          <Text style={styles.timefont}>
            {formatTime(chosenTime2)}
          </Text>
        </TouchableOpacity>
          
        {showTimePicker2 && (
                <DateTimePicker
                  value={chosenTime2}
                  mode="time"
                  is24Hour={true}
                  display="clock"
                  onChange={onTimeChange2}
                />
              )}
      </View>
      <SunIcon name="sun" size={30} color="white" style={styles.icon} />
    </View>

      <View>
      <Text style={{color:'white' }}>Total Sleep:</Text>

      <View> 
        <Text style={{ fontSize: 26, color:'white' }}>{timeDifference} Hours</Text>
      </View>
    </View>

    <TouchableOpacity style={styles.update} onPress={handlePressSubmit}>
      <Text style={{color:'#9678B4'}}>Update</Text>
    </TouchableOpacity>

    </View>
  <SleepStats/>
  <SmallChart key={updateCounter}/>
  </SafeAreaView>
  </ScrollView>
);
};

const styles = StyleSheet.create({

  // backButton: {
  //   position: 'absolute',
  //   marginLeft: 10,
  //   marginTop: 5,
  //   width:20,
  //   backgroundColor: '#9678B4',
  // },

  backButton: {
    position: 'absolute', // Position over your chat content or at the top of your screen
    top: 14, // Adjust based on your status bar height or header
    left: 20,
    zIndex: 10, // Ensure it's above other content
  },

  dailybackground: {
    backgroundColor: '#9678B4',
    paddingBottom: 10,
  },

  entryContainer: {
    alignItems: 'center',
    color:'white',
    marginTop: 14,
  },
  entryTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'white',
    
  },
  entryDate: {
    fontSize: 14,
    color:'white',
    paddingBottom: 20,
  },

  timesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    color:'white',
  },

  timeContainer: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 5,
    marginHorizontal: 5,
    color:'white',
  },

  icon: {
    marginRight: 5,
  },

  timefont:{
    fontSize: 24,
    color:'white',
  },
  separator: {
    marginHorizontal: 5,
    fontSize: 30,
    color:'white',
  },

  update:{
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
    marginBottom: 8,
    borderRadius: 20,

  },
  datePicker: {
    width: 100,
  },

});

export default SleepTracker;
