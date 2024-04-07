import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import ExerciseModal from './AdminAdd/ExerciseModal';
import YogaModal from './AdminAdd/YogaModal';
import MeditationModal from './AdminAdd/MeditationModal';
import BreathingModal from './AdminAdd/BreathingModal';
import OthersModal from './AdminAdd/OthersModal';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const AddResources: React.FC = () => {
  const [modalType, setModalType] = useState<string | null>(null);
  const router = useRouter();

  const openModal = (type: string) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => openModal('exercise')}>
        <Text style={styles.buttonText}>Exercise</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => openModal('yoga')}>
        <Text style={styles.buttonText}>Yoga</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => openModal('meditation')}>
        <Text style={styles.buttonText}>Meditation</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => openModal('breathing')}>
        <Text style={styles.buttonText}>Breathing</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => openModal('others-exercise')}>
        <Text style={styles.buttonText}>Others - Exercise</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => openModal('others-food')}>
        <Text style={styles.buttonText}>Others - Food</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => openModal('others-mental-health')}>
        <Text style={styles.buttonText}>Others - Mental Health</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalType !== null} transparent animationType="fade">
        <View style={styles.modalContainer}>
          {modalType === 'exercise' && <ExerciseModal onClose={closeModal} />}
          {modalType === 'yoga' && <YogaModal onClose={closeModal} />}
          {modalType === 'meditation' && <MeditationModal onClose={closeModal} />}
          {modalType === 'breathing' && <BreathingModal onClose={closeModal} />}
          {modalType === 'others-exercise' && <OthersModal topic={'Exercise'} onClose={closeModal} />}
          {modalType === 'others-food' && <OthersModal topic={'Food'} onClose={closeModal} />}
          {modalType === 'others-mental-health' && <OthersModal topic={'Mental Health'} onClose={closeModal} />}
        </View>
      </Modal>

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    width:'100%',
    height:'100%',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

export default AddResources;

