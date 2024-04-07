import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';
import RNPickerSelect from 'react-native-picker-select';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Specialty {
  label: string;
  value: number;
}

const AddMentorPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState<number | null>(null);
  const router = useRouter();
  const [userid, setUserid] = useState<string | undefined>();

  const specialties: Specialty[] = [
    { label: 'Depression', value: 1 },
    { label: 'Anxiety', value: 2 },
    { label: 'Trauma', value: 3 },
    { label: 'Eating Disorder', value: 4 },
    { label: 'Stress', value: 5 },
    { label: 'Addiction', value: 6 },
    { label: 'Grief', value: 7 },
    { label: 'Self-Harm', value: 8 },
    { label: 'Insomnia', value: 9 },
    { label: 'General', value: 10 },
  ];


  const addMentor = async () => {
    const router = useRouter();
    const { data, error } = await supabase.from('mentors').insert([
      {
        id: userid,
        specialty_id: specialty,
        name: name,
        available: true,
      },
    ]);

    if (error) {
      Alert.alert('User ID not found');
    }
    Alert.alert('Mentor added successfully');
    router.navigate('/AdminHomepage')

  }

  useEffect(() =>{
    if (!userid) {
      return;
    }
    else{
      addMentor();
    }
  }, [userid]);

  const signUpMentor = async () => {
    if (!username || !password || !name) {
      Alert.alert('Please fill in all fields');
      return;
    }

    if (!validateEmail(username)) {
      Alert.alert('Invalid email format');
      return;
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email: username,
            password: password,
          });

      if (error) {
        throw error;
      }

      try {
        const { data: { user }, } = await supabase.auth.getUser();
         console.log("User:", user?.id);
         setUserid(user?.id);
      }catch (error) {
        Alert.alert('Error Adding mentor')
    }

    } catch (error) {
      Alert.alert('Failed to add mentor', JSON.stringify(error));
    }
  };

  const validateEmail = (email: string) => {
    // Simple email validation regex
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <RNPickerSelect
        items={specialties}
        onValueChange={(value) => setSpecialty(value)}
        value={specialty}
        placeholder={{ label: 'Select Specialty', value: null }}
      />
      <TouchableOpacity style={styles.button} onPress={signUpMentor}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <View style={styles.navContainer}>
      <TouchableOpacity style={styles.navButton} onPress={() => router.navigate('/AdminHomepage')}>
        <Ionicons name="home-outline" size={24} color="black" />
        {/* <Text>Home</Text> */}
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 25,
    bottom: 5,
    left: 0,
    right: 0,
  },
  navButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
});

export default AddMentorPage;
