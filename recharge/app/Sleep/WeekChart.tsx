import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import SleepChart from './SleepChart';

interface SleepDataItem {
    id: number;
    sleep_start: string;
    sleep_end: string;
    user_id: string;
    date: Date;
}

interface WeekChartProps {
    filterStartDate: Date;
    filterEndDate: Date;
    sleepData: SleepDataItem[] | null;
    waterData: WaterDataItem[] | null;
}

interface WaterDataItem {
    date: string;
    water_intake_ml: number;
}

const WeekChart: React.FC<WeekChartProps> = ({ filterStartDate, filterEndDate, sleepData, waterData }) => {
    
    const getDaysOfWeekLabels = (): string[] => {
        const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return daysOfWeek;
    };

    const daysOfWeekLabels = getDaysOfWeekLabels();
    const sleepDurations = Array(daysOfWeekLabels.length).fill(0);
    const waterIntakeByDay = Array(daysOfWeekLabels.length).fill(0);
    
    
    if (sleepData){

        const filteredSleepData = sleepData.filter((data) => {
            const sleepStartDate = new Date(data.date);
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
            const waterStartdate = new Date(data.date);
            return waterStartdate >= filterStartDate && waterStartdate <= filterEndDate;
        });

        filteredWaterData.forEach(data => {
            const date = new Date(data.date);
            const dayOfWeekIndex = date.getDay()-1;
            waterIntakeByDay[dayOfWeekIndex] += data.water_intake_ml;
        });
    }


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
                width={300}
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
                    propsForLabels: {
                        fontSize: 10,
                    },
                    barPercentage:0.8,
                    
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