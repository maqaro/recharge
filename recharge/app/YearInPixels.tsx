import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { supabase } from '../lib/supabase';

interface EmotionEntry {
  date: string;
  emotion: string;
}

const MonthLetters = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

const emotions: { [key: string]: string } = {
  Happy: '#cfb108',
  Sad: '#4682BF',
  Angry: '#7d1204',
  Anxious: '#c4830a',
  Fustrated: '#7b5887',
  Love: '#ab445c',
  Calm: '#769476',
  Excited: '#b8533e',
  Embarassed: '#5e5959',
  Disgust: '#65781c',
  Bored: '#592963',
};

interface YearInPixelsProps {
  selectedYear: number;
}

const YearInPixels: React.FC<YearInPixelsProps> = ({ selectedYear }) => {
  const [calendarData, setCalendarData] = useState<EmotionEntry[]>([]);
  const [userid, setUserid] = useState<string | undefined>();

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
    const fetchCalendarData = async () => {
      if (!userid) return; // Exit if no user is authenticated

      const { data, error } = await supabase
        .from('emotiontracker')
        .select('date, emotion')
        .eq('user_id', userid) // Filter data based on user ID
        .gte('date', `${selectedYear}-01-01`) // Filter data for the selected year onwards
        .lte('date', `${selectedYear}-12-31`); // Filter data for the selected year up to the end

      if (error) {
        console.error('Error fetching data from Supabase:', error.message);
        return;
      }
      setCalendarData(data || []);
    };

    fetchCalendarData();
  }, [userid, selectedYear]);

  const getColorForDate = (date: string): string | undefined => {
    const entry = calendarData.find((entry) => entry.date === date);
    return entry ? emotions[entry.emotion] : undefined;
  };

  const renderCalendar = () => {
    return (
      <ScrollView horizontal={true}>
        <View style={styles.container}>
          <View style={styles.dayNumbers}>
            {[...Array(32).keys()].map((day) => (
              <View key={`day-${day}`} style={styles.dayNumberContainer}>
                <Text style={styles.dayNumber}>{day}</Text>
              </View>
            ))}
          </View>
          <View style={styles.calendarContainer}>
            {[...Array(12).keys()].map((month, monthIndex) => (
              <View key={`month-${month}`} style={styles.monthContainer}>
                <Text style={styles.monthLabel}>{MonthLetters[month]}</Text>
                {[...Array(getDaysInMonth(selectedYear, month + 1)).keys()].map((day) => {
                  const date = new Date(selectedYear, month, day + 1).toISOString().split('T')[0];
                  const color = getColorForDate(date);
                  return (
                    <View key={`${month}-${day}`} style={[styles.dayContainer, { backgroundColor: color ? color : '#CCCCCC' }]} />
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  return renderCalendar();
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width:'100%'
  },
  dayNumbers: {
    marginRight: 10,
    marginTop:13,
  },
  dayNumberContainer: {
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayNumber: {
    fontSize: 12,
  },
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  monthContainer: {
    marginLeft: 9,
    flexDirection: 'column',
    alignItems: 'center',
  },
  monthLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dayContainer: {
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:50,
  },
});

export default YearInPixels;
