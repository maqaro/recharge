// filter.tsx

import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import WeekChart from './WeekChart';

interface FilterProps {
    onDateChange: (startDate: Date, endDate: Date) => void;
    trackerdata: any;
}

const WeekFilter: React.FC<FilterProps> = ({ trackerdata, onDateChange }) => {

    const isSleepData = trackerdata && trackerdata[0] && trackerdata[0].sleep_start !== undefined;
    const isWaterData = trackerdata && trackerdata[0] && trackerdata[0].water_intake_ml !== undefined;

    const currentDate: Date = new Date();
    const currentDayOfWeek: number = currentDate.getDay()
    let daysSinceMonday: number = currentDayOfWeek - 1; 

    if (currentDayOfWeek === 0) {
        daysSinceMonday = 6;
    }

    const initialStartDate: Date = new Date(currentDate);
    initialStartDate.setDate(currentDate.getDate() - daysSinceMonday);
    initialStartDate.setHours(0, 0, 0, 0);
    const [startDate, setStartDate] = useState<Date>(initialStartDate);
    const [endDate, setEndDate] = useState<Date>(new Date(startDate.getTime() + (6 * 24 * 60 * 60 * 1000)));

    // Function to handle moving the displayed week back by one week
    const handlePreviousWeek = () => {
        const newStartDate: Date = new Date(startDate);
        newStartDate.setDate(startDate.getDate() - 7);
        newStartDate.setHours(0, 0, 0, 0);
        setStartDate(newStartDate);
        onDateChange(newStartDate, new Date(newStartDate.getTime() + (6 * 24 * 60 * 60 * 1000)));
    };

    // Function to handle moving the displayed week forward by one week
    const handleNextWeek = () => {
        const newStartDate: Date = new Date(startDate);
        newStartDate.setDate(startDate.getDate() + 7);
        newStartDate.setHours(0, 0, 0, 0);
        setStartDate(newStartDate);
        onDateChange(newStartDate, new Date(newStartDate.getTime() + (6 * 24 * 60 * 60 * 1000)));
    };

    // Calculate the end date of the week based on the start date
    useEffect(() => {
        const newEndDate: Date = new Date(startDate.getTime() + (6 * 24 * 60 * 60 * 1000));
        newEndDate.setHours(0, 0, 0, 0);
        setEndDate(newEndDate);
        onDateChange(startDate, newEndDate);
    }, [startDate]);

    return (
        <View>
            <View style={{ flexDirection: 'row',alignSelf:'center', marginTop: 20 }}>
                <TouchableOpacity onPress={handlePreviousWeek}>
                    <Text style={{ marginRight: 10, fontSize:18, color:'white' }}>◄</Text>
                </TouchableOpacity>
                <Text >
                    <Text style={{fontSize:16, color:'white' }}>{startDate.toDateString()}</Text>
                    <Text style={{fontSize:20, color:'white', fontWeight:'bold' }}> - </Text>
                    <Text style={{fontSize:16, color:'white' }}>{endDate.toDateString()}</Text>
                </Text>
                <TouchableOpacity onPress={handleNextWeek}>
                    <Text style={{ marginLeft: 10, fontSize:18, color:'white' }}>►</Text>
                </TouchableOpacity>
            </View>

            {/* Render WeekChart based on the type of data */}
            {isSleepData && <WeekChart filterStartDate={startDate} filterEndDate={endDate} sleepData={trackerdata} waterData={null} />}
            {isWaterData && <WeekChart filterStartDate={startDate} filterEndDate={endDate} waterData={trackerdata} sleepData={null} />}
        </View>
    );
};

export default WeekFilter;
