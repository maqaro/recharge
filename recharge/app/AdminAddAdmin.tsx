import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const AddAdminPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const checkAdminStatus = async (email: string) => {
    try {
      const { data: admins, error } = await supabase.from('admins').select().eq('email', email);
      if (error) {
        throw error;
      }

      return admins;
    } catch (error) {
      console.error('Error checking admin status:', error);
      throw error;
    }
  };

  const validateEmail = (email: string) => {
    // Simple email validation regex
    return /\S+@\S+\.\S+/.test(email);
  };

  const addAdmin = async () => {
      // Validate email
      if (!validateEmail(email)) {
        Alert.alert('Invalid email format');
        return;
      }
    try {
      // Check if the user is already an admin
      const admins = await checkAdminStatus(email);
      if (admins.length > 0) {
        Alert.alert('User is already an admin');
      } else {
        // Add the user to the admin database
        const { error } = await supabase.from('admins').insert([{ email }]);
        if (error) {
          throw error;
        }
        Alert.alert('User has been made an admin');
        router.navigate('/AdminHomepage')
      }
    } catch (error) {
      console.error('Error adding admin:', error);
      Alert.alert('Failed to add admin');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize:20, marginBottom: 25, textAlign:'center', fontWeight:'bold', paddingLeft:10, paddingRight:10}}>Enter User's Email To Change Status To Admin</Text>
      <Text style={{marginBottom: 50, fontSize: 15, textAlign:'center', paddingLeft:20, paddingRight:20}}>Note: User must already be registered in the system. Please sign up user before adding admin status.</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor="rgba(0, 0, 0, .5)"
      />
      <TouchableOpacity style={styles.button} onPress={addAdmin}>
        <Text style={styles.buttonText}>Add Admin</Text>
      </TouchableOpacity>

      <View style={styles.navContainer}>
      <TouchableOpacity style={styles.navButton} onPress={() => router.navigate('/AdminHomepage')}>
        <Ionicons name="home-outline" size={26} color="black" />
        <Text style={styles.hometext}>Home</Text>
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
    backgroundColor: 'lightblue',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'black',
    borderWidth: 1.5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, .7)',
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
    backgroundColor: 'lightblue',
    borderRadius: 25,
    bottom: 5,
    left: 0,
    right: 0,
  },
  navButton: {
    backgroundColor: 'lightblue',
    padding: 2,
    borderRadius: 25,
    alignItems: 'center',
  },

  hometext: {
    fontSize: 12,
    color: 'black',
    paddingTop: 3,
    textAlign: 'center',
    left: -1,
  },

});

export default AddAdminPage;
