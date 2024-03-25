// filter.tsx

import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import WeekFilter from './WeekFilter';
import MonthFilter from './MonthFilter';
import YearFilter from './YearFilter';

interface FilterProps {
    onDateChange: (startDate: Date, endDate: Date) => void;
}

const Filter: React.FC<FilterProps> = ({ onDateChange }) => {
    const [activeFilter, setActiveFilter] = useState<string>(''); // State to track active filter

    // Function to handle the click on filter buttons
    const handleFilterClick = (filter: string) => {
        setActiveFilter(filter); // Update the active filter state
    };

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                <TouchableOpacity onPress={() => handleFilterClick('week')}>
                    <View style={{ width: 100, height: 50, borderRadius: 25, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>Week</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilterClick('month')}>
                    <View style={{ width: 100, height: 50, borderRadius: 25, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>Month</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilterClick('year')}>
                    <View style={{ width: 100, height: 50, borderRadius: 25, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>Year</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* Render the filter component based on activeFilter state */}
            {activeFilter === 'week' && <WeekFilter onDateChange={onDateChange} />}
            {activeFilter === 'month' && <MonthFilter onDateChange={onDateChange} />}
            {activeFilter === 'year' && <YearFilter onDateChange={onDateChange} />}
        </View>
    );
};

export default Filter;

