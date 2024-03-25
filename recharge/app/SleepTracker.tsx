import React, { useEffect, useState, useRef }  from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { AddRemoveButton } from "./AddRemoveButton";
import { supabase } from '../lib/supabase';
import DateTimePicker from '@react-native-community/datetimepicker';

const amounts = [250, 500, 1000, 1500];

const SleepTracker = () => {
    const [userid, setUserid] = useState<string | undefined>();

    const [fillingPercentage, setFillingPercentage] = useState(0);
    const [sleepStart, setSleepStart] = useState(new Date());
    const [sleepEnd, setSleepEnd] = useState(new Date());
    const [isdataStored, setisDataStored] = useState(false);

    const [chosenDate1, setChosenDate1] = useState(new Date());
    const [chosenTime1, setChosenTime1] = useState(new Date());
    const [chosenDate2, setChosenDate2] = useState(new Date());
    const [chosenTime2, setChosenTime2] = useState(new Date());
  
    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [showTimePicker1, setShowTimePicker1] = useState(false);
    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [showTimePicker2, setShowTimePicker2] = useState(false);
  
    const [timeDifference, setTimeDifference] = useState('');
    const [isDataAdded, setIsDataAdded] = useState(false);
  
    const onDateChange1 = (event: any, selectedDate: React.SetStateAction<Date> | undefined) => {
      setShowDatePicker1(false);
      if (selectedDate !== undefined) {
        setChosenDate1(selectedDate);
      }
    };
  
    const onTimeChange1 = (event: any, selectedTime: Date | undefined) => {
      setShowTimePicker1(false);
      if (selectedTime !== undefined) {
        setChosenTime1(selectedTime);
      }
    };
  
    const onDateChange2 = (event: any, selectedDate: React.SetStateAction<Date> | undefined) => {
      setShowDatePicker2(false);
      if (selectedDate !== undefined) {
        setChosenDate2(selectedDate);
      }
    };
  
    const onTimeChange2 = (event: any, selectedTime: Date | undefined) => {
      setShowTimePicker2(false);
      if (selectedTime !== undefined) {
        setChosenTime2(selectedTime);
        const dateTime1 = combineDateTime(chosenDate1, chosenTime1);
        const dateTime2 = combineDateTime(chosenDate2, selectedTime);
        const difference = calculateDifference(dateTime1, dateTime2);
        setTimeDifference(difference);
      }
    };
  
    const showDatePickerComponent1 = () => {
      setShowDatePicker1(true);
    };
  
    const showTimePickerComponent1 = () => {
      setShowTimePicker1(true);
    };
  
    const showDatePickerComponent2 = () => {
      setShowDatePicker2(true);
    };
  
    const showTimePickerComponent2 = () => {
      setShowTimePicker2(true);
    };
  
    const combineDateTime = (date: Date, time: Date) => {
      const combinedDateTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),
        time.getSeconds()
      );
      return combinedDateTime;
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

  
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
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
      { sleep_start: sleepStart, sleep_end: sleepEnd, user_id: user?.id, date: today },
    ], { onConflict: 'date' });
    setisDataStored(true)

    if (insertError) {
      console.error('Error inserting sleep data:', insertError.message);
    } 
  } catch (error) {
    console.error('Error inserting sleep data:', error);
  }
};
  // End of Progress Bar Animation

  useEffect(() => {
    handlePressSubmit();
  }, [sleepStart, sleepEnd]);

  const calculateTotalSleep = (start: Date, end: Date) => {
    const startTime = start.getTime();
    const endTime = end.getTime();
    const totalSleepMinutes = (endTime - startTime) / (1000 * 60); // Convert milliseconds to minutes

    const hours = Math.floor(totalSleepMinutes / 60);
    const minutes = Math.round(totalSleepMinutes % 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`; // Format as HH:MM
};

  return (
    <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#1a7373', '#e37b60']} style={{height:'100%', width:'100%'}}>
      {/* Water Goal */}
      <View style={styles.waterGoalContainer}>
        <Text style={[styles.blueText, { fontSize: 22 }]}>You are going to sleep for</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.grayText, { fontSize: 26 }]}>
            {calculateTotalSleep(sleepStart, sleepEnd)}  Hours{" "}
          </Text>
        </View>
      </View>
      <View style={styles.container}>
      <View style={styles.dateTimeContainer}>
        <TouchableOpacity onPress={showDatePickerComponent1}>
          <Text style={styles.dateText}>
            First Date: {formatDate(chosenDate1)}
          </Text>
        </TouchableOpacity>
        {showDatePicker1 && (
          <DateTimePicker
            value={chosenDate1}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onDateChange1}
          />
        )}
        <TouchableOpacity onPress={showTimePickerComponent1}>
          <Text style={styles.dateText}>
            First Time: {formatTime(chosenTime1)}
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
        <TouchableOpacity onPress={showDatePickerComponent2}>
          <Text style={styles.dateText}>
            Second Date: {formatDate(chosenDate2)}
          </Text>
        </TouchableOpacity>
        {showDatePicker2 && (
          <DateTimePicker
            value={chosenDate2}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onDateChange2}
          />
        )}
        <TouchableOpacity onPress={showTimePickerComponent2}>
          <Text style={styles.dateText}>
            Second Time: {formatTime(chosenTime2)}
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
      {timeDifference !== '' && (
        <Text style={styles.dateText}>
          Time Difference: {timeDifference}
        </Text>
      )}
      <TouchableOpacity onPress={handlePressSubmit} disabled={isDataAdded}>
            <Text style={[styles.submitButton, isDataAdded && styles.disabledButton]}>Submit</Text>
        </TouchableOpacity>
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
  waterButtonsContainer: {
    flexDirection: "row",
    paddingVertical: 30,
    width: "100%",
    justifyContent: "space-around",
  },
  waterGoalContainer: {
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
  disabledButton: {
    backgroundColor: 'grey', // Change color when disabled
  },
});