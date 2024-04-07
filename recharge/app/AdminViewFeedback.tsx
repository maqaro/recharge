import React, { useState, useEffect, Suspense } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import GeneralFeedback from './AdminAdd/GeneralFeedback';
import BugsFeedback from './AdminAdd/BugsFeedback';
import FeatureFeedback from './AdminAdd/FeatureFeedback';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ViewFeedback: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('General');
  const router = useRouter();

  return (
    <View style={styles.container}>
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

      <View style={styles.navContainer}>
      <TouchableOpacity style={styles.navButton} onPress={() => router.navigate('/AdminHomepage')}>
        <Ionicons name="home-outline" size={24} color="black" />
        {/* <Text>Home</Text> */}
      </TouchableOpacity>
    </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    padding: 10,
  },
  selectedButton: {
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 25,
    bottom: 5,
    left: 0,
    right: 0,
  },
  navButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
});

export default ViewFeedback;
