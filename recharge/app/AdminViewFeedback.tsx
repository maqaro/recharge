import React, { useState, useEffect, Suspense } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import GeneralFeedback from './AdminAdd/GeneralFeedback';
import BugsFeedback from './AdminAdd/BugsFeedback';
import FeatureFeedback from './AdminAdd/FeatureFeedback';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AdminNavBar from './AdminNavBar';

const ViewFeedback: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('General');
  const router = useRouter();

  return (
    <View style={styles.container2}>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
      <View style={styles.buttonsContainer}>

        <TouchableOpacity
          style={[styles.button, selectedCategory === 'General' && styles.selectedButton]}
          onPress={() => setSelectedCategory('General')}>
          <Text style={styles.buttonText}>General</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, selectedCategory === 'Bugs' && styles.selectedButton]}
          onPress={() => setSelectedCategory('Bugs')}>
          <Text style={styles.buttonText}>Bug Reports</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, selectedCategory === 'Feature' && styles.selectedButton]}
          onPress={() => setSelectedCategory('Feature')}>
          <Text style={styles.buttonText}>New Features</Text>
        </TouchableOpacity>

        {/* Add TouchableOpacity buttons for other categories */}
      </View>
      <View style={styles.feedbackContainer}>
        {selectedCategory === 'General' && <GeneralFeedback />}
        {selectedCategory === 'Bugs' && <BugsFeedback />}
        {selectedCategory === 'Feature' && <FeatureFeedback/> }
      </View>

      </ScrollView>
    <AdminNavBar/>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  container2: {
    flex: 1,
    backgroundColor: 'lightblue',
    paddingBottom: 40,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    borderRadius: 5,
    marginTop: 30,
  },
  selectedButton: {
    backgroundColor: '#3895B6',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  feedbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewFeedback;
