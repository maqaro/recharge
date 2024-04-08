import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { supabase } from '../../lib/supabase'; // Adjust the path as needed

interface BugReport {
  id: number;
  Description: string;
  Steps: string;
  FirstFound: string;
  Device: string;
}

const BugsFeedback: React.FC = () => {
  const [bugReports, setBugReports] = useState<BugReport[]>([]);

  useEffect(() => {
    const fetchBugReports = async () => {
      try {
        const { data, error } = await supabase.from('ReportBug').select('*');
        if (error) {
          throw error;
        }
        if (data) {
          setBugReports(data);
        }
      } catch (error) {
        console.error('Error fetching bug reports:', error);
      }
    };

    fetchBugReports();
  }, []);


  const handleDeleteBugReport = async (bugId: number, description: string) => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete "${description}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              // Delete bug report from the database
              const { error } = await supabase.from('ReportBug').delete().eq('id', bugId);
              if (error) {
                throw error;
              }
              // Remove deleted bug report from state
              setBugReports(prevBugReports => prevBugReports.filter(report => report.id !== bugId));
            } catch (error) {
              console.error('Error deleting bug report:', error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
      <Text style={styles.title}>Bugs Feedback</Text>
      {bugReports.map((bugReport, index) => (
        <View key={index} style={styles.bugReportContainer}>
         
         <TouchableOpacity onPress={() => handleDeleteBugReport(bugReport.id, bugReport.Description)}>
            <Text style={styles.deleteButton}>Delete</Text>
          </TouchableOpacity>

          <Text style={styles.device}><Text style={styles.bold}>Device Type:</Text> {bugReport.Device}</Text>
          <Text><Text style={styles.bold}>Description:</Text> {bugReport.Description}</Text>
          <Text style={styles.label}><Text style={styles.bold}>Steps:</Text> {bugReport.Steps}</Text>
          <Text style={styles.label}><Text style={styles.bold}>First Found:</Text> {bugReport.FirstFound}</Text>
          
        </View>
      ))}
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginRight: 150,
  },
  bold: {
    fontWeight: 'bold',
    color: '#183E4C',
  },
  bugReportContainer: {
    marginBottom: 15,
  },
  device:{
    color: 'black',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  label: {
    // fontWeight: 'bold',
    marginTop: 5,
  },
  deleteButton: {
    color: 'red',
    // marginTop: 10,
    left: 250,
    top: 17,
    fontWeight: 'bold',
  },
});

export default BugsFeedback;
