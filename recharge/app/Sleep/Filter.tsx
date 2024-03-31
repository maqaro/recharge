// filter.tsx

import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import WeekFilter from './WeekFilter';
import MonthFilter from './MonthFilter';
import YearFilter from './YearFilter';

interface FilterProps {
    onDateChange: (startDate: Date, endDate: Date) => void;
    trackerData: any;
}

const Filter: React.FC<FilterProps> = ({ onDateChange, trackerData }) => {
    const [activeFilter, setActiveFilter] = useState<string>('week'); // State to track active filter

    console.log('data in filer', trackerData);
    // Function to handle the click on filter buttons
    const handleFilterClick = (filter: string) => {
        setActiveFilter(filter); // Update the active filter state
    };

    const render_week = () => {
        handleFilterClick('week');
        

    }

    return (
        <View>
            <View style={{ flexDirection: 'row', marginTop: 20, alignSelf:'center' }}>
                <TouchableOpacity onPress={() => handleFilterClick('week')}>
                    <View style={{ width: 100, height: 50, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',borderRightWidth: 1, borderRightColor: '#ccc', }}>
                        <Text style={{ color: '#9678B4' }}>Week</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilterClick('month')}>
                    <View style={{ width: 100, height: 50, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',borderRightWidth: 1, borderRightColor: '#ccc',  }}>
                        <Text style={{ color: '#9678B4'}}>Month</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilterClick('year')}>
                    <View style={{ width: 100, height: 50, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',borderRightWidth: 1, borderRightColor: '#ccc', }}>
                        <Text style={{ color: '#9678B4' }}>Year</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* Render the filter component based on activeFilter state */}
            {activeFilter === 'week' && <WeekFilter trackerdata={trackerData} onDateChange={onDateChange} />}
            {activeFilter === 'month' && <MonthFilter trackerdata={trackerData} onDateChange={onDateChange} />}
            {activeFilter === 'year' && <YearFilter trackerdata={trackerData} onDateChange={onDateChange} />}
        </View>
    );
};

export default Filter;

