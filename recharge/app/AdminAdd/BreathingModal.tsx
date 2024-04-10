import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { supabase } from '../../lib/supabase';

interface BreathingModalProps {
  onClose: () => void;
}

const BreathingModal: React.FC<BreathingModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');

  const handleSave = async () => {
    try {
      const { error } = await supabase.from('breathingExercises').insert([
        {
          title: title,
          link: link,
          image: image,
        }
      ]);

      if (error) {
        console.error('Error inserting data:', error.message);
      } else {
        console.log('Breathing data inserted successfully');
        onClose(); // Close the modal after saving
      }
    } catch (error) {
      console.error('Error inserting data:', error);
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

      <Text style={styles.label}>Image URL:</Text>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
        placeholder="Want to add an image?"
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
});

export default BreathingModal;

