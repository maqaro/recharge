import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const ExerciseDetail = ({ route }) => {
  const { exerciseData } = route.params;

  // Prepare your data for the graph here, for example:
  const data = {
    labels: exerciseData.map(session => session.date),
    datasets: [
      {
        data: exerciseData.map(session => session.weight),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{exerciseData[0].exerciseName}</Text>
      <LineChart
        data={data}
        width={styles.chart.width} // from react-native
        height={220}
        yAxisLabel="kg"
        chartConfig={styles.chart.chartConfig}
        bezier
        style={styles.chart}
      />
      {/* ... add your history list here ... */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    width: '100%',
    chartConfig: {
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#fb8c00',
      backgroundGradientTo: '#ffa726',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
    },
  },
  // ... other styles
});

export default ExerciseDetail;
