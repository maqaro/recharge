import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
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
    <View>
      <Text>Exercise Name:</Text>
      <TextInput
        value={exerciseName}
        onChangeText={setExerciseName}
        placeholder="Enter exercise name"
      />

      <Text>Muscle Group:</Text>
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
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
      />

      <Text>Equipment:</Text>
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
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
      />

      <Button title="Save" onPress={handleSave} />
      <Button title="Cancel" onPress={onClose} />
    </View>
  );
};

export default ExerciseModal;

