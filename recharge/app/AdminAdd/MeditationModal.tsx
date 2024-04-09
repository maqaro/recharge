import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { supabase } from '../../lib/supabase';

interface MeditationModalProps {
  onClose: () => void;
}

const MeditationModal: React.FC<MeditationModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [recommendedBy, setRecommendedBy] = useState('');
  const [image, setImage] = useState('');

  const handleSave = async () => {
    try {
      const { error } = await supabase.from('meditation').insert([
        {
          title: title,
          link: link,
          recommendedBy: recommendedBy,
          image: image,
        }
      ]);

      if (error) {
        console.error('Error updating data:', error.message);
      } else {
        console.log('Meditation data updated successfully');
        onClose(); // Close the modal after saving
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.label}>Link:</Text>
      <TextInput
        style={styles.input}
        value={link}
        onChangeText={setLink}
        placeholder="Enter Link"
      />

      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />

      <Text style={styles.label}>Recommended By:</Text>
      <TextInput
        style={styles.input}
        value={recommendedBy}
        onChangeText={setRecommendedBy}
        placeholder="Add any mentors who have recommended this"
      />

      <Text style={styles.label}>Image URL:</Text>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
        placeholder="Want to add an image?"
      />
      
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

export default MeditationModal;
