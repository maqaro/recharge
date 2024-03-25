import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Value from '../components/Value';
import RingProgress from '../components/RingProgress';
import AppleHealthKit, { HealthInputOptions, HealthKitPermissions, HealthUnit } from 'react-native-health';
import { useEffect, useState } from 'react';
import useHealthData from '../hooks/useHealthData';
import { AntDesign } from '@expo/vector-icons';
import { RotateInDownLeft } from 'react-native-reanimated';


const STEPS_GOAL = 10000;

export default function StepTracker() {
	const [date, setDate] = useState(new Date());
	const { steps, flights, distance } = useHealthData(date);

	const changeDate = (numDays: number) => {
		const currentDate = new Date(date);
		currentDate.setDate(currentDate.getDate() + numDays);
		setDate(currentDate);
	};

  return (
    <View style={styles.container}>
			<View style={styles.datePicker}>
				<AntDesign onPress={() => changeDate(-1)} name="left" size={20} color="#C3FF53" />
				<Text style={styles.date}>{date.toDateString()}</Text>
				<AntDesign onPress={() => changeDate(1)} name="right" size={20} color="#C3FF53" />
			</View>

      <RingProgress radius={150} strokeWidth={50} progress={steps / STEPS_GOAL}/>

      <View style={styles.values}>
        <Value label="Steps" value={steps.toString()} />
        <Value label="Distance" value={`${(distance / 1000).toFixed(2)} km`} />
        <Value label="Flights Climbed" value={flights.toString()} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    padding: 12,
  },
  values: {
    flexDirection: 'row',
    gap: 25,
    flexWrap: 'wrap',
    marginTop: 100
  },
	date: {
		color: 'white',
		fontWeight: '500',
		fontSize: 20,
		marginHorizontal: 20,
	},
	datePicker: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 20,
		justifyContent: 'center',
	},
});