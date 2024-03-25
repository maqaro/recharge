import React, { useEffect, useState } from 'react';
import { View, StyleSheet,} from 'react-native';
import { supabase } from '../../lib/supabase';
import Filter from '../Sleep/Filter';
import WaterChart from './WaterChart';

const WaterHistory = () => {
    const [userid, setUserid] = useState<string | undefined>();
    const [waterData, setWaterData] = useState<any[]>([]);

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const handleDateChange = (start: Date, end: Date) => {
        setStartDate(start);
        setEndDate(end);
    };

    useEffect(() => {   
        fetchWaterData();
    }, []);

    const fetchWaterData = async () => {
        try {
           const { data: { user }, } = await supabase.auth.getUser();
            console.log("User:", user?.id);
            setUserid(user?.id);

            let { data: watertracker, error } = await supabase
                .from('watertracker')
                .select('*')
                .eq('user_id', user?.id);

            if (error) {
                console.error('Error fetching water data:', error);
            } else {
                if (watertracker) {
                    setWaterData(watertracker); // Update state with the fetched sleep data
                }
            }
        } catch (error) {
            console.error('Error fetching water data:', error);
        }
    };



    return (
        <View style={styles.container}>
            <Filter onDateChange={handleDateChange}/>
            <WaterChart filterStartDate={startDate} filterEndDate={endDate} waterData={waterData}/>
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
});

export default WaterHistory;
