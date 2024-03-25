import React, { useState, useEffect } from 'react';
import { View, Button, Alert, ScrollView, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { supabase } from '../lib/supabase';

const months = [
  { label: 'January', value: 'January', days: 31 },
  { label: 'February', value: 'February', days: 29 }, // Assuming a non-leap year for simplicity
  { label: 'March', value: 'March', days: 31 },
  { label: 'April', value: 'April', days: 30 },
  { label: 'May', value: 'May', days: 31 },
  { label: 'June', value: 'June', days: 30 },
  { label: 'July', value: 'July', days: 31 },
  { label: 'August', value: 'August', days: 31 },
  { label: 'September', value: 'September', days: 30 },
  { label: 'October', value: 'October', days: 31 },
  { label: 'November', value: 'November', days: 30 },
  { label: 'December', value: 'December', days: 31 }
];

const getCurrentDate = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const currentDay = currentDate.getDate();
    return { currentMonth, currentDay };
  };

const DailyJournal: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [day, setDay] = useState<number | null>(null);
  const [month, setMonth] = useState<string | null>(null);
  const year = 2024;

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [FormattedDate, setFormattedDate] = useState<string | null>(null);
  const [userid, setUserid] = useState<string | undefined>();


  useEffect(() => {
    // Fetch user ID when component mounts
    const fetchUserId = async () => {
      try {
        const { data: { user }, } = await supabase.auth.getUser();
        setUserid(user?.id);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();

    const { currentMonth, currentDay } = getCurrentDate();
    setSelectedMonth(currentMonth);
    setSelectedDay(currentDay);
    setMonth(currentMonth);
    setDay(currentDay);


  }, []);



  useEffect(() => {
    if (year && month && day) {
      const monthIndex = months.findIndex(m => m.value === month);
      const formattedMonth = monthIndex < 9 ? `0${monthIndex + 1}` : `${monthIndex + 1}`;
      const formattedDay = day < 10 ? `0${day}` : `${day}`;
      const dateString = `${year}-${formattedMonth}-${formattedDay}`;
      setFormattedDate(dateString); // Update the formatted date whenever year, month, or day changes
    }
  }, [year, month, day]);

  useEffect(() => {
    const fetchJournalEntry = async () => {
      if (userid && FormattedDate) {
        try {
          // Fetch journal entry based on the formatted date and user ID
          const { data: journalEntries, error } = await supabase
            .from('dailyjournal')
            .select('*')
            .eq('user_id', userid)
            .eq('created_on', FormattedDate);
  
          if (error) {
            console.error('Error fetching journal entry:', error);
            return;
          }
  
          if (journalEntries && journalEntries.length > 0) {
            const journalEntry = journalEntries[0]; // Assume there's only one journal entry for a specific date
            setTitle(journalEntry.title);
            setDescription(journalEntry.entry);
          } else {
            // If no entry found, update state to show a message
            setTitle('No entry currently added for this date');
            setDescription('');
          }
        } catch (error) {
          console.error('Error fetching journal entry:', error);
        }
      }
    };
  
    fetchJournalEntry();
  }, [FormattedDate]);


  const handleUpdate = async () => {
    if (userid && FormattedDate) {
      try {
        // Check if a journal entry already exists for the formatted date
        const { data: existingEntries, error: fetchError } = await supabase
          .from('dailyjournal')
          .select('*')
          .eq('user_id', userid)
          .eq('created_on', FormattedDate);
  
        if (fetchError) {
          console.error('Error fetching existing journal entry:', fetchError);
          return;
        }
  
        if (existingEntries && existingEntries.length > 0) {
          // If a journal entry exists, update it
          const existingEntryId = existingEntries[0].id; // Assuming the primary key is named 'id'
          const { error: updateError } = await supabase
            .from('dailyjournal')
            .update({ title, entry: description })
            .eq('id', existingEntryId);
  
          if (updateError) {
            console.error('Error updating journal entry:', updateError);
          } else {
            Alert.alert('Success', 'Journal entry updated successfully');
          }
        } else {
          // If no journal entry exists, insert a new one
          const { error: insertError } = await supabase
            .from('dailyjournal')
            .insert([{ user_id: userid, created_on: FormattedDate, title, entry: description }]);
  
          if (insertError) {
            console.error('Error inserting new journal entry:', insertError);
          } else {
            Alert.alert('Success', 'New journal entry created successfully');
          }
        }
      } catch (error) {
        console.error('Error updating/inserting journal entry:', error);
      }
    }
  };
  
  





  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setMonth(month);
  };
  
  const handleDaySelect = (selectedDay: number) => {
    setSelectedDay(selectedDay);
    setDay(selectedDay);
  };

  const renderDaysButtons = (days: number) => {
    const buttons = [];
    for (let i = 1; i <= days; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.dayButton,
            selectedDay === i ? styles.selectedDayButton : null // Change color if selected
          ]}
          onPress={() => handleDaySelect(i)}>
          <Text>{i}</Text>
        </TouchableOpacity>
      );
    }
    return buttons;
  };


  return (
    <View>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
        <RNPickerSelect
          onValueChange={(value) => handleMonthSelect(value)}
          items={months}
          placeholder={{ label: 'Select a month', value: null }}
          value={selectedMonth}
        />
      </View>
      {selectedMonth && (
        <ScrollView style={{ height: 50}} horizontal showsHorizontalScrollIndicator={false}>
          {renderDaysButtons(months.find(month => month.value === selectedMonth)?.days || 0)}
        </ScrollView>
      )}
      <View style={{ marginVertical: 10, alignItems: 'center' }}>
        <Text>{day && month ? `${day} ${month} ${year}` : 'No date selected'}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.descriptionInput}
          multiline
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />

        <Button title="Update" onPress={handleUpdate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dayButton: {
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    height: 50,
  },
  selectedDayButton: {
    backgroundColor: 'lightblue' // Change to your desired color
  },
  inputContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
    width: '100%'
  },
  titleInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: '100%'
  },
  descriptionInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    height: 400,
    textAlignVertical: 'top',
    width: '100%',
    marginBottom: 5,
  }
});

export default DailyJournal;

