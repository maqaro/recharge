import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { supabase } from '../../lib/supabase';

interface OthersModalProps {
  topic: string;
  onClose: () => void;
}

const OthersModal: React.FC<OthersModalProps> = ({ topic, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [link, setLink] = useState('');

  const handleSave = async () => {
     // Check if the date is in YYYY-MM-DD format
     if (!isValidDateFormat(date)) {
        Alert.alert('Invalid Date Format', 'Please enter the date in YYYY-MM-DD format');
        return;
      }
    try {
      const formattedDate = new Date(date).toISOString().split('T')[0];
      const { error } = await supabase.from('resources').insert([
        {
          title: title,
          description: description,
          date: formattedDate,
          link: link,
          topic: topic, // Set the topic dynamically
        }
      ]);

      if (error) {
        console.error('Error inserting data:', error.message);
      } else {
        console.log(`${topic} data inserted successfully`);
        onClose(); // Close the modal after saving
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  const isValidDateFormat = (inputDate: string): boolean => {
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    return dateFormat.test(inputDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={[styles.input,styles.descriptionInput]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
      />

      <Text style={styles.label}>Date:</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Enter date (YYYY-MM-DD)"
      />

      <Text style={styles.label}>Link:</Text>
      <TextInput
        style={styles.input}
        value={link}
        onChangeText={setLink}
        placeholder="Enter link"
      />

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  descriptionInput: {
    height: 100, 
    textAlignVertical: 'top', 
  },
});

export default OthersModal;
