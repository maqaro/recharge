import React, { useState, useEffect } from 'react';
import { Text, View, Modal, TouchableOpacity, SafeAreaView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { supabase } from '../../lib/supabase';
import Icon from 'react-native-vector-icons/AntDesign';
import SleepHistory from './SleepHistory';
import { Ionicons } from '@expo/vector-icons';

interface SleepDataItem {
    id: number;
    sleep_start: string;
    sleep_end: string;
    user_id: string;
}

interface SleepChartProps {
    filterStartDate: Date;
    filterEndDate: Date;
    sleepData: SleepDataItem[];
}


const SmallChart: React.FC = (key) => {

    const currentDate: Date = new Date();
    const currentDayOfWeek: number = currentDate.getDay()
    let daysSinceMonday: number = currentDayOfWeek - 1; 

    if (currentDayOfWeek === 0) {
        daysSinceMonday = 6;
    }

    const initialStartDate: Date = new Date(currentDate);
    initialStartDate.setDate(currentDate.getDate() - daysSinceMonday);
    initialStartDate.setHours(0, 0, 0, 0);

    const [filterStartDate, setStartDate] = useState<Date>(initialStartDate);
    const [filterEndDate, setEndDate] = useState<Date>(new Date(filterStartDate.getTime() + (6 * 24 * 60 * 60 * 1000)));
    const [userid, setUserid] = useState<string | undefined>();
    const [sleepData, setSleepData] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);



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
            }
          }
        } catch (error) {
          console.error('Error fetching sleep data:', error);
        }
      };

    // Filter sleep data based on filterStartDate and filterEndDate
    const sortedSleepData = sleepData.sort((a, b) => {
        const dateA = new Date(a.sleep_start);
        const dateB = new Date(b.sleep_start);
        return dateA.getTime() - dateB.getTime();
    });

    const filteredSleepData = sortedSleepData.filter((data) => {
        const sleepStartDate = new Date(data.sleep_start);
        return sleepStartDate >= filterStartDate && sleepStartDate <= filterEndDate;
    });

    const sleepDurations = filteredSleepData.map((data) => {
        const sleepStart = new Date(data.sleep_start);
        const sleepEnd = new Date(data.sleep_end);
        return (sleepEnd.getTime() - sleepStart.getTime()) / (1000 * 60 * 60); // Convert milliseconds to hours
    });

    const formatXAxisLabel = (date: Date): string => {
        // Get the day of the week for the given date
    const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
    return dayOfWeek; // Return the day of the week
    };

    const startDates = filteredSleepData.map((data) => {
        const sleepStartDate = new Date(data.sleep_start);
        return formatXAxisLabel(sleepStartDate);
    });

    const handleCloseModal = () => {
        setModalVisible(false);
    };



    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const daysOfWeekShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Create an array of sleep durations for each day of the week
    const sleepDurationsByDay = daysOfWeek.map(day => {
        // Find sleep data for the current day
        const sleepDataForDay = filteredSleepData.filter(data => {
            const sleepStartDate = new Date(data.sleep_start);
            return formatXAxisLabel(sleepStartDate) === day;
        });

        // Calculate total sleep duration for the day
        const totalSleepDuration = sleepDataForDay.reduce((total, data) => {
            const sleepStart = new Date(data.sleep_start);
            const sleepEnd = new Date(data.sleep_end);
            return total + (sleepEnd.getTime() - sleepStart.getTime()) / (1000 * 60 * 60); // Convert milliseconds to hours
        }, 0);

        return totalSleepDuration;
    });

    // Create an array of sleep durations with 0 values for missing days
    const filledSleepDurations = daysOfWeek.map((day, index) => {
        return sleepDurationsByDay[index] || 0;
    });


    // Render the chart with filtered sleep data
    return (
        <View style={{width:'100%', alignSelf:'center'}}>
            <SafeAreaView style={{width:'100%', alignSelf:'center'}}>
            <View style={{flexDirection: 'row',justifyContent: 'space-around', paddingTop:15}}>
                <Text style={{fontSize: 20,fontWeight: 'bold',marginBottom: 10,color:'white',alignSelf: 'flex-start',}}>Sleep Graph</Text>
                <TouchableOpacity  onPress={() => setModalVisible(true)}>
                <Icon name="rightcircleo" size={25} color="white" />
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <TouchableOpacity style={{backgroundColor: '#9678B4', paddingTop:25, paddingLeft:10}} onPress={() => setModalVisible(false)}>
                    <Ionicons name="chevron-back-circle-outline" size={30} color="white" />
                </TouchableOpacity>

                <SleepHistory/>
                
            </Modal>
            <BarChart
                data={{
                    labels: daysOfWeekShort,
                    datasets: [
                        {
                            data: filledSleepDurations,
                        },
                    ],
                }}
                width={300}
                height={180}
                yAxisSuffix=" hrs"
                yAxisLabel=""
                yAxisInterval={1}
                fromZero
                chartConfig={{
                    backgroundGradientFrom: 'rgba(255, 255, 255, 0.5)', // Adjust opacity and RGB values for lilac color
                    backgroundGradientTo: 'rgba(255, 255, 255, 0.5)', // Adjust opacity and RGB values for lilac color
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                        
                    },
                    propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#ffa726',
                    },
                    barPercentage:0.8,
                    
                }}
                style={{
                    marginVertical: 8,
                    marginLeft: 5,
                    alignSelf:'center'
                }}
            />
            </SafeAreaView>
        </View>
    );
};

export default SmallChart;