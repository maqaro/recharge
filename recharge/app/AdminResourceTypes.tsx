import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import GuidedSession from './AdminAdd/GuidedSessions'; // Import your modal components
import Resources from './AdminAdd/Resources';
import ExerciseRoutine from './AdminAdd/ExerciseRoutine';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const ViewResources: React.FC = () => {
  const [modalType, setModalType] = useState<string>('otherMentalHealth');
  const router = useRouter();

  const openModal = (type: string) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType('otherMentalHealth');
  };

  return (
    <>
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.button} onPress={() => openModal('breathingExercises')}>
          <Text style={styles.buttonText}>Breathing Exercises</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => openModal('meditation')}>
          <Text style={styles.buttonText}>Meditation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => openModal('otherFood')}>
          <Text style={styles.buttonText}>Other - Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => openModal('yoga')}>
          <Text style={styles.buttonText}>Yoga</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => openModal('otherExercise')}>
          <Text style={styles.buttonText}>Other - Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => openModal('otherMentalHealth')}>
          <Text style={styles.buttonText}>Other - Mental Health</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => openModal('exercise')}>
          <Text style={styles.buttonText}>Exercise</Text>
        </TouchableOpacity>
      </ScrollView>
      

      {/* Render modals based on selected category */}
      {modalType === 'breathingExercises' && <GuidedSession category='breathingExercises' onClose={closeModal} />}
      {modalType === 'exercise' && <ExerciseRoutine/>}
      {modalType === 'meditation' && <GuidedSession category='meditation' onClose={closeModal} />}
      {modalType === 'yoga' && <GuidedSession category='yoga' onClose={closeModal} />}
      {modalType === 'otherFood' && <Resources activeTopic='Food' />}
      {modalType === 'otherExercise' && <Resources activeTopic='Exercise'/>}
      {modalType === 'otherMentalHealth' && <Resources activeTopic='Mental Health'/>}
      
    </View>
    <View style={styles.navContainer}>
      <TouchableOpacity style={styles.navButton} onPress={() => router.navigate('/AdminHomepage')}>
        <Ionicons name="home-outline" size={24} color="black" />
        {/* <Text>Home</Text> */}
      </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
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

export default ViewResources;


