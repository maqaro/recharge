import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import SleepChart from './SleepChart';

interface SleepDataItem {
    id: number;
    sleep_start: string;
    sleep_end: string;
    user_id: string;
}

interface WeekChartProps {
    filterStartDate: Date;
    filterEndDate: Date;
    sleepData: SleepDataItem[] | null; // Union type for sleepData or null
    waterData: WaterDataItem[] | null; // Union type for waterData or null
}

interface WaterDataItem {
    date: string;
    water_intake_ml: number;
}

const WeekChart: React.FC<WeekChartProps> = ({ filterStartDate, filterEndDate, sleepData, waterData }) => {
    
    console.log('data in week chart',sleepData);
    const getDaysOfWeekLabels = (): string[] => {
        const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return daysOfWeek;
    };

    const daysOfWeekLabels = getDaysOfWeekLabels();
    const sleepDurations = Array(daysOfWeekLabels.length).fill(0);
    const waterIntakeByDay = Array(daysOfWeekLabels.length).fill(0);
    
    
    if (sleepData){

        const filteredSleepData = sleepData.filter((data) => {
            const sleepStartDate = new Date(data.sleep_start);
            return sleepStartDate >= filterStartDate && sleepStartDate <= filterEndDate;
        });

        filteredSleepData.forEach((data) => {
            const sleepStart = new Date(data.sleep_start);
            const dayOfWeekIndex = sleepStart.getDay(); // Get index of the day in the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
            const sleepDuration = (new Date(data.sleep_end).getTime() - sleepStart.getTime()) / (1000 * 60 * 60); // Convert milliseconds to hours
            sleepDurations[dayOfWeekIndex] += sleepDuration;
        });

    }

    if (waterData) {
        const filteredWaterData = waterData.filter(data => {
            const date = new Date(data.date);
            return date >= filterStartDate && date <= filterEndDate;
        });

        filteredWaterData.forEach(data => {
            const date = new Date(data.date);
            const dayOfWeekIndex = date.getDay();
            waterIntakeByDay[dayOfWeekIndex] += data.water_intake_ml;
        });
    }

    // Filter sleep data based on filterStartDate and filterEndDate
    // const sortedSleepData = sleepData.sort((a, b) => {
    //     const dateA = new Date(a.sleep_start);
    //     const dateB = new Date(b.sleep_start);
    //     return dateA.getTime() - dateB.getTime();
    // });

    // const sleepDurations = filteredSleepData.map((data) => {
    //     const sleepStart = new Date(data.sleep_start);
    //     const sleepEnd = new Date(data.sleep_end);
    //     return (sleepEnd.getTime() - sleepStart.getTime()) / (1000 * 60 * 60); // Convert milliseconds to hours
    // });

    

    // const formatXAxisLabel = (date: Date): string => {
    //     return `${date.getDate()}/${date.getMonth() + 1}`; // Display day/month
    // };

    // const startDates = filteredSleepData.map((data) => {
    //     const sleepStartDate = new Date(data.sleep_start);
    //     return formatXAxisLabel(sleepStartDate);
    // });
    // Render the chart with filtered sleep data

    const chartData = sleepData ? sleepDurations : waterIntakeByDay;

    return (
        <View style={{marginBottom:20}}>
            <BarChart
                data={{
                    labels: daysOfWeekLabels,
                    datasets: [
                        {
                            data: chartData,
                        },
                    ],
                }}
                width={350}
                height={280}
                yAxisSuffix={sleepData ? ' hrs' : ' ml'}
                yAxisLabel=""
                yAxisInterval={1}
                fromZero
                chartConfig={{
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
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
                    
                }}
                style={{
                    marginVertical: 8,
                    alignSelf: 'center',
                }}
            />
        </View>
    );
};

export default WeekChart;