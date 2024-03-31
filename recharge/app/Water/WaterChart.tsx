import React from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

interface WaterDataItem {
    user_id: string;
    date: string;
    water_intake_ml: number;
    created_at: string;
    water_intake_goal: number;
}

interface WaterChartProps {
    filterStartDate: Date;
    filterEndDate: Date;
    waterData: WaterDataItem[];
}

const WaterChart: React.FC<WaterChartProps> = ({ filterStartDate, filterEndDate, waterData }) => {
    // Filter water data based on filterStartDate and filterEndDate
    const filteredWaterData = waterData.filter((data) => {
        const dataDate = new Date(data.date);
        return dataDate >= filterStartDate && dataDate <= filterEndDate;
    });

    const dates = filteredWaterData.map((data) => new Date(data.date));
    const waterIntakes = filteredWaterData.map((data) => data.water_intake_ml);

    console.log(filterStartDate);
    console.log(filterEndDate);

    // Render the chart with filtered water data
    return (
        <View>
            <BarChart
                data={{
                    labels: dates.map(date => `${date.getDate()}/${date.getMonth() + 1}`),
                    datasets: [{ data: waterIntakes }]
                }}
                width={330}
                height={330}
                yAxisSuffix=" ml"
                yAxisLabel=""
                yAxisInterval={1}
                fromZero
                chartConfig={{
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
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
                    marginVertical: 20,
                    borderRadius: 16,
                }}
            />
        </View>
    );
};

export default WaterChart;
