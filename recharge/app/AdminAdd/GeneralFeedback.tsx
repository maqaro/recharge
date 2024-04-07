import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, ScrollView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { FontAwesome } from '@expo/vector-icons';

interface FeedbackData {
  Overall: number;
  Easiness: number;
  Responsiveness: number;
  Reliability: number;
  CurrentFeatures: number;
  Comments: string;
  [key: string]: number | string;
}

const GeneralFeedback: React.FC = () => {
  const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([]);
  const [averageRatings, setAverageRatings] = useState<Record<string, number>>({
    Overall: 0,
    Easiness: 0,
    Responsiveness: 0,
    Reliability: 0,
    CurrentFeatures: 0,
  });

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const { data, error } = await supabase.from('feedback').select('*');
        if (error) {
          throw error;
        }
        if (data) {
          setFeedbackData(data);
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedbackData();
  }, []);

  useEffect(() => {
    // Calculate average ratings for each column
    const calculateAverages = () => {
      const columns: Record<string, number[]> = {
        Overall: [],
        Easiness: [],
        Responsiveness: [],
        Reliability: [],
        CurrentFeatures: [],
      };

      feedbackData.forEach((feedback) => {
        Object.keys(columns).forEach((column) => {
          const value = feedback[column];
          if (typeof value === 'number') { // Ensure it's a number
            columns[column].push(value);
          }
        });
      });

      const averages: Record<string, number> = {};
      Object.keys(columns).forEach((column) => {
        const columnValues = columns[column];
        if (columnValues.length > 0) {
          const sum = columnValues.reduce((acc, val) => acc + val, 0);
          averages[column] = sum / columnValues.length;
        } else {
          averages[column] = 0; 
        }
      });

      setAverageRatings(averages);
    };

    calculateAverages();
  }, [feedbackData]);


  const renderHorizontalBar = (rating: number): JSX.Element => {
    const barWidth = new Animated.Value(0);
  
    // Calculate width of the bar based on rating
    Animated.timing(barWidth, {
      toValue: rating * 20, 
      duration: 1000,
      useNativeDriver: false,
    }).start();
  
    return (
      <View style={styles.barContainer}>
        <View style={styles.barOutline}>
          <Animated.View style={[styles.bar, { width: barWidth }]} />
        </View>
        <Text style={styles.ratingNumber}>{rating}</Text>
        <Text style={styles.ratingNumber}><FontAwesome name="star" size={20} color="gold" /></Text>
      </View>
    );
  };



  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Feedback</Text>
      {Object.keys(averageRatings).map((column) => (
        <View key={column} style={styles.row}>
          <Text style={styles.column}>{column}</Text>
          {renderHorizontalBar(averageRatings[column])}
        </View>
      ))}

        <Text style={styles.title}>Comments</Text>
        <ScrollView contentContainerStyle={styles.commentsContainer}>
        {feedbackData.map((feedback, index) => (
            <View key={index} style={styles.commentContainer}>
                <Text>{feedback.Comments}</Text>
            </View>
        ))}
        </ScrollView>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
   },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  column: {
    width: 100,
    marginRight: 10,
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius:20,
  },
  barOutline: {
    height: 20,
    width: 100, // Change as needed
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 10,
    borderRadius:20,
  },
  bar: {
    height: '100%',
    backgroundColor: 'blue', // Change color as needed
    borderRadius:20,
  },
  ratingNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentsContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Add padding to ensure space for scrolling
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    borderRadius:10,
  },

});

export default GeneralFeedback;
