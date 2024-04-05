// month_filter.tsx

import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MonthChart from './MonthChart';

interface FilterProps {
    trackerdata: any;
    onDateChange: (startDate: Date, endDate: Date) => void;
}

const MonthFilter: React.FC<FilterProps> = ({ trackerdata, onDateChange }) => {
    
    const isSleepData = trackerdata && trackerdata[0] && trackerdata[0].sleep_start !== undefined;
    const isWaterData = trackerdata && trackerdata[0] && trackerdata[0].water_intake_ml !== undefined;

    // Get the current date
    const currentDate: Date = new Date();
    const [currentMonth, setCurrentMonth] = useState<Date>(currentDate);

    // Function to handle moving to the previous month
    const handlePreviousMonth = () => {
        const newMonth: Date = new Date(currentMonth);
        newMonth.setMonth(currentMonth.getMonth() - 1);
        setCurrentMonth(newMonth);
    };

    // Function to handle moving to the next month
    const handleNextMonth = () => {
        const newMonth: Date = new Date(currentMonth);
        newMonth.setMonth(currentMonth.getMonth() + 1);
        setCurrentMonth(newMonth);
    };

    useEffect(() => {
        onDateChange(startDate, endDate);
    }, [currentMonth]);

    // Calculate the start and end dates for the current month
    const startDate: Date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endDate: Date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    return (
        <>
        <View style={{ flexDirection: 'row',alignSelf:'center', marginTop: 20 }}>
            <TouchableOpacity onPress={handlePreviousMonth}>
                <Text style={{ marginRight: 10, fontSize:18, color:'white' }}>◄</Text>
            </TouchableOpacity>

            <Text style={{fontSize:16, color:'white' }}>{startDate.toDateString()}</Text>
            <Text style={{fontSize:20, color:'white', fontWeight:'bold' }}> - </Text>
            <Text style={{fontSize:16, color:'white' }}>{endDate.toDateString()}</Text>

            <TouchableOpacity onPress={handleNextMonth}>
                <Text style={{ marginLeft: 10, fontSize:18, color:'white' }}>►</Text>
            </TouchableOpacity>
        </View>

        {/* Render WeekChart based on the type of data */}
        {isSleepData && <MonthChart filterStartDate={startDate} filterEndDate={endDate} sleepData={trackerdata} waterData={null} />}
        {isWaterData && <MonthChart filterStartDate={startDate} filterEndDate={endDate} waterData={trackerdata} sleepData={null} />}
        </>
    );
};

export default MonthFilter;

