// year_filter.tsx

import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import YearChart from './YearChart';

interface FilterProps {
    trackerdata: any;
    onDateChange: (startDate: Date, endDate: Date) => void;
}

const YearFilter: React.FC<FilterProps> = ({ trackerdata, onDateChange }) => {
    
    const isSleepData = trackerdata && trackerdata[0] && trackerdata[0].sleep_start !== undefined;
    const isWaterData = trackerdata && trackerdata[0] && trackerdata[0].water_intake_ml !== undefined;
    
    // Get the current date
    const currentDate: Date = new Date();
    const [currentYear, setCurrentYear] = useState<number>(currentDate.getFullYear());

    // Function to handle moving to the previous year
    const handlePreviousYear = () => {
        setCurrentYear(currentYear - 1);
    };

    // Function to handle moving to the next year
    const handleNextYear = () => {
        setCurrentYear(currentYear + 1);
    };

    // Calculate the start and end dates for the current year
    const startDate: Date = new Date(currentYear, 0, 1);
    const endDate: Date = new Date(currentYear, 11, 31);

    useEffect(() => {
        onDateChange(startDate, endDate);
    }, [currentYear]);

    return (
        <>
        <View style={{ flexDirection: 'row',alignSelf:'center', marginTop: 20 }}>
            <TouchableOpacity onPress={handlePreviousYear}>
                <Text style={{ marginRight: 10, fontSize:18, color:'white' }}>◄</Text>
            </TouchableOpacity>

            <Text style={{fontSize:16, color:'white' }}>{startDate.toDateString()}</Text>
            <Text  style={{fontSize:20, color:'white', fontWeight:'bold' }}> - </Text>
            <Text style={{fontSize:16, color:'white' }}>{endDate.toDateString()}</Text>

            <TouchableOpacity onPress={handleNextYear}>
                <Text style={{ marginLeft: 10, fontSize:18, color:'white' }}>►</Text>
            </TouchableOpacity>
        </View>

        {/* Render WeekChart based on the type of data */}
        {isSleepData && <YearChart filterStartDate={startDate} filterEndDate={endDate} sleepData={trackerdata} waterData={null} />}
        {isWaterData && <YearChart filterStartDate={startDate} filterEndDate={endDate} waterData={trackerdata} sleepData={null} />}
        </>
    );
};

export default YearFilter;
