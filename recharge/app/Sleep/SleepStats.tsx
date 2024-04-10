import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { supabase } from '../../lib/supabase'; // Assuming supabase is properly configured

const SleepStats: React.FC = (key) => {
    const [userid, setUserid] = useState<string | undefined>();
    const [sleepData, setSleepData] = useState<any[]>([]);
    const [averageSleep, setAverageSleep] = useState<string>('');
    const [longestSlept, setLongestSlept] = useState<string>('');
    const [leastSlept, setLeastSlept] = useState<string>('');
    const [totalEntries, setTotalEntries] = useState<number>(0);
  
    useEffect(() => {
      fetchSleepData();
    }, []);
  
    const fetchSleepData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUserid(user?.id);
  
        let { data: sleeptracker, error } = await supabase
          .from('sleeptracker')
          .select('*')
          .eq('user_id', user?.id);
  
        if (error) {
          console.error('Error fetching sleep data:', error);
        } else {
          if (sleeptracker) {
            setSleepData(sleeptracker); // Update state with the fetched sleep data
            calculateSleepStats(sleeptracker);
          }
        }
      } catch (error) {
        console.error('Error fetching sleep data:', error);
      }
    };
  
    const calculateSleepStats = (sleepData: any[]) => {
      // Calculate average sleep duration
      const totalSleepTime = sleepData.reduce((acc, entry) => {
        const sleepStart = new Date(entry.sleep_start).getTime();
        const sleepEnd = new Date(entry.sleep_end).getTime();
        return acc + (sleepEnd - sleepStart);
      }, 0);
      const averageSleepTime = totalSleepTime / sleepData.length;
  
      // Convert milliseconds to hours and minutes for average sleep time
      let averageHours = Math.floor(averageSleepTime / (1000 * 60 * 60));
      let averageMinutes = Math.floor((averageSleepTime % (1000 * 60 * 60)) / (1000 * 60));
  
      // Find longest and shortest sleep duration
      let longestSleep = 0;
      let shortestSleep = Number.MAX_SAFE_INTEGER;
      sleepData.forEach(entry => {
        const sleepStart = new Date(entry.sleep_start).getTime();
        const sleepEnd = new Date(entry.sleep_end).getTime();
        const sleepDuration = sleepEnd - sleepStart;
        if (sleepDuration > longestSleep) longestSleep = sleepDuration;
        if (sleepDuration < shortestSleep) shortestSleep = sleepDuration;
      });
  
      // Convert milliseconds to hours and minutes for longest and shortest sleep
      let longestHours = Math.floor(longestSleep / (1000 * 60 * 60));
      let longestMinutes = Math.floor((longestSleep % (1000 * 60 * 60)) / (1000 * 60));
      let shortestHours = Math.floor(shortestSleep / (1000 * 60 * 60));
      let shortestMinutes = Math.floor((shortestSleep % (1000 * 60 * 60)) / (1000 * 60));
  
      // Total number of entries
      const totalEntries = sleepData.length;

      if (shortestSleep === Number.MAX_SAFE_INTEGER) shortestHours = 0; shortestMinutes=0;
      if (Number.isNaN(averageHours)) averageHours = 0; averageMinutes =0; 
  
      setAverageSleep(`${averageHours} hrs ${averageMinutes} min`);
      setLongestSlept(`${longestHours} hrs ${longestMinutes} min`);
      setLeastSlept(`${shortestHours} hrs ${shortestMinutes} min`);
      setTotalEntries(totalEntries);
    };
  
    return (
        <View style={styles.container}>
          <Text style={styles.header}>Sleep Statistics</Text>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
            <Text style={styles.label}>Average Sleep</Text>
            <Text style={styles.data}>{averageSleep}</Text>
            </View>

            <View style={styles.stat}>
            <Text style={styles.label}>Total Records</Text>
            <Text style={styles.data}>{totalEntries} Entries</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
            <Text style={styles.label}>Longest Slept</Text>
            <Text style={styles.data}>{longestSlept}</Text>
            </View>
            <View style={styles.stat}>
            <Text style={styles.label}>Least Slept</Text>
            <Text style={styles.data}>{leastSlept}</Text>
            </View>
          </View>
          
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        borderTopWidth: 1, // Add border width for the top border
        borderTopColor: '#ccc', // Add border color for the top border
        paddingTop: 10,
        borderBottomWidth: 1, // Add border width for the top border
        borderBottomColor: '#ccc',
      },
      header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color:'white',
        alignSelf: 'flex-start',
      },
      statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width:'100%',
        marginTop: 0,
      },  
      label: {
        padding: 5,
        color: 'white'
      },
      data: {
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 10,
        marginBottom: 10,
        width:130,

      },

      stat: {

      }
    });
  
  export default SleepStats;
  