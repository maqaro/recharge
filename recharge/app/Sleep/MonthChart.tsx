import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

interface SleepDataItem {
    id: number;
    sleep_start: string;
    sleep_end: string;
    user_id: string;
}

interface SleepChartProps {
    filterStartDate: Date;
    filterEndDate: Date;
    sleepData: SleepDataItem[] | null; // Union type for sleepData or null
    waterData: WaterDataItem[] | null; // Union type for waterData or null
}

interface WaterDataItem {
    date: string;
    water_intake_ml: number;
}

const MonthChart: React.FC<SleepChartProps> = ({ filterStartDate, filterEndDate, sleepData, waterData  }) => {
    // Function to get labels for all days in the month
    const getDaysOfMonthLabels = (startDate: Date, endDate: Date): string[] => {
        const labels = [];
        const currentDay = new Date(startDate);
        while (currentDay <= endDate) {
            labels.push(currentDay.getDate().toString());
            currentDay.setDate(currentDay.getDate() + 1);
        }
        return labels;
    };

    // Generate labels for all days in the month
    const daysOfMonthLabels = getDaysOfMonthLabels(filterStartDate, filterEndDate);
    const chartData = Array(daysOfMonthLabels.length).fill(0);


    if (sleepData) {
        // Filter sleep data based on filterStartDate and filterEndDate
        const filteredSleepData = sleepData.filter((data) => {
            const sleepStartDate = new Date(data.sleep_start);
            return sleepStartDate >= filterStartDate && sleepStartDate <= filterEndDate;
        });

        // Update y-values array with actual sleep durations for corresponding days
        filteredSleepData.forEach((data) => {
            const sleepStart = new Date(data.sleep_start);
            const dayOfMonthIndex = sleepStart.getDate() - 1; // Get index of the day in the month
            const sleepDuration = (new Date(data.sleep_end).getTime() - sleepStart.getTime()) / (1000 * 60 * 60); // Convert milliseconds to hours
            chartData[dayOfMonthIndex] += sleepDuration;
        });
    } else if (waterData) {
        // Filter water data based on filterStartDate and filterEndDate
        const filteredWaterData = waterData.filter((data) => {
            const date = new Date(data.date);
            return date >= filterStartDate && date <= filterEndDate;
        });

        // Update y-values array with actual water intake for corresponding days
        filteredWaterData.forEach((data) => {
            const date = new Date(data.date);
            const dayOfMonthIndex = date.getDate() - 1; // Get index of the day in the month
            chartData[dayOfMonthIndex] += data.water_intake_ml;
        });
    }

    // Render the chart with filtered sleep data
    return (
        <View style={{marginBottom:20, marginLeft:-20}}>
            <BarChart
                data={{
                    labels: daysOfMonthLabels,
                    datasets: [
                        {
                            data: chartData,
                        },
                    ],
                }}
                width={390}
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
                        fontSize: 6, // Adjust the font size here
                    },
                    barPercentage:0.1,
                    
                    
                }}
                style={{
                    marginVertical: 8,
                    alignSelf: 'center',
                    paddingLeft: 2
                }}

            />

        </View>
    );
};


export default MonthChart;

