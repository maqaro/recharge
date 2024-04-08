import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../../lib/supabase'; 

interface Feature {
  id: number; 
  feature: string;
}

const FeatureFeedback: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const { data, error } = await supabase.from('newfeature').select('*');
        if (error) {
          throw error;
        }
        if (data) {
          setFeatures(data);
        }
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };

    fetchFeatures();
  }, []);

  const handleDeleteFeature = async (featureId: number, feature: string) => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete "${feature}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              // Delete feature from the database
              const { error } = await supabase.from('newfeature').delete().eq('id', featureId);
              if (error) {
                throw error;
              }
              // Remove deleted feature from state
              setFeatures(prevFeatures => prevFeatures.filter(f => f.id !== featureId));
            } catch (error) {
              console.error('Error deleting feature:', error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Feature Feedback</Text>
      {features.map((feature, index) => (
        <View key={index} style={styles.featureContainer}>
          <Text>{feature.feature}</Text>
          <TouchableOpacity onPress={() => handleDeleteFeature(feature.id, feature.feature)}>
            <Text style={styles.deleteButton}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
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
  featureContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deleteButton: {
    color: 'red',
    marginTop: 10,
  },
});

export default FeatureFeedback;
