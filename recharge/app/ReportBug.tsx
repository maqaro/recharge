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
    <LinearGradient colors={['#fff9ed', '#eccbaa']} style={{height:'100%', width:'100%'}} >
      <ScrollView contentContainerStyle={styles.modalContent}>
        <Text style={styles.modalTitle}>Report Bug</Text>

        <Text>Brief Description of the Issue</Text>
        <TextInput
          style={styles.input}
          multiline
          value={bugReport.description}
          onChangeText={(text) => handleInputChange('description', text)}
        />

        <Text>Steps to Recreate the Issue</Text>
        <TextInput
          style={styles.input}
          multiline
          value={bugReport.stepsToRecreate}
          onChangeText={(text) => handleInputChange('stepsToRecreate', text)}
        />

        <Text>When was the Bug First Noticed?</Text>
        <TextInput
          style={styles.input}
          multiline
          value={bugReport.firstNoticed}
          onChangeText={(text) => handleInputChange('firstNoticed', text)}
        />
        
        <Text>What device was used?</Text>
        <RNPickerSelect
          placeholder={{ label: 'Select Device', value: null }}
          items={[
            { label: 'iOS', value: 'iOS' },
            { label: 'Android', value: 'Android' },
          ]}
          style={{
            inputIOS: {
              backgroundColor: 'lightgrey',
              color: 'black', 
            },
            inputAndroid: {
              backgroundColor: 'lightgrey',
              color: 'black', 
            },
          }}
          value={bugReport.device}
          onValueChange={(value) => setBugReport((prevBugReport) => ({ ...prevBugReport, device: value }))}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSubmitBugReport} style={[styles.button, styles.submitButton]}>
            <Text style={styles.buttonText}>Submit Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={cancel} style={styles.button}>
            <Text style={styles.buttonText}>Cancel</Text>
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
    height:100,
    textAlignVertical:'top',
    backgroundColor:'white',
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

export default ReportBug;
