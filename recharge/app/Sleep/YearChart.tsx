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

const YearChart: React.FC<SleepChartProps> = ({ filterStartDate, filterEndDate, sleepData, waterData  }) => {
    // Function to get labels for all months in short format
    const getMonthLabels = (startDate: Date, endDate: Date): string[] => {
        const labels = [];
        const currentMonth = new Date(startDate);
        while (currentMonth <= endDate) {
            labels.push(getMonthShortName(currentMonth.getMonth()));
            currentMonth.setMonth(currentMonth.getMonth() + 1);
        }
        return labels;
    };

    // Function to get short name of the month
    const getMonthShortName = (monthIndex: number): string => {
        const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return monthsShort[monthIndex];
    };

    // Generate labels for all months in short format
    const monthLabels = getMonthLabels(filterStartDate, filterEndDate);
    const chartData = Array(monthLabels.length).fill(0);

    if (sleepData) {
        // Filter sleep data based on filterStartDate and filterEndDate
        const filteredSleepData = sleepData.filter((data) => {
            const sleepStartDate = new Date(data.sleep_start);
            return sleepStartDate >= filterStartDate && sleepStartDate <= filterEndDate;
        });

        // Calculate total sleep duration and count of sleep entries for each month
        const monthlySleepData = filteredSleepData.reduce<{ totalDuration: number; count: number }[]>((acc, data) => {
            const sleepStart = new Date(data.sleep_start);
            const monthIndex = sleepStart.getMonth();
            const sleepDuration = (new Date(data.sleep_end).getTime() - sleepStart.getTime()) / (1000 * 60 * 60); // Convert milliseconds to hours
            acc[monthIndex] = acc[monthIndex] || { totalDuration: 0, count: 0 };
            acc[monthIndex].totalDuration += sleepDuration;
            acc[monthIndex].count++;
            return acc;
        }, []);

        // Calculate average sleep duration for each month
        monthlySleepData.forEach((monthData, index) => {
            if (monthData && monthData.count > 0) {
                chartData[index] = monthData.totalDuration / monthData.count;
            }
        });
    } else if (waterData) {
        // Filter water data based on filterStartDate and filterEndDate
        const filteredWaterData = waterData.filter((data) => {
            const date = new Date(data.date);
            return date >= filterStartDate && date <= filterEndDate;
        });

        // Update y-values array with total water intake for corresponding months
        filteredWaterData.forEach((data) => {
            const date = new Date(data.date);
            const monthIndex = date.getMonth();
            chartData[monthIndex] += data.water_intake_ml;
        });
    }

    // Render the chart with filtered sleep data
    return (
        <View style={{marginBottom:20}}>
            <BarChart
                data={{
                    labels: monthLabels,
                    datasets: [
                        {
                            data: chartData,
                        },
                    ],
                }}
                width={355}
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
                        fontSize: 12, // Adjust the font size here
                    },
                    barPercentage:0.5,
                }}
                style={{
                    marginVertical: 8,
                    alignSelf: 'center',

                }}
            />
        </View>
    );
};

export default YearChart;

