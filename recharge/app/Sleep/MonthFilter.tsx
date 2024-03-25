// month_filter.tsx

import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface FilterProps {
    onDateChange: (startDate: Date, endDate: Date) => void;
}

const MonthFilter: React.FC<FilterProps> = ({ onDateChange }) => {
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
        <View style={{display:'flex',flexDirection:'row'}}>
            <TouchableOpacity onPress={handlePreviousMonth}>
                <Text style={{ marginRight: 10 }}>◄</Text>
            </TouchableOpacity>

            <Text>{startDate.toDateString()}</Text>
            <Text> - </Text>
            <Text>{endDate.toDateString()}</Text>

            <TouchableOpacity onPress={handleNextMonth}>
                <Text style={{ marginLeft: 10 }}>►</Text>
            </TouchableOpacity>
        </View>
        </>
    );
};

export default MonthFilter;

