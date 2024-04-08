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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bugs Feedback</Text>
      {bugReports.map((bugReport, index) => (
        <View key={index} style={styles.bugReportContainer}>
          <Text>{bugReport.Device}</Text>
          <Text>{bugReport.Description}</Text>
          <Text style={styles.label}>Steps:</Text>
          <Text>{bugReport.Steps}</Text>
          <Text style={styles.label}>First Found:</Text>
          <Text>{bugReport.FirstFound}</Text>
          <TouchableOpacity onPress={() => handleDeleteBugReport(bugReport.id, bugReport.Description)}>
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bugReportContainer: {
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

export default BugsFeedback;
