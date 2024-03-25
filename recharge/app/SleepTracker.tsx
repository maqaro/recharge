import React, { useEffect, useState}  from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../lib/supabase';
import DateTimePicker from '@react-native-community/datetimepicker';


const SleepTracker = () => {

    const [chosenTime1, setChosenTime1] = useState(new Date());
    const [chosenTime2, setChosenTime2] = useState(new Date());
  
    const [showTimePicker1, setShowTimePicker1] = useState(false);
    const [showTimePicker2, setShowTimePicker2] = useState(false);
  
    const [timeDifference, setTimeDifference] = useState('0:00');
  

  
    const onTimeChange1 = (event: any, selectedTime: Date | undefined) => {
      setShowTimePicker1(false);
      if (selectedTime !== undefined) {
        setChosenTime1(selectedTime);
      }
    };
  
    const onTimeChange2 = (event: any, selectedTime: Date | undefined) => {
      setShowTimePicker2(false);
      if (selectedTime !== undefined) {
        setChosenTime2(selectedTime);
        chosenTime1.setDate(chosenTime1.getDate() - 1);
        const dateTime1 = chosenTime1;
        const dateTime2 = selectedTime;
        const difference = calculateDifference(dateTime1, dateTime2);
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
      const difference = dateTime2.getTime() - dateTime1.getTime();
      if (difference < 0) {
          return "ERROR, please check your entries";
      } else {
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
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
    const { data: {user}, error } = await supabase.auth.getUser(); // Get the authenticated user

    if (error) {
      console.error('Error fetching user data:', error.message);
      return;
    }
    let today = new Date().toISOString().split('T')[0]; 

    const { data, error: insertError } = await supabase.from('sleeptracker').upsert([
      { sleep_start: chosenTime1, sleep_end: chosenTime2, user_id: user?.id},
    ]);

    if (insertError) {
      console.error('Error inserting sleep data:', insertError.message);
    } 
  } catch (error) {
    console.error('Error inserting sleep data:', error);
  }
};

  useEffect(() => {
    handlePressSubmit();
  }, [chosenTime1, chosenTime2]);

let today = new Date().toISOString().split('T')[0]; 

  return (
    <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#1a7373', '#e37b60']} style={{height:'100%', width:'100%'}}>
      {/* Water Goal */}
      <View style={styles.totalSleepContainer}>
        <Text style={[styles.blueText, { fontSize: 22 }]}>Total Hours Sleep:</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.grayText, { fontSize: 26 }]}>
            {timeDifference}  Hours{" "}
          </Text>
        
        </View>
        <Text> Today's Date: {today}</Text>
      </View>
      <View style={styles.container}>
      <View style={styles.dateTimeContainer}>
        <TouchableOpacity onPress={showTimePickerComponent1}>
          <Text style={styles.dateText}>
            Start Time: {formatTime(chosenTime1)}
          </Text>
        </TouchableOpacity>
        {showTimePicker1 && (
          <DateTimePicker
            value={chosenTime1}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onTimeChange1}
          />
        )}
      </View>
      <View style={styles.dateTimeContainer}>
        <TouchableOpacity onPress={showTimePickerComponent2}>
          <Text style={styles.dateText}>
            End Time: {formatTime(chosenTime2)}
          </Text>
        </TouchableOpacity>
        {showTimePicker2 && (
          <DateTimePicker
            value={chosenTime2}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onTimeChange2}
          />
        )}
      </View>
    </View>

      </LinearGradient>
    </SafeAreaView>
  );
};
    

  export default SleepTracker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  progressBarContainer: {
    borderRadius: 40,
    borderWidth: 1,
    width: 40,
    height: 300,
    justifyContent: "flex-end",
  },

  totalSleepContainer: {
    padding: 50,
    alignItems: "center",
  },
  blueText: {
    color: "#1ca3ec",
    fontWeight: "600",
  },
  grayText: { color: "#323033", fontWeight: "600" },

  dateTimeContainer: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 20,
    padding: 10,
    color: 'blue',
  },
  submitButton: {
    fontSize: 20,
    padding: 10,
    color: 'green',
  },
});
