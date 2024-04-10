import React, { useState } from 'react';
import { Button, Modal, ScrollView, StyleSheet, Text, TextInput, View, Alert, TouchableOpacity } from 'react-native';
import { supabase } from '../../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import MentorNavBar from './MentorNavBar';

interface FeatureRequestModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const FeatureRequestModal: React.FC<FeatureRequestModalProps> = ({ isVisible, onClose }) => {
  const [featureRequest, setFeatureRequest] = useState('');

  const handleSubmitFeatureRequest = async () => {
    try {
      const { data, error } = await supabase.from('newfeature').insert([{ feature: featureRequest }]);

      if (error) {
        throw error;
      }

      console.log('Feature request submitted successfully:', data);
      Alert.alert('Request Submitted!');
      onClose();
    } catch (error) {
      console.error('Error submitting feature request:', error);
      Alert.alert('Failed to submit feature request. Please try again later.');
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <LinearGradient colors={['#fff9ed', '#eccbaa']} style={{height:'100%', width:'100%'}} >
      <ScrollView contentContainerStyle={styles.modalContent}>
        <Text style={styles.modalTitle}>Feature Request</Text>
        <Text style={styles.modalSubtitle}>Missing a feature?</Text>
        <Text style={styles.modalText}>Anything you're missing in our app? Drop a message here to let us know!</Text>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Please describe the feature you would like. The more detail the better."
          value={featureRequest}
          onChangeText={setFeatureRequest}
        />
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onClose} style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmitFeatureRequest} style={[styles.button, styles.submitButton]}>
          <Text style={styles.buttonText}>Submit Feedback</Text>
        </TouchableOpacity>
        
      </View>
      </ScrollView>
      <MentorNavBar/>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    justifyContent: 'center',
    padding: 20,
    marginTop: 100,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingBottom:150,
    textAlignVertical:'top',
    backgroundColor:'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    borderRadius: 50, // Make oval buttons
    backgroundColor: 'red',
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  submitButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default FeatureRequestModal;