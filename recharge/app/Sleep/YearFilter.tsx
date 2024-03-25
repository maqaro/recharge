// year_filter.tsx

import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface FilterProps {
    onDateChange: (startDate: Date, endDate: Date) => void;
}

const YearFilter: React.FC<FilterProps> = ({ onDateChange }) => {
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
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={handlePreviousYear}>
                <Text style={{ marginRight: 10 }}>◄</Text>
            </TouchableOpacity>

            <Text>{startDate.toDateString()}</Text>
            <Text> - </Text>
            <Text>{endDate.toDateString()}</Text>

            <TouchableOpacity onPress={handleNextYear}>
                <Text style={{ marginLeft: 10 }}>►</Text>
            </TouchableOpacity>
        </View>
        </>
    );
};

export default YearFilter;
