import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import { supabase } from '../../lib/supabase';

interface EmotionEntry {
  date: string;
  emotion: string;
}

interface CalendarDayProps {
  day: number;
  emotion: string;
}

const emotions: { [key: string]: { color: string; image: any } } = {
  Happy: { color: '#cfb108',  image: require('./happy.jpg') },
  Sad: { color: '#4682BF', image: require('./sad.jpg')  },
  Angry: { color: '#7d1204',image: require('./angry.jpg') },
  Anxious: { color: '#c4830a',  image: require('./anxious.jpg') },
  Fustrated: { color: '#7b5887', image: require('./fustrated.jpg')  },
  Love: { color: '#ab445c',image: require('./love.jpg') },
  Calm: { color: '#769476',  image: require('./calm.jpg') },
  Excited: { color: '#b8533e', image: require('./excited.jpg')  },
  Embarassed: { color: '#5e5959',image: require('./embarassed.jpg') },
  Disgust: { color: '#65781c', image: require('./disgust.jpg')  },
  Bored: { color:  '#592963',image: require('./bored.jpg') },
  // Add image paths for other emotions similarly
};


const CalendarDay: React.FC<CalendarDayProps> = ({ day, emotion }) => {
  const { color, image } = emotions[emotion] || { color: 'white', image: null }; // Default to white if no emotion is provided

  return (
    <View style={styles.day}>
      <ImageBackground source={image} style={styles.backgroundImage}>
      <Text>{day}</Text>
      </ImageBackground>
    </View>
  );
};

interface EmotionCalendarProps {
  selectedYear: number; // Add a prop for the selected year
}

const EmotionCalendar: React.FC<EmotionCalendarProps> = ({ selectedYear }) => {
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

  const months = [...Array(12).keys()]; // 0-indexed months

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.calendar}>
        {months.map((monthIndex) => {
          const month = new Date(selectedYear, monthIndex, 1).toLocaleDateString(undefined, { month: 'long' });
          return (
            <View key={monthIndex} style={styles.month}>
              <Text style={styles.monthHeader}>{month}</Text>
              <View style={styles.daysRow}>
                {[...Array(new Date(selectedYear, monthIndex + 1, 0).getDate()).keys()].map((day) => {
                  const date = new Date(selectedYear, monthIndex, day + 1);
                  const dateString = date.toISOString().split('T')[0];
                  const matchingEntry = calendarData.find((entry) => entry.date === dateString);
                  return (
                    <CalendarDay
                      key={day}
                      day={day + 1}
                      emotion={matchingEntry ? matchingEntry.emotion : ''}
                    />
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 2,
  },
  calendar: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  month: {
    marginBottom: 10,
  },
  monthHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  daysRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  day: {
    width: 40,
    height: 40,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emotionImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  }
});

export default EmotionCalendar;
