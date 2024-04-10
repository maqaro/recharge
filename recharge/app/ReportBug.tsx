import React, { useState } from 'react';
import { Button, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'; 
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';


const ReportBug: React.FC = () => {
  const router = useRouter();
  // State to hold bug report details
  const [bugReport, setBugReport] = useState<{
    description: string;
    stepsToRecreate: string;
    firstNoticed: string;
    device: string | null; 
  }>({
    description: '',
    stepsToRecreate: '',
    firstNoticed: '',
    device: null, 
  });

  // Function to handle input change
  const handleInputChange = (field: keyof typeof bugReport, value: string) => {
    setBugReport((prevBugReport) => ({
      ...prevBugReport,
      [field]: value,
    }));
  };

  // Function to submit bug report

  const handleSubmitBugReport = async () => {
    try {
      const bugReportData = {
        Description: bugReport.description,
        Steps: bugReport.stepsToRecreate,
        FirstFound: bugReport.firstNoticed,
        Device: bugReport.device,
      };
  
      const { data, error } = await supabase.from('ReportBug').insert([bugReportData]);
  
      if (error) {
        throw error;
      }
  
      console.log('Bug report submitted successfully:', data);
      Alert.alert('Thank you for reporting the bug!');
      router.navigate('/Settings');
    } catch (error) {
      console.error('Error submitting bug report:', error);
      Alert.alert('Failed to submit bug report. Please try again later.');
    }
  };

  const cancel =() => {
    router.navigate('/Settings');
  }

  return (
    <LinearGradient colors={['#f5f5f5', '#f5f5f5']} style={{height:'100%', width:'100%'}} >
      <ScrollView contentContainerStyle={styles.modalContent}>
        <Text style={styles.modalTitle}>Report Bug</Text>
        <Text style={styles.gap}></Text>
        <Text style={styles.headings}>Brief Description of the Issue</Text>
        <TextInput
          style={styles.input}
          multiline
          value={bugReport.description}
          onChangeText={(text) => handleInputChange('description', text)}
        />

        <Text style={styles.headings}>Steps to Recreate the Issue</Text>
        <TextInput
          style={styles.input}
          multiline
          value={bugReport.stepsToRecreate}
          onChangeText={(text) => handleInputChange('stepsToRecreate', text)}
        />

        <Text style={styles.headings}>When was the Bug First Noticed?</Text>
        <TextInput
          style={styles.input}
          multiline
          value={bugReport.firstNoticed}
          onChangeText={(text) => handleInputChange('firstNoticed', text)}
        />
        
        <Text style={styles.headings}>What device was used?</Text>
        <RNPickerSelect
          placeholder={{ label: 'Select Device', value: null }}
          items={[
            { label: 'iOS', value: 'iOS' },
            { label: 'Android', value: 'Android' },
          ]}
          style={{
            placeholder:{
              color: 'grey',
            },

            inputIOS: {
              backgroundColor: 'white',
              paddingVertical: 15,
              marginLeft: 9,
              marginRight: 265,
              textAlign: 'center',
              color: 'black', 
              borderRadius: 5,
              borderColor: 'grey',
              borderWidth: 1,
            },
            inputAndroid: {
              backgroundColor: 'white',
              paddingVertical: 15,
              marginLeft: 9,
              marginRight: 265,
              textAlign: 'center',
              color: 'black', 
              borderRadius: 5,
              borderColor: 'grey',
              borderWidth: 1,
            },
          }}
          value={bugReport.device}
          onValueChange={(value) => setBugReport((prevBugReport) => ({ ...prevBugReport, device: value }))}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={cancel} style={styles.button}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmitBugReport} style={[styles.button, styles.submitButton]}>
            <Text style={styles.buttonText}>Submit Feedback</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    marginLeft: 9,
    marginRight: 11,
    height:100,
    textAlignVertical:'top',
    backgroundColor:'white',
    borderRadius: 5,
  },
  gap:{
    marginBottom: 30,
  },
  headings: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 9,
    marginTop: 3,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop:20,
  },
  button: {
    flex: 1,
    borderRadius: 50, // Make oval buttons
    backgroundColor: '#F53649',
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    top: 40,
  },
  submitButton: {
    backgroundColor: '#44BA67',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ReportBug;
