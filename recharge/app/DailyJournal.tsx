import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { supabase } from '../lib/supabase';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import NavBar from './NavBar';

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
    return { currentMonth, currentDay};
  };

const DailyJournal: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [day, setDay] = useState<number | null>(null);
  const [month, setMonth] = useState<string | null>(null);
  const year = 2024;

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [FormattedDate, setFormattedDate] = useState<string>('2024-01-01');
  const [userid, setUserid] = useState<string | undefined>();

  const router = useRouter();


  useEffect(() => {
    // Fetch user ID when component mounts

    fetchUserId();

    setSelectedMonth('January');
    setSelectedDay(1);
    setMonth('January');
    setDay(1);

  }, []);

  const handleTodayButtonClick = () => {
    const { currentMonth, currentDay } = getCurrentDate();
    setSelectedMonth(currentMonth);
    setSelectedDay(currentDay);
    setMonth(currentMonth);
    setDay(currentDay);
  };

  const fetchUserId = async () => {
    try {
      const { data: {user}} = await supabase.auth.getUser();
      setUserid(user?.id);
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };



  useEffect(() => {
    if (year && month && day) {
      const monthIndex = months.findIndex(m => m.value === month);
      const formattedMonth = monthIndex < 9 ? `0${monthIndex + 1}` : `${monthIndex + 1}`;
      const formattedDay = day < 10 ? `0${day}` : `${day}`;
      const dateString = `${year}-${formattedMonth}-${formattedDay}`;
      setFormattedDate(dateString); // Update the formatted date whenever year, month, or day changes
    }
  }, [year, month, day, selectedMonth, selectedDay]);

  useEffect(() => {
    fetchJournalEntry();
  }, [FormattedDate]);



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
          const journalEntry = journalEntries[0];
          setTitle(journalEntry.title);
          setDescription(journalEntry.entry);
        } else {
          setTitle('No entry currently added for this date');
          setDescription('');
        }
      } catch (error) {
        console.error('Error fetching journal entry:', error);
      }
    }
  };


  const handleUpdate = async () => {
    if (userid && FormattedDate) {
      try {
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
          const existingEntryId = existingEntries[0].id;
          const { error: updateError } = await supabase
            .from('dailyjournal')
            .update({ title, entry: description })
            .eq('id', existingEntryId);
  
          if (updateError) {
            console.error('Error updating journal entry:', updateError);
          } else {
          }
        } else {
          const { error: insertError } = await supabase
            .from('dailyjournal')
            .insert([{ user_id: userid, created_on: FormattedDate, title, entry: description }]);
  
          if (insertError) {
            console.error('Error inserting new journal entry:', insertError);
          } else {
          }
        }
      } catch (error) {
        console.error('Error updating/inserting journal entry:', error);
      }
    }
  };
  
  

  const handleTitleChange = (text: string) => {
    setTitle(text);
    handleUpdate();
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
    handleUpdate(); 
  };

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setMonth(month);
  };
  
  const handleDaySelect = (selectedDay: number) => {
    setSelectedDay(selectedDay);
    setDay(selectedDay);
  };

  const renderEntryForDate = () => {
    if (!FormattedDate) return null; 

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentDay = String(currentDate.getDate()).padStart(2, '0');
    const currentDateFormatted = `${currentYear}-${currentMonth}-${currentDay}`;

    if (FormattedDate === currentDateFormatted) {
      
      // CURRENT DAY ENTRY
      return (
        <>
        <View style={styles.todaybackground}>
        <Text style={styles.toptext}>Write Down Your Thoughts</Text>
        <Text style={styles.helptext}>Choose a month and date to view past entries or write one for today!</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Title"
            value={title}
            onChangeText={handleTitleChange}
          />
          <TextInput
            style={styles.descriptionInput}
            multiline
            placeholder="Description"
            value={description}
            onChangeText={handleDescriptionChange}
          />
        </View>
        </>
      );
      // PAST ENTRIES
    } else if (title !== 'No entry currently added for this date') {
      return (
        <>
        <Text style={styles.toptextEntry}>Write Down Your Thoughts</Text>
        <Text style={styles.helptextPastEntry}>Choose a month and date to view past entries or write one for today!</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={{alignSelf:'center'}}>{FormattedDate}</Text>
          <ScrollView style={styles.descriptionScrollView}>
          <Text style={styles.description}>{description}</Text>
          </ScrollView>

        </>
      );
    } else {
      return(
      // NO ENTRY
      <View>
        <Text style={styles.toptext}>Write Down Your Thoughts</Text>
        <View style={{height: 496, backgroundColor: 'rgba(0, 0, 0, .7)', padding: 10, marginBottom:9.5}}>
      <View style={{alignSelf:'center', backgroundColor: 'white', width:'100%', height: 475}}>
      <Text style={styles.helptextNoEntry}>Choose a month and date to view past entries or write one for today!</Text>
      <Text style={{alignSelf:'center', fontSize:24, marginVertical: 220}}>No entry for this date</Text>
      </View>
      </View>
      </View>
      );
    }
  };

  const renderDaysButtons = (days: number) => {
    const buttons = [];
    for (let i = 1; i <= days; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.dayButton,
            selectedDay === i ? styles.selectedDayButton : null
          ]}
          onPress={() => handleDaySelect(i)}>
          <Text style={{alignSelf:'center'}}>{i}</Text>
        </TouchableOpacity>
      );
    }
    return buttons;
  };

  const BackButton = () => (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => router.navigate('/Homepage')}
    >
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );


  const DropDown = () => (
    <TouchableOpacity
      style={styles.Dropdown}>
      <Ionicons name="chevron-down-outline" size={25} color="black" />
    </TouchableOpacity>
  );

  return (
    <View style={{backgroundColor:'lightblue'}}>
      <BackButton />
      <View style={styles.header}>
      
      <TouchableOpacity>
        <View style={styles.pickerContainer}>
          {/* <DropDown /> */}
          <RNPickerSelect
            onValueChange={(value) => handleMonthSelect(value)}
            items={months}
            placeholder={{ label: 'Select a month', value: null }}
            value={selectedMonth}
            style={{
              inputIOS: styles.pickerText,
              inputAndroid: styles.pickerText,
            }}
          />
        </View>
        </TouchableOpacity>

        
        <TouchableOpacity onPress={handleTodayButtonClick} style={styles.TodayButton}>
          <Text style={styles.buttonText}>Today's Date</Text>
        </TouchableOpacity>
      </View>

      {selectedMonth && (
        <ScrollView style={{ height: 50}} horizontal showsHorizontalScrollIndicator={false}>
          {renderDaysButtons(months.find(month => month.value === selectedMonth)?.days || 0)}
        </ScrollView>
      )}

      <View style={{ flex:1,marginVertical: 10, alignItems: 'center' }}>
        <Text>{day && month ? `${day} ${month} ${year}` : 'No date selected'}</Text>
      </View>

      <View style={styles.inputContainer}>
        {renderEntryForDate()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: 'transparent',
    marginTop: 150,
  },

  todaybackground: {
    height: 505, 
    backgroundColor: 'white', 
    padding: 20,
    borderRadius: 5,
    // opacity: 0.6,
  },

  toptext: {
    fontSize: 24,
    // alignSelf: 'center',
    marginTop: -276,
    left: 55,
    position: 'absolute',
    fontWeight: 'bold',
  },

  helptext: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: -220,
    // left: 55,
    position: 'absolute',
    textAlign: 'center',
  },

  toptextEntry: {
    fontSize: 24,
    marginTop: -276,
    left: 75,
    position: 'absolute',
    fontWeight: 'bold',
  },

  helptextNoEntry: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: -230,
    // left: 55,
    position: 'absolute',
    textAlign: 'center',
  },

  helptextPastEntry: {
    fontSize: 18,
    // alignSelf: 'center',
    marginTop: -220,
    // left: 55,
    position: 'absolute',
    marginLeft: 50.5,
    textAlign: 'center',
  },

  pickerContainer: {
    flex: 1,
    marginLeft: 0,
    marginTop: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    padding: 10,
    borderRadius: 5,
    marginRight: 165,
  },

  pickerText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  // buttonContainer: {
  //   backgroundColor: 'white',
  //   borderRadius: 40, // Oval shape with rounded corners
  // },

  TodayButton: {
    backgroundColor: 'rgba(0, 0, 0, .7)',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  backButton: {
    position: 'absolute',
    // top: 14, 
    marginTop: 23,
    left: 20,
    zIndex: 10,
  },

  Dropdown: {
    position: 'absolute',
    top: -4, 
    left: 75,
    zIndex: 10,
  },

  inputContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  titleInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 3,
    // borderColor: 'black',
    borderColor: 'rgba(0, 0, 0, .7)',
    borderRadius: 5,
    width: '100%',
    backgroundColor:'white'
  },
  descriptionInput: {
    padding: 10,
    borderWidth: 3,
    // borderColor: 'black',
    borderColor: 'rgba(0, 0, 0, .7)',
    borderRadius: 5,
    height: 415,
    textAlignVertical: 'top',
    width: '100%',
    marginBottom: 5,
    backgroundColor:'white',
  },
  dayButton: {
    padding: 10,
    paddingHorizontal:15,
    marginHorizontal: 3,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  selectedDayButton: {
    backgroundColor: '#83C2D9', // Color for selected day
  },

  title:{
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 28,
  },

  description: {
    padding: 20,
    height: 414,
    backgroundColor: 'white', 
  },
  descriptionScrollView: {
    height: 435, // Limit the maximum height of the ScrollView
    marginVertical: 10, // Add vertical margin
    padding: 10, // Add padding inside the ScrollView
    backgroundColor: 'rgba(0, 0, 0, .7)', // Background color
},

});

export default DailyJournal;

