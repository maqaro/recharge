import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import { supabase } from '../../lib/supabase';
import Filter from '../Sleep/Filter';

const WaterHistory = () => {
    const [userid, setUserid] = useState<string | undefined>();
    const [waterData, setWaterData] = useState<any[]>([]);
    const [averageWaterIntake, setAverageWaterIntake] = useState<number>(0);
    const [highestWaterIntake, setHighestWaterIntake] = useState<number>(0);
    const [rowCount, setRowCount] = useState<number>(0);
    const [totalWaterConsumed, setTotalWaterConsumed] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const handleDateChange = (start: Date, end: Date) => {
        setStartDate(start);
        setEndDate(end);
        console.log('The dates are: ',startDate);
        console.log('The dates are: ',endDate)
    };

    useEffect(() => {   
        fetchWaterData();
    }, []);

    useEffect(() => {
        console.log('The user id is', userid);
    }, [userid]);

    useEffect(() => {
        if (waterData.length>0){
            setLoading(false);
        }
        updatefilter();
        calculateStatistics();
    }, [waterData]);

    const updatefilter = () => {
        return (
        <Filter trackerData={waterData} onDateChange={handleDateChange}/>
        )
    }

    const fetchWaterData = async () => {
        try {
            const { data: { user }, } = await supabase.auth.getUser();
            const id = user?.id;
            console.log('the const id is: ',id);
            setUserid(id);

            let { data: watertracker, error } = await supabase
                .from('watertracker')
                .select('*')
                .eq('user_id', user?.id);

            if (error) {
                console.error('Error fetching water data:', error);
            } else {
                console.log(watertracker);
                if (watertracker) {
                    setWaterData(watertracker); // Update state with the fetched water data
                }
            }
        } catch (error) {
            console.error('Error fetching water data:', error);
        }
    };

    const calculateStatistics = () => {
        if (waterData.length === 0) {
            return; // No data available
        }

        let totalWaterIntake = 0;
        let maxWaterIntake = 0;
        let count = 0;

        waterData.forEach((item) => {
            const waterIntake = item.water_intake_ml;
            totalWaterIntake += waterIntake;
            count +=1;
            if (waterIntake > maxWaterIntake) {
                maxWaterIntake = waterIntake;
            }
        });

        const average = totalWaterIntake / waterData.length;

        setAverageWaterIntake(average);
        setHighestWaterIntake(maxWaterIntake);
        setRowCount(count);
        setTotalWaterConsumed(totalWaterIntake);
        
    };



    return (
        <View style={styles.container}>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" /> // Render loading indicator if data is still loading
            ) : (
                <Filter trackerData={waterData} onDateChange={handleDateChange}/>
            )}
            

            <View style={{flexDirection:'row'}}>
            <View style={styles.boxes}>
                <Text style={styles.statistics}>Average Intake</Text>
                <Text style={styles.number}>{(averageWaterIntake / 1000).toFixed(2)} L</Text>
            </View>

            <View style={styles.boxes}>
                <Text style={styles.statistics}>Highest Intake</Text>
                <Text style={styles.number}>{(highestWaterIntake / 1000).toFixed(2)} L</Text>
            </View>

            </View>

            <View style={{flexDirection:'row'}}>
            <View style={styles.boxes}>
                <Text style={styles.statistics}>Records</Text>
                <Text style={styles.number}>{rowCount} Entries</Text>
            </View>

            <View style={styles.boxes}>
                <Text style={styles.statistics}>Total Consumed</Text>
                <Text style={styles.number}>{(totalWaterConsumed / 1000).toFixed(2)} L</Text>
            </View>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
    statistics: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    number: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 18,
    },

    boxes: {
        backgroundColor:'white',
        margin: 5,
        width:'50%',
        height:80,
        borderRadius: 20,
    }
});

export default WaterHistory;
