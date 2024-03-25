import React from 'react';
import { Text, View } from 'react-native';
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
    sleepData: SleepDataItem[];
}

const SleepChart: React.FC<SleepChartProps> = ({ filterStartDate, filterEndDate, sleepData }) => {
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
        return `${date.getDate()}/${date.getMonth() + 1}`; // Display day/month
    };

    const startDates = filteredSleepData.map((data) => {
        const sleepStartDate = new Date(data.sleep_start);
        return formatXAxisLabel(sleepStartDate);
    });
    // Render the chart with filtered sleep data
    return (
        <View>
            <BarChart
                data={{
                    labels: startDates,
                    datasets: [
                        {
                            data: sleepDurations,
                        },
                    ],
                }}
                width={350}
                height={220}
                yAxisSuffix=" hrs"
                yAxisLabel="Sleep Duration"
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
                    borderRadius: 16,
                }}
            />
        </View>
    );
};

export default SleepChart;
