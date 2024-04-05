import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Tracker } from './classes/Tracker';
import { router, useLocalSearchParams } from 'expo-router';
import { supabase } from '../lib/supabase';
import { BarChart } from 'react-native-chart-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavBar from './NavBar';

const ExerciseHistory: React.FC = () => {
    const [exercisetracker, setExercisetracker] = React.useState<Tracker[]>([]);

    const { exerciseID } = useLocalSearchParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user?.id) throw new Error('User not found');
                let { data: exercisetrackerData, error } = await supabase
                    .from('exercisetracker')
                    .select(`
                      *, 
                      exercise:exercise_id(
                        Exercise_Name,
                        Exercise_Image,
                        muscle_gp,
                        Equipment
                      )
                    `)
                    .eq('exercise_id', exerciseID)
                    .eq('user_id', user.id);

                if (error) {
                    console.error('Error fetching data: ', error);
                } else {
                    console.log(exercisetrackerData);
                    setExercisetracker(exercisetrackerData as Tracker[]); // Add type assertion here
                }
            } catch (error) {
                console.error('Error fetching exercise data:', error);
            }
        }

        fetchData();
    }, []);
    const sortedAndFormattedRecords = [...exercisetracker].sort((a, b) => b.date.localeCompare(a.date)).map(record => ({
    ...record,
    formattedDate: new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(record.date))
    }));

    const chartConfig = {
        backgroundGradientFrom: "#FFFFFF",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#FFFFFF",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
        decimalPlaces: 0, // optional, shows weight as whole numbers
    };

    // Preparing data for the chart focusing only on weight
    const data = {
        labels: exercisetracker.map(item => item.date), // Use date for the X-axis
        datasets: [
            {
                data: exercisetracker.map(item => item.weights),
            },
        ],
    };

    // Adjusting the view to prevent date cut-off and add padding
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.navigate('/ExerciseTracker')}>
                <Ionicons name="chevron-back-circle-outline" size={40} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Exercise History</Text>
            <ScrollView>

            {exercisetracker.length > 0 ? (
                <View style={styles.main}>
                    <Text style={styles.exerciseTitle}>{exercisetracker[0]?.exercise?.Exercise_Name}</Text>
                    <Image source={{ uri: exercisetracker[0]?.exercise?.Exercise_Image }} style={styles.img} />
                    <Text style={styles.detail}>Muscle Group: {exercisetracker[0]?.exercise?.muscle_gp}</Text>
                    <Text style={styles.detail}>Equipment: {exercisetracker[0]?.exercise?.Equipment}</Text>
                    
                    <View style={styles.chartContainer}>
                        <BarChart
                            data={data}
                            width={Dimensions.get("window").width - 16}
                            height={400}
                            yAxisSuffix=" kgs"
                            chartConfig={chartConfig}
                            verticalLabelRotation={30}
                            fromZero={true}
                            showBarTops={true}
                            showValuesOnTopOfBars={true}
                            withInnerLines={true}
                        />
                    </View>
                    <Text style={styles.historyTitle}>History</Text>
                    {sortedAndFormattedRecords.map((record, index) => (
                        <View key={index} style={styles.historyRecord}>
                            <Text style={styles.recordText}>Date: {record.formattedDate}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.recordText}>Sets: {record.sets}</Text>
                                <Text style={styles.recordText}>Reps: {record.reps}</Text>
                                <Text style={styles.recordText}>Weight: {record.weights} kgs</Text>
                            </View>
                        </View>
                    ))}
                </View>
            ) : (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>No data logged for this exercise</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.navigate('/ExerciseLogger')} // Using router as originally provided
                    >
                        <Text style={styles.buttonText}>Log Exercise</Text>
                    </TouchableOpacity>
                </View>
            )}
            </ScrollView>
        <NavBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0', // Light grey background for slight contrast
    },
    button: {
        backgroundColor: '#4A90E2', // Use a more vibrant color for the button
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'center', // Center button horizontally
        marginBottom: 20, // Add some margin below the button
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF', // White text for better contrast on the button
        textAlign: 'center', // Ensure text is centered within the button
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20, // Adjust as needed
    },
    noDataText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 20,
    },
    detail:{
        fontSize: 16, // Slightly larger font size for emphasis
        fontWeight: '600',
        color: '#555', // Darker color for better readability
        marginVertical: 4, // Vertical margin for spacing
    },
    main: {
        flex: 1,
        minHeight: '82%', // Ensure content area takes up full height
        alignItems: 'center', // Center align items for a neat look
        paddingVertical: 24, // Add vertical padding for breathing space
        backgroundColor: '#ffffff', // White background for the content area for focus
        margin: 8, // Slightly separate content area from edges
        borderRadius: 10, // Rounded corners for the content area
        shadowColor: "#000", // Adding shadow for elevation effect
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    exerciseTitle: {
        fontSize: 22, // Slightly larger font size for emphasis
        fontWeight: 'bold',
        color: '#333', // Darker color for better readability
        marginVertical: 8, // Vertical margin for spacing
    },
    img: {
        width: 120, // Slightly larger image for better visibility
        height: 120, // Maintain aspect ratio
        borderRadius: 20, // Rounded corners for the image
        marginBottom: 16,
    },
    chartContainer: {
        width: '100%', // Use full width to ensure chart is not squeezed
        alignItems: 'center', // Center align the chart for consistency
        padding: 16, // Padding around the chart for spacing
    },
    title: {
        fontSize: 26, // Larger font size for the main title
        fontWeight: 'bold',
        color: '#444', // Slightly lighter than black for a softer look
        margin: 16, // Margin around the title for spacing
    },
    historyTitle: {
        fontSize: 20, // Larger font size for the title
        fontWeight: 'bold', // Bold font weight for emphasis
        color: '#333', // Dark color for readability
        marginBottom: 16, // Margin at the bottom for spacing from title to records
    },
    historyRecord: {
        backgroundColor: '#fff', // White background for contrast
        width: '90%', // Slightly less than full width for padding effect
        borderRadius: 10, // Rounded corners
        padding: 16, // Padding inside each record
        marginBottom: 8, // Margin at the bottom for spacing between records
        shadowColor: "#000", // Shadow for elevation effect
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    recordText: {
        fontSize: 17, // Font size for readability
        fontWeight: '500',
        color: '#555', // Dark color for readability
        marginVertical: 4, // Vertical margin for spacing between text lines
    },
});

export default ExerciseHistory;
