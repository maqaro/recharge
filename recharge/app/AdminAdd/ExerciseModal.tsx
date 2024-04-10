import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { supabase } from '../../lib/supabase';


interface ExerciseModalProps {
  onClose: () => void;
}

const ExerciseModal: React.FC<ExerciseModalProps> = ({ onClose }) => {
  const [exerciseName, setExerciseName] = useState('');
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  const muscleGroupOptions = [
    { id: 'Cardio', name: 'Cardio' },
    { id: 'Full Body', name: 'Full Body' },
    { id: 'Hip', name: 'Hip' },
    { id: 'Leg', name: 'Leg' },
    { id: 'Shoulders', name: 'Shoulders' },
    { id: 'Erector Spinae', name: 'Erector Spinae' },
    { id: 'Calisthenic', name: 'Calisthenic' },
    { id: 'Back / Wing', name: 'Back / Wing' },
    { id: 'Abs', name: 'Abs' },
    { id: 'Triceps', name: 'Triceps' },
    { id: 'Chest', name: 'Chest' },
    { id: 'Trapezius', name: 'Trapezius' },
    { id: 'Neck', name: 'Neck' },
  ];

  const equipmentOptions = [
    { id: 'Full Gym', name: 'Full Gym' },
    { id: 'NO EQUIPMENT', name: 'NO EQUIPMENT' },
    { id: 'Dumbbells', name: 'Dumbbells' },
    { id: 'Exercise Ball', name: 'Exercise Ball' },
    { id: 'Barbell', name: 'Barbell' },
    { id: 'Kettlebell', name: 'Kettlebell' },
    { id: 'Machine', name: 'Machine' },
    { id: 'Landmine', name: 'Landmine' },
    { id: 'TRX Suspension', name: 'TRX Suspension' },
    { id: 'Cable', name: 'Cable' },
    { id: 'Resistance Band', name: 'Resistance Band' },
  ];

  const handleSave = async () => {

        try {
            const { data, error } = await supabase.from('exercise').insert([
              {
                Exercise_Name: exerciseName,
                muscle_gp: selectedMuscleGroups,
                Equipment: selectedEquipment,
                
              }
            ]);
        
            if (error) {
              console.error('Error inserting data:', error.message);
            } else {
              console.log('Exercise data inserted successfully:', data);
              onClose(); 
            }
          } catch (error) {
            console.error('Error inserting data:', error);
          }
        };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Exercise Name:</Text>
      <TextInput
        style={styles.input}
        value={exerciseName}
        onChangeText={setExerciseName}
        placeholder="Enter exercise name"
      />

      <Text style={styles.label}>Muscle Group:</Text>
      <MultiSelect
    
        items={muscleGroupOptions}
        uniqueKey="id"
        onSelectedItemsChange={setSelectedMuscleGroups}
        selectedItems={selectedMuscleGroups}
        selectText="Select muscle group..."
        searchInputPlaceholderText="Search muscle groups..."
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#3895B6"
        selectedItemIconColor="#3895B6"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor="#3895B6"
        submitButtonText="Submit"
      />

      <Text style={styles.label}>Equipment:</Text>
      <MultiSelect
        items={equipmentOptions}
        uniqueKey="id"
        onSelectedItemsChange={setSelectedEquipment}
        selectedItems={selectedEquipment}
        selectText="Select equipment..."
        searchInputPlaceholderText="Search equipment..."
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#3895B6"
        selectedItemIconColor="#3895B6"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor="#3895B6"
        submitButtonText="Submit"
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
    marginTop: 20,
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

export default ExerciseModal;

