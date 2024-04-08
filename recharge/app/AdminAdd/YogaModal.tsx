import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { supabase } from '../../lib/supabase';

interface YogaModalProps {
  onClose: () => void;
}

const YogaModal: React.FC<YogaModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const handleSave = async () => {
    try {
      const { data, error } = await supabase.from('yoga').insert([
        {
          title: title,
          link: link,
        }
      ]);

      if (error) {
        console.error('Error updating data:', error.message);
      } else {
        console.log('Yoga data updated successfully');
        onClose(); // Close the modal after saving
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
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
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default YogaModal;

