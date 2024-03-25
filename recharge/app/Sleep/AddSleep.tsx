import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from '../../lib/supabase'; 

const AddSleep = () => {
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

  const handlePressSubmit = async () => {
    try {
      const { data: {user}, error } = await supabase.auth.getUser(); // Get the authenticated user

      if (error) {
        console.error('Error fetching user data:', error.message);
        return;
      }

      const combinedDateTime1 = combineDateTime(chosenDate1, chosenTime1);
      const combinedDateTime2 = combineDateTime(chosenDate2, chosenTime2);

      // Insert combinedDateTime1, combinedDateTime2, and user_id into Supabase table
      const { data, error: insertError } = await supabase.from('sleeptracker').insert([
        { sleep_start: combinedDateTime1, sleep_end: combinedDateTime2, user_id: user?.id },
      ]);

      if (insertError) {
        console.error('Error inserting sleep data:', insertError.message);
      } else {
        setIsDataAdded(true);
        //return ('Data Successfully added');
      }
    } catch (error) {
      console.error('Error inserting sleep data:', error);
    }
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

  return (
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
  );
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    backgroundColor: 'white',
    color: 'white', // Change color when disabled
  },
});

export default AddSleep;



