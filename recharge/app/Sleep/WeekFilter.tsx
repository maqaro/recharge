// filter.tsx

import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface FilterProps {
    onDateChange: (startDate: Date, endDate: Date) => void;
}

const WeekFilter: React.FC<FilterProps> = ({ onDateChange }) => {

    const currentDate: Date = new Date();
    const currentDayOfWeek: number = currentDate.getDay()
    let daysSinceMonday: number = currentDayOfWeek - 1; // (assuming Monday is the first day of the week)

    if (currentDayOfWeek === 0) {
        daysSinceMonday = 6;
    }

    const initialStartDate: Date = new Date(currentDate);
    initialStartDate.setDate(currentDate.getDate() - daysSinceMonday);
    const [startDate, setStartDate] = useState<Date>(initialStartDate);
    const [endDate, setEndDate] = useState<Date>(new Date(startDate.getTime() + (6 * 24 * 60 * 60 * 1000)));

    // Function to handle moving the displayed week back by one week
    const handlePreviousWeek = () => {
        const newStartDate: Date = new Date(startDate);
        newStartDate.setDate(startDate.getDate() - 7);
        setStartDate(newStartDate);
        onDateChange(newStartDate, new Date(newStartDate.getTime() + (6 * 24 * 60 * 60 * 1000)));
    };

    // Function to handle moving the displayed week forward by one week
    const handleNextWeek = () => {
        const newStartDate: Date = new Date(startDate);
        newStartDate.setDate(startDate.getDate() + 7);
        setStartDate(newStartDate);
        onDateChange(newStartDate, new Date(newStartDate.getTime() + (6 * 24 * 60 * 60 * 1000)));
    };

    // Calculate the end date of the week based on the start date
    useEffect(() => {
        // Calculate the end date of the week based on the start date
        const newEndDate: Date = new Date(startDate.getTime() + (6 * 24 * 60 * 60 * 1000));
        setEndDate(newEndDate);
        onDateChange(startDate, newEndDate);
    }, [startDate]);

    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <TouchableOpacity onPress={handlePreviousWeek}>
                    <Text style={{ marginRight: 10 }}>◄</Text>
                </TouchableOpacity>
                <Text>
                    <Text>{startDate.toDateString()}</Text>
                    <Text> - </Text>
                    <Text>{endDate.toDateString()}</Text>
                </Text>
                <TouchableOpacity onPress={handleNextWeek}>
                    <Text style={{ marginLeft: 10 }}>►</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default WeekFilter;

